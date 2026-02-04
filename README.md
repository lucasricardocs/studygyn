# 🎯 EstudaGyn - Plataforma de Estudos para Câmara de Goiânia

Sistema completo de gestão de estudos para o Concurso da Câmara Municipal de Goiânia (Edital 01/2025).

## 🚀 Tecnologias

**Backend:**
- Node.js + Express
- SQLite (banco de dados)
- JWT (autenticação)
- bcryptjs (criptografia de senhas)

**Frontend:**
- React 18
- Recharts (gráficos)
- CSS moderno com animações

## 📦 Instalação

### 1. Instalar dependências

```bash
npm install
```

### 2. Inicializar o banco de dados

```bash
npm run init-db
```

Este comando irá:
- Criar o banco de dados SQLite
- Criar todas as tabelas necessárias
- Popular com os dados do edital (matérias e tópicos)

### 3. Iniciar o servidor

```bash
npm start
```

Para desenvolvimento com auto-reload:
```bash
npm run dev
```

O servidor estará disponível em: **http://localhost:3000**

## 🎓 Funcionalidades

### ✅ **Sistema de Autenticação**
- Registro de usuários
- Login seguro com JWT
- Proteção de rotas

### 📊 **Dashboard Rico**
- Contagem regressiva até a prova (15/03/2026)
- Gráfico de pizza (estudados vs. pendentes)
- Gráfico radar (competência por matéria)
- Barra de progresso geral

### 🤖 **IA de Sugestão**
- Algoritmo que sugere o próximo tópico baseado em:
  - Peso da matéria
  - Quantidade de questões
  - Tópicos não estudados

### 📚 **Gestão de Estudos**
- Checklist completo do edital
- Marcar tópicos como "Estudado" e "Revisado"
- Progresso salvo em tempo real
- Acordeão interativo por matéria

### 👥 **Perfis Suportados**
- Agente Administrativo (Nível Médio)
- Analista Técnico Legislativo (Nível Superior)

## 🗄️ Estrutura do Banco de Dados

### Tabelas:

**users**
- id, email, password (hash), name, cargo, created_at

**subjects** 
- id, cargo, nome, questoes, peso

**topics**
- id, subject_id, texto, ordem

**user_progress**
- id, user_id, topic_id, is_studied, is_reviewed, last_update

**study_history**
- id, user_id, date, topics_studied, hours_studied

## 🔌 API Endpoints

### Autenticação
- `POST /api/register` - Criar conta
- `POST /api/login` - Fazer login

### Conteúdo
- `GET /api/curriculum/:cargo` - Obter currículo completo
- `GET /api/subjects/:cargo` - Listar matérias
- `GET /api/subjects/:subjectId/topics` - Listar tópicos

### Progresso
- `GET /api/progress` - Obter progresso do usuário
- `POST /api/progress` - Atualizar progresso
- `GET /api/stats` - Estatísticas gerais
- `GET /api/charts` - Dados para gráficos
- `GET /api/suggestion` - Sugestão da IA

## 🎨 Design

Paleta de cores profissional:
- **Azul Marinho**: #0A1E3D (primária)
- **Verde Esmeralda**: #10B981 (sucesso/concluído)
- **Azul Accent**: #3B82F6 (destaques)
- **Cinza Claro**: #F5F7FA (backgrounds)

## 🔐 Segurança

- Senhas criptografadas com bcrypt
- Autenticação via JWT
- Tokens com expiração de 7 dias
- Rotas protegidas

## 📱 Responsivo

Interface 100% responsiva:
- Desktop
- Tablet
- Mobile

## 🚀 Deploy

### Opção 1: Vercel (Recomendado para projetos Node.js)

1. Instalar Vercel CLI:
```bash
npm install -g vercel
```

2. Fazer deploy:
```bash
vercel
```

### Opção 2: Railway

1. Criar conta em railway.app
2. Conectar repositório GitHub
3. Fazer deploy automático

### Opção 3: Render

1. Criar conta em render.com
2. Conectar repositório
3. Configurar como "Web Service"

### Opção 4: Servidor VPS (DigitalOcean, AWS, etc)

```bash
# No servidor
git clone <seu-repo>
cd estudagyn
npm install
npm run init-db
pm2 start server.js --name estudagyn
```

## 📄 Variáveis de Ambiente

Criar arquivo `.env`:

```
PORT=3000
JWT_SECRET=seu_secret_super_seguro_aqui
NODE_ENV=production
```

## 🧪 Testando

### Criar usuário de teste:
```bash
# Fazer requisição POST para /api/register
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@estudagyn.com",
    "password": "senha123",
    "name": "Usuário Teste",
    "cargo": "agente"
  }'
```

## 📊 Dados do Edital

Os dados foram extraídos dos seguintes documentos:
- Edital nº 01/2025 (Consolidado)
- Edital Complementar nº 01/2025

Conteúdos incluídos:
- ✅ Língua Portuguesa
- ✅ Raciocínio Lógico-Matemático
- ✅ Realidade de Goiás e Goiânia
- ✅ Conhecimentos Específicos (ambos os cargos)

## 🤝 Suporte

Para dúvidas ou problemas:
1. Verificar os logs do servidor
2. Verificar se o banco de dados foi inicializado
3. Verificar se todas as dependências foram instaladas

## 📝 Licença

Projeto desenvolvido para fins educacionais.

---

**Data da Prova**: 15 de Março de 2026  
**Boa sorte nos estudos!** 🎓✨
