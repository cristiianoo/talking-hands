# 🗄️ Arquitetura da Base de Dados

A base de dados está alojada no **Supabase** (PostgreSQL). A app **tem login desde o início** — não é opcional: streaks, XP e leaderboard entre amigos exigem sincronização real no servidor. A exploração de conteúdo (Gestuário, níveis) continua acessível em modo convidado; login só é pedido para guardar progresso, streak/XP, ou adicionar amigos.

## Esquema Relacional

### `categories` / `signs` / `sign_categories`
Conteúdo de aprendizagem (letras, números, palavras) e a relação muitos-para-muitos com categorias.

### `levels` / `questions` / `question_options`
Estrutura dos quizzes. `question_options.is_correct` **não é legível diretamente pelo cliente** (ver Segurança).

### `profiles`
Estende `auth.users`.
- `username` (nullable até o utilizador escolher no onboarding)
- `avatar_id` — aponta para avatar pré-definido, sem upload livre
- `current_streak` / `longest_streak`
- `total_xp` — +20 por nível concluído, +10 por desafio diário concluído

### `user_level_progress` / `daily_challenge_completions`
Progresso sincronizado no servidor. As inserções nestas tabelas disparam os triggers que calculam streak e XP automaticamente — a app nunca escreve `current_streak`/`total_xp` diretamente.

### `friendships`
Por pedido/convite (`pending` / `accepted` / `blocked`) — sem descoberta pública, sem leaderboard global.

### `favorites`
Palavras/gestos marcados para consulta rápida.

## Leaderboard
Não existe tabela própria. A app chama a função `get_friends_leaderboard()`, que devolve só o próprio utilizador + amigos aceites, ordenado por `total_xp`. Nunca fazer select direto a `profiles` no cliente para isto — a RLS até bloquearia, mas a função é a forma correta.

## Segurança
- RLS ativo em todas as tabelas com dados de utilizador
- `question_options.is_correct`: acesso à coluna revogado para `anon`/`authenticated`; validação via `check_answer(option_id)`
- `profiles`: leitura restrita ao próprio + amigos aceites (função `is_friend`)
- Migrações em `supabase/migrations/`: `0001_init_schema.sql` (tabelas), `0002_security_and_triggers.sql` (RLS + triggers), `0003_xp_and_leaderboard.sql` (XP + leaderboard)