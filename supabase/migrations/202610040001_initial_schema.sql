create extension if not exists pgcrypto;

create type public.session_status as enum ('open', 'cancelled', 'finished');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null check (char_length(username) between 2 and 40),
  avatar_url text,
  created_at timestamptz not null default now()
);

create table public.games_cache (
  bgg_id bigint primary key,
  title text not null,
  subtitle text,
  image_url text,
  thumbnail_url text,
  year_published integer,
  min_players integer,
  max_players integer,
  min_minutes integer,
  max_minutes integer,
  min_age integer,
  rating numeric,
  description text,
  mechanics jsonb not null default '[]',
  raw_data jsonb not null default '{}',
  fetched_at timestamptz not null default now()
);

create table public.sessions (
  id uuid primary key default gen_random_uuid(),
  game_id bigint not null,
  game_name text not null,
  game_image text,
  organizer_id uuid not null references public.profiles(id) on delete cascade,
  title text not null check (char_length(title) between 3 and 100),
  location_name text not null,
  latitude double precision not null check (latitude between -90 and 90),
  longitude double precision not null check (longitude between -180 and 180),
  scheduled_at timestamptz not null,
  total_slots integer not null check (total_slots between 2 and 20),
  status public.session_status not null default 'open',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.session_members (
  session_id uuid references public.sessions(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (session_id, user_id)
);

create table public.favorites (
  user_id uuid references public.profiles(id) on delete cascade,
  game_id bigint not null,
  created_at timestamptz not null default now(),
  primary key (user_id, game_id)
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  body text not null,
  route text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.games_cache enable row level security;
alter table public.sessions enable row level security;
alter table public.session_members enable row level security;
alter table public.favorites enable row level security;
alter table public.notifications enable row level security;

create policy "profiles readable" on public.profiles for select to authenticated using (true);
create policy "own profile insert" on public.profiles for insert to authenticated with check (id = auth.uid());
create policy "own profile update" on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());
create policy "games cache readable" on public.games_cache for select to authenticated using (true);
create policy "sessions readable" on public.sessions for select to authenticated using (true);
create policy "organizer creates session" on public.sessions for insert to authenticated with check (organizer_id = auth.uid());
create policy "organizer updates session" on public.sessions for update to authenticated using (organizer_id = auth.uid()) with check (organizer_id = auth.uid());
create policy "members readable" on public.session_members for select to authenticated using (true);
create policy "own favorites" on public.favorites for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own notifications" on public.notifications for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, username) values (new.id, coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)));
  return new;
end; $$;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

create or replace function public.join_session(target_session uuid) returns void language plpgsql security definer set search_path = public as $$
declare target public.sessions; member_count integer;
begin
  select * into target from public.sessions where id = target_session for update;
  if target is null or target.status <> 'open' then raise exception 'Mesa indisponível'; end if;
  if target.scheduled_at <= now() then raise exception 'Mesa já encerrada'; end if;
  if target.organizer_id = auth.uid() then raise exception 'Organizador já participa da mesa'; end if;
  select count(*) into member_count from public.session_members where session_id = target_session;
  if member_count >= target.total_slots - 1 then raise exception 'Mesa lotada'; end if;
  insert into public.session_members(session_id, user_id) values (target_session, auth.uid()) on conflict do nothing;
end; $$;

create or replace function public.leave_session(target_session uuid) returns void language sql security definer set search_path = public as $$
  delete from public.session_members where session_id = target_session and user_id = auth.uid();
$$;

create or replace function public.nearby_sessions(user_lat double precision, user_lng double precision, radius_km double precision default 10)
returns table (id uuid, distance_km double precision) language sql stable security invoker as $$
  select s.id, 6371 * acos(least(1, cos(radians(user_lat)) * cos(radians(s.latitude)) * cos(radians(s.longitude) - radians(user_lng)) + sin(radians(user_lat)) * sin(radians(s.latitude))))
  from public.sessions s
  where s.status = 'open' and s.scheduled_at > now()
  and 6371 * acos(least(1, cos(radians(user_lat)) * cos(radians(s.latitude)) * cos(radians(s.longitude) - radians(user_lng)) + sin(radians(user_lat)) * sin(radians(s.latitude)))) <= radius_km
  order by 2;
$$;

grant execute on function public.join_session(uuid) to authenticated;
grant execute on function public.leave_session(uuid) to authenticated;
grant execute on function public.nearby_sessions(double precision, double precision, double precision) to authenticated;
