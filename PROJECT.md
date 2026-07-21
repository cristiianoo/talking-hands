# 🎯 Projeto e Princípios de Desenvolvimento

## Objetivo do Projeto
Transformar a aplicação "Talking Hands" num produto open-source de excelência, servindo tanto como uma ferramenta vital para a aprendizagem da LGP, como um *case study* de referência a nível de arquitetura relacional (SQL), código limpo e retenção de utilizadores via gamificação.

## Princípios Core
1. **Guest-First (Inclusão):** A aprendizagem base deve ser sempre acessível sem forçar o utilizador a fazer login imediato. A conta serve para acrescentar valor (Gamificação/Social).
2. **Segurança no Backend:** A validação de respostas certas e a lógica deXP devem viver no PostgreSQL (Stored Procedures e RLS) e nunca ser expostas no código cliente.
3. **UI Semântica e Consistente:** A interface deve comunicar através do Design System (Azul para a marca, Laranja para desafios, Verde para sucesso).
4. **Offline-Ready:** A estrutura deve prever o caching futuro para aprendizagem sem internet.

## Prioridades do MVP (Atualizado)
1. **Infraestrutura Core:** Roteamento 5-Tabs, Cores Semânticas e Backend relacional Supabase **(Concluído)**.
2. **Sistema de Autenticação:** Criação de perfis com geração automática na BD **(Concluído)**.
3. **Gestuário & Media:** Listagem pesquisável de gestos com carregamento de vídeos CDN.
4. **Motor de Gamificação:** Lógica de Quiz, atribuição de XP, cálculo de *Streak* e visualização na aba Social.