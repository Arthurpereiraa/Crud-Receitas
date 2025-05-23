# 🍳 Crud de Receitas

Um aplicativo web completo para gerenciamento de receitas culinárias, com front-end moderno em **React.js** e back-end robusto em **Node.js**, **Express** e **MongoDB**.

---

## 📋 Sobre o Projeto

CRUD (Create, Read, Update, Delete) de receitas culinárias: crie, visualize, edite e exclua receitas, com imagens, ingredientes, modo de preparo e categorização (doce/salgado). Arquitetura separada entre front-end e back-end, facilitando manutenção e escalabilidade.

---

## 🗂️ Estrutura de Pastas

```text
Crud-Receitas/
│
├── backend/                  # API RESTful (Node.js, Express, MongoDB)
│   ├── src/
│   │   ├── controllers/      # Endpoints (ex: RecipeController.js)
│   │   ├── models/           # Modelos do banco (ex: Recipe.js)
│   │   ├── routes/           # Rotas da API (ex: recipeRoutes.js)
│   │   ├── config/           # Configs (ex: database.js)
│   │   └── app.js            # Inicialização Express
│   ├── package.json
│   └── .env                  # Variáveis ambiente
│
├── frontend/                 # App React.js
│   ├── public/
│   ├── src/
│   │   ├── components/       # Componentes reutilizáveis
│   │   ├── pages/            # Páginas principais
│   │   ├── services/         # Serviços API
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .env                  # URL da API
│
├── README.md
└── LICENSE
```

---

## ✨ Funcionalidades

- Visualização de receitas com imagens
- Categorização (doce/salgado)
- Detalhes: ingredientes, modo de preparo, descrição e imagem
- Adição, edição e remoção de receitas
- Integração front-end & back-end via API RESTful
- Persistência com MongoDB

---

## 🎯 Exemplos de Receitas

- Bolo de Chocolate
- Pão de Queijo
- Lasanha à Bolonhesa
- Pudim de Leite

---

## 🚀 Tecnologias Utilizadas

### Front-end
- React.js
- JavaScript (ES6+)
- CSS Modules ou Styled Components
- HTML5
- Axios

### Back-end
- Node.js
- Express.js
- MongoDB & Mongoose
- CORS
- Dotenv

---

## 📥 Como Instalar

### 1. Clone o repositório

```bash
git clone https://github.com/Arthurpereiraa/Crud-Receitas.git
cd Crud-Receitas
```

### 2. Configure o Back-end

```bash
cd backend
cp .env.example .env     # Configure as variáveis de ambiente (ex: URL do MongoDB)
npm install
npm run dev              # ou npm start
```

> A API estará disponível em `http://localhost:5000`

### 3. Configure o Front-end

```bash
cd ../frontend
cp .env.example .env     # Configure a URL da API (REACT_APP_API_URL)
npm install
npm start
```

> O front-end estará disponível em `http://localhost:3000`

---

## 💻 Como Usar

1. Acesse `http://localhost:3000`
2. Visualize todas as receitas na página inicial
3. Clique em uma receita para ver os detalhes
4. Adicione novas receitas pelo botão **"Adicionar Receita"**
5. Edite ou exclua receitas conforme desejar

---

## 🔗 Integração Front-end x Back-end

O front-end consome a API RESTful do back-end. Endpoints principais:

- `GET /recipes` – Lista todas as receitas
- `GET /recipes/:id` – Detalhe de uma receita
- `POST /recipes` – Cria nova receita
- `PUT /recipes/:id` – Edita receita
- `DELETE /recipes/:id` – Remove receita

Configure a URL da API no `.env` do front-end para integração correta.

---

## 🤝 Contribuindo

Contribuições são sempre bem-vindas!

1. Faça um **fork** do projeto
2. Crie uma branch (`git checkout -b feature/NovaFeature`)
3. Faça commit (`git commit -m 'Adicionando nova feature'`)
4. Push na branch (`git push origin feature/NovaFeature`)
5. Abra um **Pull Request**

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 📬 Contato

**Arthur Pereira** – arthurpsf8@gmail.com
**Nicole** - nicole.v.nascimento@gmail.com
**Ana Clara** - anacs.lima007@gmail.com
Link do projeto: [https://github.com/Arthurpereiraa/Crud-Receitas](https://github.com/Arthurpereiraa/Crud-Receitas)
