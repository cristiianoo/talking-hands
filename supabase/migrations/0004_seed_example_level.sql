-- ============================================================
-- 0004 — Seed de um nível de exemplo, para testar o motor de quiz
-- Usa palavras (type = 'word') que já existem em `signs`,
-- por isso não precisa de saber quais tens exatamente.
-- Precisas de pelo menos 3 palavras já seedadas em `signs`.
-- ============================================================

do $$
declare
  v_level_id uuid;
  v_question_id uuid;
  v_sign record;
  v_distractor record;
begin
  insert into levels (title, order_index) values ('Primeiras Palavras', 1)
  returning id into v_level_id;

  for v_sign in
    select id, label from signs where type = 'word' order by random() limit 3
  loop
    insert into questions (level_id, sign_id, order_index)
    values (v_level_id, v_sign.id, 1)
    returning id into v_question_id;

    insert into question_options (question_id, label, is_correct)
    values (v_question_id, v_sign.label, true);

    for v_distractor in
      select label from signs
      where type = 'word' and id != v_sign.id
      order by random() limit 2
    loop
      insert into question_options (question_id, label, is_correct)
      values (v_question_id, v_distractor.label, false);
    end loop;
  end loop;
end $$;
