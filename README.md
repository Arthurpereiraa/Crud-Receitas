# 🍳 Crud de Receitas

Um sistema completo de gerenciamento de receitas culinárias, com arquitetura full stack: **front-end em React-Native** e **back-end em Node.js/Express/MongoDB**. Permite criar, visualizar, editar e excluir receitas, com imagens, ingredientes, modo de preparo e categorização (doce/salgado). 

---

## 📚 Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Arquitetura & Estrutura de Pastas](#arquitetura--estrutura-de-pastas)
- [Funcionalidades Detalhadas](#funcionalidades-detalhadas)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Guia de Instalação (Passo a Passo)](#guia-de-instalação-passo-a-passo)
- [Como Usar](#como-usar)
- [Configuração de Ambiente](#configuração-de-ambiente)
- [Principais Endpoints da API](#principais-endpoints-da-api)
- [Fluxo de Desenvolvimento & Contribuição](#fluxo-de-desenvolvimento--contribuição)
- [Licença](#licença)
- [Contato](#contato)

---

## Sobre o Projeto

O **Crud de Receitas** foi desenvolvido para facilitar o registro, consulta e organização de receitas culinárias. Ideal para quem deseja manter um acervo digital de receitas, com interface moderna e intuitiva.

- **Front-end React-Native**: Interface amigável para interação com as receitas.
- **Back-end Express/MongoDB**: API RESTful robusta para persistência e manipulação dos dados.

---

## Arquitetura & Estrutura de Pastas

```text
Crud-Receitas/
│
├── backend/                  # API RESTful (Node.js, Express, MongoDB)
│   ├── src/
│   │   ├── controllers/      # Lógica dos endpoints (RecipeController.js, etc)
│   │   ├── models/           # Modelos Mongoose (Recipe.js, etc)
│   │   ├── routes/           # Definição das rotas (recipeRoutes.js, etc)
│   │   ├── config/           # Configurações (database.js, etc)
│   │   └── app.js            # Inicialização do app Express
│   ├── package.json
│   └── .env
│
├── frontend/                 # Aplicação React-Native
│   ├── public/
│   ├── src/
│   │   ├── components/       # Componentes reutilizáveis (RecipeCard, RecipeForm, etc)
│   │   ├── pages/            # Páginas principais (Home, Details, Create, Edit, etc)
│   │   ├── services/         # Serviços de integração com a API (api.js, etc)
│   │   ├── App.js            # Componente principal
│   │   └── index.js          # Ponto de entrada
│   ├── package.json
│   └── .env
│
├── README.md
└── LICENSE
```

---

## Funcionalidades Detalhadas

### Front-end

- Visualização de todas as receitas cadastradas, com filtro por categoria (doce/salgado).
- Página de detalhes de cada receita.
- Cadastro de nova receita, incluindo upload de imagem.
- Edição e exclusão de receitas existentes.
- Validação de formulário e feedback ao usuário.
- Integração completa com a API através do serviço centralizado.

### Back-end

- API RESTful estruturada em MVC.
- Endpoints seguros para CRUD de receitas.
- Upload e armazenamento de imagens (local ou serviço externo).
- Validação e sanitização dos dados recebidos.
- Conexão com MongoDB usando Mongoose.
- Configuração por variáveis de ambiente via dotenv.

---

## Tecnologias Utilizadas

### Front-end

- React-Native (Hooks, Context API, React Navigation)
- JavaScript (ES6+)
- Styled Components ou CSS-in-JS
- Axios

### Back-end

- Node.js
- Express.js
- MongoDB & Mongoose
- Multer (upload de imagens)
- CORS
- Dotenv

---

## Guia de Instalação (Passo a Passo)

### 1. Clone o repositório

```bash
git clone https://github.com/Arthurpereiraa/Crud-Receitas.git
cd Crud-Receitas
```

### 2. Configurando o Back-end

```bash
cd backend
cp .env.example .env     # Configure as variáveis de ambiente (MongoDB, etc)
npm install
npm run dev              # ou npm start
```
> A API estará disponível em `http://localhost:5000`

**Exemplo de .env:**
```
MONGODB_URI=mongodb://localhost:27017/crud_receitas
PORT=5000
```

### 3. Configurando o Front-end

```bash
cd ../frontend
cp .env.example .env     # Configure a URL da API (REACT_APP_API_URL)
npm install
npm start
```
> O front-end estará disponível em `http://localhost:3000`

**Exemplo de .env:**
```
REACT_APP_API_URL=http://localhost:5000
```

---

## Como Usar

1. Acesse `http://localhost:3000`
2. Visualize todas as receitas na tela inicial.
3. Clique em uma receita para ver os detalhes.
4. Utilize o botão **"Adicionar Receita"** para cadastrar novas receitas.
5. Edite ou exclua receitas já cadastradas conforme desejar.

---

## Configuração de Ambiente

- O arquivo `.env.example` em ambos os diretórios (`backend/`, `frontend/`) serve de modelo para configuração local.
- Para produção, utilize variáveis de ambiente seguras e serviços adequados para MongoDB e hospedagem de imagens.

---

## Principais Endpoints da API

- `GET /recipes` – Lista todas as receitas
- `GET /recipes/:id` – Detalhes de uma receita
- `POST /recipes` – Cria nova receita (requer campos: nome, ingredientes, modo de preparo, categoria, imagem)
- `PUT /recipes/:id` – Atualiza uma receita existente
- `DELETE /recipes/:id` – Remove uma receita

---

## Fluxo de Desenvolvimento & Contribuição

1. Faça um **fork** do projeto
2. Crie uma branch (`git checkout -b feature/NomeDaFeature`)
3. Faça commit das alterações (`git commit -m 'Descrição da feature'`)
4. Push para sua branch (`git push origin feature/NomeDaFeature`)
5. Abra um **Pull Request** detalhando sua contribuição

---

## Licença

Distribuído sob licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais informações.

---

## Contato

- **Arthur Heleno** - arthurhelenobritocosta@gmail.com
- **Arthur Pereira** – arthurpsf8@gmail.com
- **Nicole** - nicole.v.nascimento@gmail.com
- **Ana Clara** - anacs.lima007@gmail.com

Projeto no GitHub: [https://github.com/Arthurpereiraa/Crud-Receitas](https://github.com/Arthurpereiraa/Crud-Receitas)
