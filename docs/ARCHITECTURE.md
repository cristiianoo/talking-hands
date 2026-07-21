# 🏗️ Arquitetura da Aplicação

A "Talking Hands" segue uma arquitetura moderna orientada a componentes, baseada no ecossistema React Native Universal e num Backend Serverless.

## Camadas

**1. Frontend (App): React Native + Expo Router**
- **File-based Routing:** Utiliza a estrutura de pastas `app/` para gerar a navegação automaticamente.
- **Global Layout:** Um sistema de 5 abas (Bottom Tabs) e um Cabeçalho Global (TopBar) injetado através do `_layout.tsx`, mantendo a UI consistente.
- **Renderização Web-Safe:** O código nativo está protegido contra erros de Server-Side Rendering (SSR) gerados na web.

**2. UI & Design System**
- **NativeWind (Tailwind CSS):** Utilizado para estilização através de classes utilitárias.
- **Design Tokens:** As cores são injetadas através de uma única fonte de verdade em `constants/colors.ts`, permitindo alterações de tema globais sem reescrever o JSX.

**3. Backend & Base de Dados (Supabase)**
- **PostgreSQL:** Base de dados relacional com políticas de segurança (RLS) apertadas.
- **Auth Trigger:** Sempre que o Supabase Auth regista um novo utilizador, um *Database Trigger* (`on_auth_user_created`) cria automaticamente uma linha espelho na tabela pública `profiles`.
- **Validação Server-Side:** A lógica de gamificação e correção dos quizzes assenta em *Stored Procedures* (ex: `check_answer()`) para evitar manipulação de rede por parte do cliente.