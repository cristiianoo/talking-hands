# ⚙️ Como Configurar o Projeto Localmente

Para correres a "Talking Hands" na tua máquina local, vais precisar de ter o [Node.js](https://nodejs.org/) instalado.

## Passo a Passo

**1. Clonar e Instalar**
```bash
git clone https://github.com/TEU_USERNAME/talking-hands.git
cd talking-hands
npm install
```

**2. Configurar a Base de Dados (Supabase)**
1. Cria um projeto no [Supabase](https://supabase.com).
2. Corre os scripts SQL localizados na pasta `supabase/migrations/` no teu SQL Editor para recriar as tabelas.
3. Na raiz do projeto, cria um ficheiro chamado `.env`.
4. Vai às "Project Settings > API" do Supabase e copia as chaves para o `.env`:
```env
EXPO_PUBLIC_SUPABASE_URL=https://teu-projeto.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=tua-chave-anon-aqui
```

**3. Iniciar a Aplicação**
```bash
npx expo start -c
```
Faz scan do QR code com a aplicação **Expo Go** (Android/iOS) no teu telemóvel (certifica-te que estás na mesma rede Wi-Fi).