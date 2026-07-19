# ADR 0002: Utilização de React Native (Expo Router) como Framework Frontend

## Estado
Aceite

## Contexto
O protótipo original da "Talking Hands" foi criado com FlutterFlow (Low-Code) e gerava uma app em Flutter. Para a versão open-source de nível de produção, era necessário transitar para uma abordagem baseada em código (*code-first*), garantindo total controlo sobre a performance, UI/UX e arquitetura.

## Alternativas Consideradas
- **Flutter (Dart):** Uma evolução natural do FlutterFlow, mas menos focado no ecossistema Web/JavaScript.
- **React Native CLI (Bare):** Oferece total controlo, mas exige configurações complexas de Xcode e Android Studio para gerir módulos nativos.

## Decisão
Optou-se pelo **React Native com o framework Expo e o Expo Router**.

## Justificação
1. **Ecossistema:** Sendo React, partilha a vasta maioria das bibliotecas e conhecimento do ecossistema Web (JavaScript/TypeScript).
2. **Expo Router:** Traz o conceito de roteamento baseado no sistema de ficheiros (file-based routing), semelhante ao Next.js, tornando a navegação intuitiva e simplificando o deep-linking (importante para partilhar gestos específicos).
3. **Developer Experience (DX):** O Expo permite compilar, testar (Expo Go) e enviar para as lojas (EAS Build/Submit) sem ter de abrir as IDEs nativas pesadas, o que facilita contribuições da comunidade open-source.
4. **Performance Visual:** Integração nativa de animações e suporte para ferramentas modernas como NativeWind (Tailwind).

## Consequências
- Os componentes terão de ser totalmente reescritos do zero em relação ao FlutterFlow.
- Maior velocidade de iteração no desenvolvimento.