# Loja de Produtos - Desafio Front-end II

## Visão Geral

Website completo com três páginas principais desenvolvido para o desafio de Desenvolvimento Front-end II.

**Estrutura:** HTML, CSS e JavaScript

## Características Principais

### 1. **Três Páginas Web Implementadas**
- **Página Inicial (index.html)**: Informações sobre a loja com hero section elegante
- **Página de Usuários (users/users.html)**: Listagem, adição e remoção de usuários
- **Página de Produtos (products/products.html)**: Listagem, adição e remoção de produtos

### 2. **Consumo de API Pública**
- Usuários: `https://dummyjson.com/users`
- Produtos: `https://dummyjson.com/products`
- Mapeamento automático de campos conforme especificação

### 3. **Validação Completa de Campos**
Todas as validações conforme especificado no desafio:
- **Texto** (nome, sobrenome, título, descrição, marca, categoria): 3-50 caracteres, obrigatório
- **Email**: Validação com regex fornecida
- **Idade e Preço**: Números positivos menores que 120
- **Fotos**: URLs opcionais, validadas quando informadas

### 4. **Funcionalidades CRUD Local**
- Listar usuários e produtos da API
- Adicionar novos usuários e produtos (armazenamento local em memória)
- Remover usuários e produtos com confirmação
- Validação em tempo real com feedback claro

## Estrutura do Projeto

```
loja-produtos/
├── assets/
│   └── css/
│       └── styles.css          # Estilos globais
├── users/
│   ├── users.html              # Página de usuários
│   └── users.js                # Lógica de usuários
├── products/
│   ├── products.html           # Página de produtos
│   └── products.js             # Lógica de produtos
├── index.html                  # Página inicial
├── main.js                     # Lógica compartilhada e validações
└── README.md                   # Este arquivo
```
