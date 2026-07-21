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

**3. Configurar Autenticação (só em desenvolvimento)**
O serviço de email padrão do Supabase tem um limite muito baixo de envios por hora — suficiente para testar, não para uso real — e é fácil de esgotar ao criar várias contas de teste seguidas.

Para desenvolver sem esbarrar nisso: **Authentication → Providers → Email → desliga "Confirm email"**. Isto permite entrar imediatamente depois de criar conta, sem esperar por um link de confirmação.

> ⚠️ Antes de lançar a app publicamente (Fase 7), é preciso configurar um SMTP próprio (ex: [Resend](https://resend.com)) em **Authentication → Settings → SMTP Settings** e reativar o "Confirm email".

**4. Iniciar a Aplicação**
```bash
npx expo start -c
```
Faz scan do QR code com a aplicação **Expo Go** (Android/iOS) no teu telemóvel (certifica-te que estás na mesma rede Wi-Fi).