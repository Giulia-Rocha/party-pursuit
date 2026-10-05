alter table public.games_cache rename to games;
alter table public.games rename column bgg_id to id;

alter table public.games
  add column if not exists slug text,
  add column if not exists genres jsonb not null default '[]'::jsonb,
  add column if not exists tag text;

create unique index if not exists games_slug_key on public.games(slug);
alter table public.sessions alter column game_id type text using game_id::text;
alter table public.favorites alter column game_id type text using game_id::text;

create policy "public games catalog" on public.games
  for select to anon using (true);

insert into public.games
  (id, slug, title, subtitle, image_url, year_published, min_players, max_players,
   min_minutes, max_minutes, min_age, rating, description, genres, mechanics, tag, raw_data)
values
  (1, 'zombicide', 'Zombicide', 'Segunda Edição', 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', 2022, 1, 6, 60, 180, 14, 4.8, 'Um jogo cooperativo onde cada jogador assume o papel de um sobrevivente em uma cidade infestada. Trabalhem juntos, enfrentem hordas e sobrevivam à noite.', '["Cooperativo", "Temático"]', '["Cooperativo", "Miniaturas", "Dados", "Movimento em Grade"]', 'EM ALTA', '{}'),
  (2, 'scythe', 'Scythe', null, 'https://images.unsplash.com/photo-1547638375-ebf04735d792?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', 2016, 1, 5, 90, 150, 14, 4.9, 'Uma Europa alternativa dos anos 1920. Cinco facções competem por recursos e território numa terra devastada pela guerra com mechas e trabalhadores.', '["Estratégia"]', '["Controle de Área", "Gestão de Recursos", "Assimetria", "Motor de Conjunto"]', 'RECOMENDADO', '{}'),
  (3, 'dune-imperium', 'Dune: Imperium', null, 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', 2020, 1, 4, 60, 120, 14, 4.7, 'Combine deckbuilding com controle de área no universo de Duna. Negocie, conspire e domine Arrakis para assegurar o precioso spice.', '["Deckbuilding", "Estratégia"]', '["Deckbuilding", "Colocação de Trabalhadores", "Controle de Área"]', 'NOVO', '{}'),
  (4, 'wingspan', 'Wingspan', null, 'https://images.unsplash.com/photo-1547638375-ebf04735d792?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', 2019, 1, 5, 40, 70, 10, 4.6, 'Um jogo de construção de motor focado em pássaros. Atraia pássaros para sua reserva, acumule comida e choque ovos para pontuar.', '["Estratégia", "Familiar"]', '["Construção de Motor", "Coleção de Conjuntos", "Dados"]', 'RECOMENDADO', '{}'),
  (5, 'gloomhaven', 'Gloomhaven', null, 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', 2017, 1, 4, 60, 150, 14, 4.9, 'Uma campanha cooperativa com narrativa ramificada. Tome decisões que moldam permanentemente o mundo ao longo de dezenas de sessões.', '["Cooperativo", "Aventura", "RPG"]', '["Cooperativo", "Campanha", "Deck de Cartas", "Sem Dados"]', 'EM ALTA', '{}'),
  (6, 'cascadia', 'Cascadia', null, 'https://images.unsplash.com/photo-1547638375-ebf04735d792?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', 2021, 1, 4, 30, 45, 10, 4.4, 'Construa um ecossistema combinando hexágonos de habitat e fichas de animais. Simples de aprender e profundo de dominar.', '["Familiar", "Estratégia"]', '["Colocação de Peças", "Coleção de Conjuntos", "Seleção de Draft"]', 'NOVO', '{}'),
  (7, 'brass-birmingham', 'Brass: Birmingham', null, 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', 2018, 2, 4, 60, 120, 14, 4.9, 'Construa uma rede industrial na Inglaterra vitoriana e estabeleça conexões durante as eras do canal e do trem.', '["Estratégia"]', '["Construção de Rede", "Gestão de Mão", "Controle de Área"]', 'RECOMENDADO', '{}'),
  (8, 'pandemic', 'Pandemic', null, 'https://images.unsplash.com/photo-1547638375-ebf04735d792?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', 2008, 2, 4, 45, 75, 8, 4.3, 'Quatro doenças ameaçam a humanidade. Trabalhe em equipe para conter surtos e encontrar as curas antes que seja tarde demais.', '["Cooperativo"]', '["Cooperativo", "Gestão de Ações", "Coleta de Conjuntos"]', 'EM ALTA', '{}')
on conflict (id) do update set
  slug = excluded.slug, title = excluded.title, subtitle = excluded.subtitle,
  image_url = excluded.image_url, year_published = excluded.year_published,
  min_players = excluded.min_players, max_players = excluded.max_players,
  min_minutes = excluded.min_minutes, max_minutes = excluded.max_minutes,
  min_age = excluded.min_age, rating = excluded.rating, description = excluded.description,
  genres = excluded.genres, mechanics = excluded.mechanics, tag = excluded.tag,
  raw_data = excluded.raw_data, fetched_at = now();
