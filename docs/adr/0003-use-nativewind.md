# ADR 0003: Utilização do NativeWind para Estilização (UI)

## Estado
Aceite

## Contexto
Na reconstrução da "Talking Hands", é fundamental ter um sistema de design consistente e que suporte nativamente Modo Claro e Modo Escuro (funcionalidade já existente no MVP da PAP). Em React Native, a estilização padrão é feita através de `StyleSheet`, o que pode tornar-se verboso e difícil de manter.

## Alternativas Consideradas
- **StyleSheet nativo:** Rápido, mas verboso e sem suporte prático de design tokens.
- **Styled Components:** Populares, mas adicionam overhead de performance em tempo de execução (runtime).
- **Restyle (Shopify):** Excelente para tipagem estrita, mas curva de aprendizagem maior.

## Decisão
Optou-se pela utilização do **NativeWind** (Tailwind CSS para React Native).

## Justificação
1. **Velocidade de Desenvolvimento:** Permite usar as classes utilitárias do Tailwind CSS, acelerando drasticamente a construção da UI.
2. **Modo Claro/Escuro:** O suporte a dark mode do Tailwind (`dark:bg-black`) facilita a implementação do requisito do projeto original.
3. **Familiaridade:** Sendo um standard na Web, facilita a contribuição de programadores Frontend para a app móvel.