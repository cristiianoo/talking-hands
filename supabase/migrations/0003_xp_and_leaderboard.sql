-- ============================================================
-- 0003 — XP e Leaderboard entre amigos
-- Corre depois do 0001 e 0002
-- ============================================================

-- 1. Campo de XP no perfil
alter table profiles add column if not exists total_xp integer not null default 0;

-- 2. XP por concluir um nível (+20)
create or replace function public.award_level_xp()
returns trigger
language plpgsql
as $$
begin
  update profiles
  set total_xp = total_xp + 20
  where id = new.user_id;
  return new;
end;
$$;

drop trigger if exists on_level_completed on user_level_progress;
create trigger on_level_completed
after insert on user_level_progress
for each row execute function public.award_level_xp();

-- 3. XP por concluir o desafio diário (+10)
-- Reaproveita o trigger que já existia para a streak (0002),
-- só adiciona a linha do total_xp à mesma função.
create or replace function public.update_streak()
returns trigger
language plpgsql
as $$
begin
  update profiles
  set
    current_streak = case
      when last_practice_date = new.challenge_date - 1 then current_streak + 1
      when last_practice_date = new.challenge_date then current_streak
      else 1
    end,
    longest_streak = greatest(longest_streak,
      case when last_practice_date = new.challenge_date - 1 then current_streak + 1 else 1 end),
    last_practice_date = new.challenge_date,
    total_xp = total_xp + 10
  where id = new.user_id;
  return new;
end;
$$;
-- (o trigger on_daily_challenge_completion já criado no 0002 passa a usar esta versão nova)

-- 4. RPC do leaderboard — devolve só o próprio + amigos aceites,
-- nunca a tabela toda. É esta função que a app deve chamar,
-- em vez de fazer select direto a `profiles`.
create or replace function public.get_friends_leaderboard()
returns table (
  id uuid,
  username text,
  avatar_id text,
  total_xp integer,
  current_streak integer
)
language sql
security definer
stable
as $$
  select p.id, p.username, p.avatar_id, p.total_xp, p.current_streak
  from profiles p
  where p.id = auth.uid()
     or public.is_friend(auth.uid(), p.id)
  order by p.total_xp desc;
$$;