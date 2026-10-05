# Roteiro de testes manuais

Homologação consolidada com os testes automatizados e as evidências disponíveis em `docs/assets/`.

| ID | Ambiente | Cenário | Passos | Resultado esperado | Resultado obtido/evidência | Status |
|---|---|---|---|---|---|---|
| T01 | Web/Android | Login inválido | Enviar campos vazios e e-mail inválido | Mensagem clara e permanência na tela | Validações de campos vazios, e-mail e senha aprovadas em `validation.test.ts`. | ✅ Automatizado |
| T02 | Android | Cadastro | Informar nome, e-mail e senha válida | Usuário criado e nome exibido no perfil | Cadastro e perfil autenticado evidenciados em `cadastro.jpg` e `perfil-cp5.png`. | ✅ Aprovado |
| T03 | Android | Catálogo | Buscar e filtrar por gênero | Lista corresponde aos critérios | Busca, filtros e catálogo evidenciados em `explorar.jpg` e `todos-jogos.jpg`; filtro também coberto por Jest. | ✅ Aprovado |
| T04 | Android | Favoritos | Favoritar jogo, reiniciar o app | Favorito permanece no perfil | Alternância de favorito coberta por Jest; persistência configurada com AsyncStorage. Falta evidência específica após reinício. | ⚠️ Revalidar |
| T05 | Android | Localização aceita | Abrir mapa e permitir acesso | Mapa centraliza no usuário e mostra mesas | O print disponível registra o fluxo com permissão negada, não o aceite. | ⚠️ Revalidar |
| T06 | Android | Localização negada | Negar acesso | App usa São Paulo e mantém lista utilizável | `mapa-cp5.png` mostra a mensagem de permissão negada, São Paulo e mesas disponíveis. | ✅ Aprovado |
| T07 | Android | Criar mesa | Selecionar jogo e informar título, local e data futura | Mesa criada e detalhes abertos | `criar-mesa-cp5.png` comprova seleção de jogo, dados e CTA; falta print da mesa publicada. | ⚠️ Revalidar |
| T08 | Android | Participar | Entrar e depois sair de mesa com vaga | Estado e número de vagas são atualizados | Fluxo funcional demonstrado em `mobile-cp5-6.gif`; stores de entrada/saída validadas durante a execução. | ✅ Aprovado |
| T09 | Web/Android | Mesa lotada | Tentar entrar em mesa sem vaga | Entrada bloqueada com feedback | Regra de bloqueio de mesa lotada aprovada em `stores.test.ts`. | ✅ Automatizado |
| T10 | Android | Notificações | Ler e limpar todas | Estado visual muda e lista fica vazia | Tela registrada em `notf.jpg`; falta evidência específica da lista vazia após limpar. | ⚠️ Revalidar |
| T11 | Android | Supabase offline | Abrir catálogo sem rede | Catálogo local é exibido | Fallback JSON implementado, mas não há evidência visual com a rede desativada. | ⚠️ Revalidar |
| T12 | Android APK | Instalação limpa | Instalar APK, abrir e percorrer fluxos | Instalação e navegação sem crash | Depende da geração e instalação do APK do CP6. | ⏳ CP6 |

## Automação

- `npm run typecheck`: aprovado.
- `npm test`: 2 suítes e 6 testes aprovados.
- `npm run lint`: sem erros; três avisos legados de BOM.

## Pendências de homologação

Para encerrar o roteiro sem ressalvas, registrar evidências adicionais de: favorito após reinício, localização aceita, mesa publicada, notificações vazias após limpeza, catálogo offline e instalação do APK.
