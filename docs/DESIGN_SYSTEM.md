# 🎨 Design System

O Design System da "Talking Hands" foi modernizado para seguir as melhores práticas de UI/UX de 2026, com forte inspiração em aplicações de gamificação educacional (ex: Duolingo).

## A "Fonte da Verdade" (Cores)
As cores estão centralizadas no ficheiro `constants/colors.ts`. O TailwindCSS (`tailwind.config.js`) e os ícones nativos consomem os valores deste ficheiro, garantindo que qualquer alteração se propaga automaticamente por toda a aplicação.

O sistema de cores segue uma abordagem semântica rigorosa:
- **Primary (Azul - `#3B82F6`):** Identidade da marca e elementos principais (ações, botões, navegação).
- **Success (Verde - `#22C55E`):** Indicadores de progresso, respostas certas e níveis concluídos.
- **Secondary (Turquesa - `#06B6D4`):** Destaques secundários e áreas de comunicação.
- **Accent (Laranja - `#F97316`):** Elementos gamificados que exigem atenção imediata (ex: Streak, XP, Desafios Diários).
- **Danger (Vermelho - `#EF4444`):** Feedback de erro e ações destrutivas (ex: Terminar Sessão).
- **Background (`#F9FAFB`):** Fundo super limpo e claro, melhorando o contraste e a legibilidade.

## Estrutura de Navegação
A navegação baseia-se num sistema *Tab Bar* de 5 abas inferior, complementado por um cabeçalho global:
1. **Top Bar (Global):** Acompanha o utilizador em todas as rotas principais, apresentando sempre as suas métricas de retenção (*Streak* e *XP*).
2. **Bottom Tabs:** Início, Aprender (Caminho/Timeline), Gestuário (Dicionário), Social (Leaderboard) e Definições.

## Tipografia e UI Components
- **Tipografia:** Fonte sem serifa nativa do sistema (San Francisco / Roboto). Uso extensivo de *font-weights* pesados (`font-extrabold`) para títulos.
- **Cartões (Cards):** Utilização de `rounded-3xl` e `shadow-sm` para criar uma separação elegante entre o conteúdo e o fundo `background`.
- **Ícones:** Biblioteca `lucide-react-native` padronizada.