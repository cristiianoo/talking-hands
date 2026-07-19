# 🗄️ Arquitetura da Base de Dados

A base de dados será alojada no **Supabase** (PostgreSQL). Como a aplicação inicialmente não obrigará a login (conforme a PAP original), o progresso pode ser guardado localmente (Zustand/AsyncStorage) ou através de sessões anónimas no Supabase.

## Esquema Relacional (Tabelas Principais)

### `categories`
Organiza os gestos em grupos (ex: Alfabeto, Números, Cores, Saudações).
- `id` (uuid, PK)
- `title` (text) - ex: "Cores"
- `slug` (text) - ex: "cores"
- `icon_name` (text) - referência ao ícone da UI

### `gestures`
A tabela central que guarda cada palavra/letra/número.
- `id` (uuid, PK)
- `category_id` (uuid, FK -> categories)
- `name` (text) - ex: "Amarelo"
- `video_url` (text) - link para o Supabase Storage
- `is_daily_eligible` (boolean) - se pode aparecer na "Palavra Diária"

### `daily_words`
Regista qual o gesto destacado em cada dia.
- `id` (uuid, PK)
- `date` (date) - ex: "2026-07-19"
- `gesture_id` (uuid, FK -> gestures)

### `quiz_levels`
Define os níveis de aprendizagem (ex: "Nível 1 - Saudações").
- `id` (uuid, PK)
- `title` (text)
- `description` (text)
- `order` (integer) - ordenação do nível

### `quiz_questions`
- `id` (uuid, PK)
- `level_id` (uuid, FK -> quiz_levels)
- `gesture_id` (uuid, FK -> gestures) - o vídeo a mostrar
- `options` (jsonb) - array com opções incorretas e a correta