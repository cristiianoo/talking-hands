# ADR 0001: Utilização do Supabase como Backend as a Service (BaaS)

## Estado
Aceite

## Contexto
O projeto original ("Talking Hands" - PAP) utilizava Firebase (Firestore) para armazenar imagens e vídeos dos gestos da Língua Gestual Portuguesa (LGP). Ao reestruturar a aplicação para um modelo Open Source, foi necessário reavaliar o backend para garantir maior flexibilidade, relacionamentos de dados complexos e uma cultura open-source.

## Alternativas Consideradas
- **Firebase:** Fácil de usar e familiar, mas é um banco de dados NoSQL (document-based) proprietário da Google, o que dificulta migrações futuras e relações complexas entre categorias, níveis e gestos.
- **Appwrite:** Open-source, mas com uma comunidade e ecossistema de integrações móveis ainda em crescimento face aos concorrentes.

## Decisão
Optou-se por utilizar o **Supabase**.

## Justificação
1. **PostgreSQL:** Ao contrário do Firebase (NoSQL), o Supabase utiliza PostgreSQL. Isto permite relações estruturadas perfeitas entre entidades (ex: `Categorias` -> `Gestos` -> `Níveis`).
2. **Open-Source:** Alinha-se a 100% com a visão do projeto.
3. **Tipagem (TypeScript):** O Supabase gera automaticamente os tipos TypeScript a partir da base de dados, garantindo type-safety do backend até à UI.
4. **Armazenamento de Vídeo (Storage):** Excelente sistema de Storage integrado para os vídeos dos gestos com políticas de segurança (Row Level Security - RLS) simples de implementar.

## Consequências
- A necessidade de modelar a base de dados relacional (SQL) antes da implementação.
- Redução do risco de vendor lock-in.
- Curva de aprendizagem ligeiramente superior ao Firebase, compensada pela tipagem forte.