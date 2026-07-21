# ADR 0004: Modo Convidado vs Autenticação Obrigatória

## Estado
Aceite

## Contexto
Com a introdução de funcionalidades sociais (Leaderboard/Amigos) e gamificação contínua (Streak, XP), foi necessário decidir como gerir os dados dos utilizadores e o acesso à aplicação.

## Decisão
Foi decidido adotar um **Modelo Híbrido (Freemium/Guest-first)**:
1. **Modo Convidado:** A exploração de conteúdo base (Gestuário, pesquisa, visualização de categorias e vídeos) continua 100% acessível sem necessidade de login. Isto reduz a fricção inicial e mantém o espírito inclusivo da PAP original.
2. **Login Obrigatório:** Para guardar o Streak, progresso dos níveis (Quizzes), sincronizar entre dispositivos ou adicionar amigos, o utilizador será obrigado a criar conta.

## Justificação
Guardar streaks e relações sociais (friendships) apenas no `AsyncStorage` (local) resultaria em perda de dados se o utilizador trocasse de telemóvel e impediria a componente social. O Supabase gere a autenticação perfeitamente via `auth.users`, permitindo ligar essas tabelas ao perfil do utilizador.