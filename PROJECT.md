# 🎯 Projeto e Princípios de Desenvolvimento

## Objetivo do Projeto
Transformar a aplicação "Talking Hands" (originalmente um projeto PAP) num produto open-source de excelência, servindo tanto como uma ferramenta real para a comunidade aprender Língua Gestual Portuguesa (LGP), como um projeto de referência a nível de arquitetura, código e boas práticas no ecossistema mobile.

## Princípios Core
1. **Acessibilidade e Inclusão:** Sendo uma app focada em LGP, a acessibilidade (contraste, modo claro/escuro, navegação intuitiva) não é opcional, é obrigatória.
2. **Offline-First (sempre que possível):** A aprendizagem deve acontecer em qualquer lugar. Os vídeos e dados sincronizados devem tentar ser cacheados localmente.
3. **Código Limpo e Escalável:** Utilizar tipagem estrita (TypeScript), componentização modular e separação clara entre a UI e a lógica de negócio (Hooks/Stores).
4. **Comunicação Clara:** Todo o código submetido deve ser funcional. Commits devem seguir o padrão *Conventional Commits* e pull requests devem estar documentados.

## Prioridades do MVP (Produto Mínimo Viável)
1. **Gestuário:** Listagem, pesquisa e filtros de Alfabeto, Números e Palavras.
2. **Media Player:** Reprodução fluida e otimizada dos vídeos em LGP.
3. **Módulo de Aprendizagem:** Sistema de *Quizzes* (reconhecimento do gesto) e níveis.
4. **Palavra Diária:** Destaque de uma palavra/gesto na página inicial (baseado na data atual).