# Fluxos de navegação

## Autenticação

`Login → Home` e `Login → Cadastro → Home`. Os formulários validam campos; com Supabase configurado usam autenticação real, e sem credenciais operam em modo de demonstração local.

## Descoberta

`Home/Explorar → Busca e filtros → Detalhes do jogo → Favoritar → Perfil`.

O catálogo carrega os jogos cadastrados no Supabase. Falhas de configuração ou rede acionam automaticamente o catálogo local.

## Mesas

`Home/Mapa → Marcador ou lista → Detalhes da mesa → Entrar/Sair`.

`Mapa → Criar mesa → Detalhes da nova mesa`. No Android o mapa solicita localização; se negada, usa São Paulo. No navegador, apresenta a lista compatível.

## Notificações

`Home → Notificações → Marcar todas como lidas/Limpar → Destino da notificação`.
