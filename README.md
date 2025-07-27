
# Desafio técnico do SIDIA - Desenvolvedor

Este projeto é uma solução para o desafio técnico proposto, que consiste em:

1. Preparar e processar um dataset de filmes.
2. Criar uma aplicação web (frontend e backend) para consumir os dados processados.
3. Implementar um sistema de recomendação de filmes.

---

## 📁 Estrutura do Projeto

```
├── backend/        # Backend com FastAPI
├── frontend/       # Frontend com React + TypeScript
└── README.md
```
## 📦 Clonando o Projeto

```bash
git clone https://github.com/edilosousa/desafio-sidia.git
cd desafio-sidia
```
---

## 🔧 Backend (FastAPI)

### ✅ Pré-requisitos

- Python 3.9+
- virtualenv

### 🔽 Instalação

## Preparar o Dataset
Acesse o site:
👉 https://www.kaggle.com/datasets/asaniczka/tmdb-movies-dataset-2023-930k-movies/data

⚠ Faça o download do arquivo CSV (por exemplo: tmdb_2023.csv);

⚠ Renomeie o arquivo para: movies.csv e mova esse file para pasta data.

```bash
# Criar ambiente virtual
python3 -m venv venv

# Ativar ambiente (Linux/Mac)
source venv/bin/activate

# Ativar ambiente (Windows CMD)
venv\Scripts\activate

# Instalar dependências
pip install -r requirements.txt
```

### ▶️ Rodar servidor

```bash
uvicorn app.main:app --reload
```

### 🧪 API Docs

Acesse [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) ou o endereço disponivel para visualizar a documentação interativa da API via Swagger.
- ✅ Método	Endpoint	Descrição
- ✅ GET	/movies/recommendations	Retorna lista de filmes recomendados (populares) com base nos critérios: não adultos, >200 votos, nota >6, ordenados por número de votos.
- ✅ GET	/movies	Retorna lista paginada de filmes. Aceita parâmetros limit e offset para paginação.
- ✅ GET	/movies/{movie_id}	Retorna detalhes de um filme específico pelo seu ID.

---

## 🖥️ Frontend (React + Vite + TypeScript)

### ✅ Pré-requisitos

- Node.js 18+
- npm

### 🔽 Instalação

```bash
npm install
```

### ▶️ Rodar aplicação

```bash
cd frontend
npm run dev
```

---

## 📌 Tecnologias Utilizadas

### Backend

- FastAPI
- Uvicorn
- Pandas
- Pydantic


### Frontend

- React
- TypeScript
- Vite
- Axios
- React Router DOM
- React Data Table Component
- React Bootstrap

---

## 💡 Recomendação de Filmes

Critérios de Recomendação
A recomendação retorna uma lista com os filmes mais populares, com base nos seguintes critérios:

- ✅ Apenas filmes não adultos (adult == False).

- ✅ Filmes com mais de 200 votos (vote_count > 200).

- ✅ Filmes com nota média maior que 6 (vote_average > 6).

- ✅ Os filmes são ordenados pelo número de votos (do maior para o menor).


## 📄 Entregáveis

- ✅ Código-fonte completo (backend + frontend)
- ✅ Instruções de instalação e execução
- ✅ Documentação da API (Swagger)
- ✅ Lógica de recomendação implementada
- ✅ README.md explicativo

---

## 📬 Contato

> Desenvolvido por Édilo Silva para o desafio técnico.
