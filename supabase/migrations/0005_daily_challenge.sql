-- ============================================================
-- 0005 — Desafio Diário
-- Sem tabela própria: gerado em runtime, com seed determinístico
-- por dia (mesmo desafio para quem entrar no mesmo dia).
-- ============================================================

-- 3 palavras do dia, nunca revela o label diretamente ao "escolher"
-- — o label só aparece já embaralhado dentro das opções (ver abaixo)
create or replace function public.get_daily_challenge()
returns table (
  item_index bigint,
  sign_id uuid,
  media_url text,
  media_type text
)
language sql
stable
as $$
  select row_number() over () as item_index, id, media_url, media_type
  from signs
  where type = 'word'
  order by md5(id::text || to_char(current_date, 'YYYY-MM-DD'))
  limit 3;
$$;

-- Opções de resposta para uma das 3 palavras do desafio — devolve os
-- 3 labels (1 certo + 2 distratores) já embaralhados, sem dizer qual é qual
create or replace function public.get_challenge_options(p_sign_id uuid)
returns table (label text)
language sql
stable
as $$
  select label from (
    select label from signs where id = p_sign_id
    union all
    (
      select label from signs
      where type = 'word' and id != p_sign_id
      order by random()
      limit 2
    )
  ) opts
  order by random();
$$;

-- Validação — o cliente nunca sabe qual é a certa antes de responder
create or replace function public.check_daily_answer(p_sign_id uuid, p_guess text)
returns boolean
language sql
stable
as $$
  select exists (
    select 1 from signs where id = p_sign_id and label = p_guess
  );
$$;
