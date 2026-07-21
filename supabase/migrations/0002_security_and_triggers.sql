-- ============================================================
-- 0002 — Segurança e Triggers em falta
-- Corre isto DEPOIS do 0001 (não apaga nada, só adiciona)
-- ============================================================

-- 1. Trigger: criar perfil automaticamente ao registar
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id)
  values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- 2. Função: verificar amizade (usada na policy de profiles)
create or replace function public.is_friend(user_a uuid, user_b uuid)
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from friendships
    where status = 'accepted'
    and ((requester_id = user_a and addressee_id = user_b)
      or (requester_id = user_b and addressee_id = user_a))
  );
$$;

-- 3. Trigger: cálculo automático da streak
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
    last_practice_date = new.challenge_date
  where id = new.user_id;
  return new;
end;
$$;

drop trigger if exists on_daily_challenge_completion on daily_challenge_completions;
create trigger on_daily_challenge_completion
after insert on daily_challenge_completions
for each row execute function public.update_streak();

-- 4. Row Level Security — conteúdo (leitura pública)
alter table categories enable row level security;
create policy "Conteúdo legível por todos" on categories for select using (true);

alter table signs enable row level security;
create policy "Conteúdo legível por todos" on signs for select using (true);

alter table sign_categories enable row level security;
create policy "Conteúdo legível por todos" on sign_categories for select using (true);

alter table levels enable row level security;
create policy "Conteúdo legível por todos" on levels for select using (true);

alter table questions enable row level security;
create policy "Conteúdo legível por todos" on questions for select using (true);

alter table question_options enable row level security;
create policy "Conteúdo legível por todos" on question_options for select using (true);

-- 5. Row Level Security — dados de utilizador
alter table profiles enable row level security;
create policy "Perfil próprio ou de amigos é legível"
on profiles for select
using (id = auth.uid() or public.is_friend(auth.uid(), id));

create policy "Só o próprio edita o perfil"
on profiles for update
using (id = auth.uid());

create policy "Inserção restrita ao próprio id"
on profiles for insert
with check (id = auth.uid());

alter table user_level_progress enable row level security;
create policy "Só o próprio vê o progresso" on user_level_progress for select using (user_id = auth.uid());
create policy "Só o próprio regista progresso" on user_level_progress for insert with check (user_id = auth.uid());

alter table daily_challenge_completions enable row level security;
create policy "Só o próprio vê conclusões" on daily_challenge_completions for select using (user_id = auth.uid());
create policy "Só o próprio regista conclusões" on daily_challenge_completions for insert with check (user_id = auth.uid());

alter table favorites enable row level security;
create policy "Só o próprio vê favoritos" on favorites for select using (user_id = auth.uid());
create policy "Só o próprio adiciona favoritos" on favorites for insert with check (user_id = auth.uid());
create policy "Só o próprio remove favoritos" on favorites for delete using (user_id = auth.uid());

alter table friendships enable row level security;
create policy "Participantes veem a amizade" on friendships for select using (auth.uid() in (requester_id, addressee_id));
create policy "Só quem pede cria o pedido" on friendships for insert with check (requester_id = auth.uid());
create policy "Participantes atualizam o estado" on friendships for update using (auth.uid() in (requester_id, addressee_id));
create policy "Participantes podem remover" on friendships for delete using (auth.uid() in (requester_id, addressee_id));

-- 6. Fechar de vez o acesso direto a is_correct
revoke select on question_options from anon, authenticated;
grant select (id, question_id, label) on question_options to anon, authenticated;