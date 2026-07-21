# Changelog

Todas as alterações notáveis a este projeto serão documentadas neste ficheiro.

## [Unreleased]

### Adicionado
**Setup & Arquitetura:**
- Setup do projeto React Native com Expo Router.
- Integração do NativeWind v4 (TailwindCSS) e Lucide Icons.
- Sistema centralizado de cores semânticas (`constants/colors.ts`) como "Fonte da Verdade".

**UI & Gamificação:**
- Componente Global `TopBar` para acompanhamento contínuo de *Streak* (Chamas) e *XP*.
- Novo ecrã **Aprender**: Mapa visual de progressão (timeline) estilo gamificação.
- Novo ecrã **Gestuário**: Grelha de conteúdos, barra de pesquisa e filtros horizontais.
- Nova aba **Social** implementada com *Leaderboard* de amigos para promover competitividade saudável.
- Aba **Definições** redesenhada com toggles nativos para Modo Escuro e Lembretes.

**Backend & Autenticação:**
- **Ecrã de Login/Registo** (`app/login.tsx`) com interface limpa e integração Supabase Auth.
- Extração de *metadata* no registo (geração de username automático com base no email).
- Botão de acesso (CTA) para criação de Perfil integrado na aba de Definições.
- Lógica de roteamento dinâmico (`expo-router`) para ecrãs modais sobrepostos às abas.
- **Gestuário Dinâmico:** App ligada com sucesso à Cloud (PostgreSQL) usando relações Muitos-para-Muitos.

### Alterado
- Estruturação inicial do repositório Open Source e Documentação Core.
- Navegação inferior (Bottom Tabs) expandida para o standard de 5 abas.
- Ecrã **Início** simplificado para focar na métrica de "Continuar a Aprender" e num "Desafio Diário" gamificado.
- Otimização do código (DRY): Centralização das `SafeAreaViews` no Layout principal.