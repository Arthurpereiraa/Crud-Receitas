````markdown name=README.md
# 🍳 Crud de Receitas

Um aplicativo web completo para gerenciamento de receitas culinárias, com front-end moderno (React.js) e back-end robusto em Node.js, Express e MongoDB.

---

## 📋 Sobre o Projeto

Este projeto é um CRUD (Create, Read, Update, Delete) de receitas culinárias, permitindo criar, visualizar, editar e excluir receitas. O sistema gerencia receitas com imagens, ingredientes, modo de preparo, e categorização por tipo (doce/salgado). Possui arquitetura separada entre front-end e back-end, facilitando manutenção e escalabilidade.

---

## 🗂️ Estrutura de Pastas

```
Crud-Receitas/
│
├── backend/                  # API RESTful com Node.js, Express e MongoDB
│   ├── src/
│   │   ├── controllers/      # Lógica dos endpoints (ex: RecipeController.js)
│   │   ├── models/           # Modelos do banco de dados (ex: Recipe.js)
│   │   ├── routes/           # Definição das rotas da API (ex: recipeRoutes.js)
│   │   ├── config/           # Configurações (ex: database.js)
│   │   └── app.js            # Inicialização da aplicação Express
│   ├── package.json
│   └── .env                  # Variáveis de ambiente (ex: conexão MongoDB)
│
├── frontend/                 # Aplicação React.js
│   ├── public/
│   ├── src/
│   │   ├── components/       # Componentes reutilizáveis (ex: RecipeCard.js)
│   │   ├── pages/            # Páginas principais (ex: Home.js, RecipeDetail.js)
│   │   ├── services/         # Serviços de integração com a API (ex: api.js)
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .env                  # Configuração da URL da API
│
├── README.md
└── LICENSE
```

---

## ✨ Funcionalidades

- Visualização de receitas com imagens
- Categorização por tipo (doce/salgado)
- Detalhes completos de cada receita: ingredientes, modo de preparo, descrição e imagem
- Adição, edição e remoção de receitas
- Integração front-end e back-end via API RESTful
- Persistência de dados com MongoDB

---

## 🎯 Exemplo de Receitas

O sistema já vem com algumas receitas pré-cadastradas como:
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
- Axios (requisições à API)

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
cp .env.example .env     # Configure as variáveis de ambiente, como a URL do MongoDB
npm install
npm run dev              # ou npm start
```

A API estará disponível em `http://localhost:5000`

### 3. Configure o Front-end

```bash
cd ../frontend
cp .env.example .env     # Configure a URL da API (REACT_APP_API_URL)
npm install
npm start
```

O front-end estará disponível em `http://localhost:3000`

---

## 💻 Como Usar

1. Acesse `http://localhost:3000`
2. Visualize todas as receitas na página inicial
3. Clique em uma receita para ver seus detalhes
4. Adicione novas receitas pelo botão "Adicionar Receita"
5. Edite ou exclua receitas conforme desejar

---

## 🔗 Integração entre Front-end e Back-end

O front-end consome a API RESTful exposta pelo back-end para todas as operações de CRUD. Os endpoints típicos incluem:

- `GET /recipes` – Lista todas as receitas
- `GET /recipes/:id` – Detalhe de uma receita
- `POST /recipes` – Cria nova receita
- `PUT /recipes/:id` – Edita receita
- `DELETE /recipes/:id` – Remove receita

Configure a URL da API no arquivo `.env` do front-end para garantir a comunicação correta entre as partes.

---

## 🤝 Contribuindo

Contribuições são sempre bem-vindas!

1. Faça um fork do projeto
2. Crie uma branch (`git checkout -b feature/NovaFeature`)
3. Faça commit das mudanças (`git commit -m 'Adicionando nova feature'`)
4. Faça push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 📬 Contato

Arthur Pereira – arthur.pereira@email.com

Link do projeto: [https://github.com/Arthurpereiraa/Crud-Receitas](https://github.com/Arthurpereiraa/Crud-Receitas)
````
