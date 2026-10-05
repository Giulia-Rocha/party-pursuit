# Roteiro de testes manuais

Preencha **resultado obtido**, **evidência** e **status** durante a homologação.

| ID | Ambiente | Cenário | Passos | Resultado esperado | Resultado obtido/evidência | Status |
|---|---|---|---|---|---|---|
| T01 | Web/Android | Login inválido | Enviar campos vazios e e-mail inválido | Mensagem clara e permanência na tela | Pendente | ⬜ |
| T02 | Web/Android | Cadastro | Informar nome, e-mail e senha válida | Usuário criado e nome exibido no perfil | Pendente | ⬜ |
| T03 | Web/Android | Catálogo | Buscar e filtrar por gênero | Lista corresponde aos critérios | Pendente | ⬜ |
| T04 | Web/Android | Favoritos | Favoritar jogo, reiniciar o app | Favorito permanece no perfil | Pendente | ⬜ |
| T05 | Android | Localização aceita | Abrir mapa e permitir acesso | Mapa centraliza no usuário e mostra mesas | Pendente | ⬜ |
| T06 | Android | Localização negada | Negar acesso | App usa São Paulo e mantém lista utilizável | Pendente | ⬜ |
| T07 | Web/Android | Criar mesa | Informar título, local e data futura | Mesa criada e detalhes abertos | Pendente | ⬜ |
| T08 | Web/Android | Participar | Entrar e depois sair de mesa com vaga | Estado e número de vagas são atualizados | Pendente | ⬜ |
| T09 | Web/Android | Mesa lotada | Tentar entrar em mesa sem vaga | Entrada bloqueada com feedback | Pendente | ⬜ |
| T10 | Web/Android | Notificações | Ler e limpar todas | Estado visual muda e lista fica vazia | Pendente | ⬜ |
| T11 | Android | Supabase offline | Abrir catálogo sem rede | Catálogo local é exibido | Pendente | ⬜ |
| T12 | Android APK | Instalação limpa | Instalar APK, abrir e percorrer fluxos | Instalação e navegação sem crash | Pendente | ⬜ |

## Automação

Execute `npm test`, `npm run typecheck` e `npm run lint`. Anexe o terminal e o vídeo Android em `docs/assets/` antes da entrega.
