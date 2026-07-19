# 🏗️ Arquitetura da Aplicação

A "Talking Hands" segue uma arquitetura moderna baseada no ecossistema React Native.

## Camadas
1. **Frontend (App):** React Native + Expo Router.
2. **Estilização:** NativeWind (TailwindCSS).
3. **Gestão de Estado:** 
   - `Zustand` para estado global e progresso local do utilizador.
   - `React Query` ou cliente nativo do Supabase para fetching/cache de dados externos.
4. **Backend (BaaS):** Supabase (PostgreSQL + Auth + Storage).

## Fluxo de Dados (Vídeos)
Os vídeos dos gestos devem ser armazenados no **Supabase Storage** e servidos via CDN para garantir carregamentos rápidos na aplicação. A base de dados apenas guarda a referência (`video_url`).