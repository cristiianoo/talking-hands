-- Limpeza (caso queiras correr este script várias vezes para testar)
DROP TABLE IF EXISTS sign_categories, favorites, question_options, questions, levels, signs, categories, friendships, daily_challenge_completions, user_level_progress, profiles CASCADE;

-- 1. Categorias e Sinais (Gestos)
CREATE TABLE categories (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  slug text NOT NULL UNIQUE
);

CREATE TABLE signs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  type text CHECK (type IN ('letter', 'number', 'word')) NOT NULL,
  label text NOT NULL,
  value integer,
  media_url text,
  media_type text CHECK (media_type IN ('image', 'video')) NOT NULL
);

-- Relação Muitos-para-Muitos
CREATE TABLE sign_categories (
  sign_id uuid REFERENCES signs(id) ON DELETE CASCADE,
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (sign_id, category_id)
);

-- 2. Quizzes / Níveis
CREATE TABLE levels (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  order_index integer NOT NULL
);

CREATE TABLE questions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  level_id uuid REFERENCES levels(id) ON DELETE CASCADE,
  sign_id uuid REFERENCES signs(id) ON DELETE CASCADE,
  order_index integer NOT NULL
);

CREATE TABLE question_options (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  question_id uuid REFERENCES questions(id) ON DELETE CASCADE,
  label text NOT NULL,
  is_correct boolean NOT NULL
);

-- 3. Perfis e Gamificação
CREATE TABLE profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username text UNIQUE,
  avatar_id text,
  current_streak integer DEFAULT 0,
  longest_streak integer DEFAULT 0,
  last_practice_date date
);

CREATE TABLE user_level_progress (
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  level_id uuid REFERENCES levels(id) ON DELETE CASCADE,
  completed_at timestamp with time zone DEFAULT now(),
  PRIMARY KEY (user_id, level_id)
);

CREATE TABLE daily_challenge_completions (
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  challenge_date date NOT NULL,
  PRIMARY KEY (user_id, challenge_date)
);

-- 4. Social
CREATE TABLE friendships (
  requester_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  addressee_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  status text CHECK (status IN ('pending', 'accepted', 'blocked')) DEFAULT 'pending',
  PRIMARY KEY (requester_id, addressee_id)
);

CREATE TABLE favorites (
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  sign_id uuid REFERENCES signs(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, sign_id)
);

-- 5. FUNÇÃO DE SEGURANÇA ANTICHEAT (A tua ideia!)
CREATE OR REPLACE FUNCTION check_answer(option_id uuid)
RETURNS boolean AS $$
DECLARE
  is_correct boolean;
BEGIN
  SELECT question_options.is_correct INTO is_correct 
  FROM question_options 
  WHERE id = option_id;
  RETURN is_correct;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;