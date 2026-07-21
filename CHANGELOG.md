# Changelog

Todas as alterações notáveis a este projeto serão documentadas neste ficheiro.

## [Unreleased]
### Adicionado
- Setup do projeto React Native com Expo Router.
- Integração do NativeWind v4 (TailwindCSS) e Lucide Icons.
- Navegação core (Bottom Tabs) configurada.
- Novo design do ecrã **Início**: Layout moderno com destaque para Palavra Diária.
- Novo ecrã **Aprender**: Mapa visual de progressão (timeline) estilo gamificação.
- Novo design do ecrã **Gestuário**: Grelha de conteúdos, barra de pesquisa e filtros horizontais.

### Alterado
- Estruturação inicial do repositório Open Source e Documentação Core.

### Adicionado (Gamificação & UI)
- Sistema centralizado de cores semânticas (`constants/colors.ts`) como "Fonte da Verdade" para Tailwind e Ícones.
- Componente Global `TopBar` para acompanhamento contínuo de *Streak* (Chamas) e *XP*.
- Nova aba **Social** implementada com *Leaderboard* de amigos para promover competitividade saudável.
- Aba **Definições** redesenhada com toggles nativos para Modo Escuro e Lembretes.

### Alterado
- Navegação inferior (Bottom Tabs) expandida para o standard de 5 abas (Início, Aprender, Gestuário, Social, Definições).
- Ecrã **Início** simplificado para focar na métrica de "Continuar a Aprender" e num "Desafio Diário" gamificado.
- Otimização do código (DRY): Centralização das `SafeAreaViews` no Layout principal.