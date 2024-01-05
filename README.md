<p align="center">
    <img src="https://raw.githubusercontent.com/lamenkazu/foodexplorer_frontend/main/src/assets/Brand.png" height="30" width="200" alt="Food Explorer" />
</p>

<p align="center"> Backend de um E-commerce fictício para o desafio final do curso Explorer! 🚀</p>

<div align="center">

![Static Badge](https://img.shields.io/badge/NPM%20-%209.8.0%20-%20%23065E7C)
![Static Badge](https://img.shields.io/badge/Server%20-%20Express%20-%20%23065E7C)
![Static Badge](https://img.shields.io/badge/Database%20-%20SQLite%20-%20%23065E7C)
![Static Badge](https://img.shields.io/badge/QueryBuilder%20-%20Knex%20-%20%23065E7C)
![Static Badge](https://img.shields.io/badge/Authentication%20-%20JWT%20-%20%23065E7C)
![Static Badge](https://img.shields.io/badge/FileUpload%20-%20Multer%20-%20%23065E7C)

</div>

<h4 align="center"> 
	🚧 🚀 Em construção... 🚧
</h4>

# Deploy

# Getting Started
Abra o terminal na pasta com o projeto e execute os comandos para instalação e execução do servidor:
- npm i
- npm start

# Overview
Bem-vindo! Este projeto backend foi desenvolvido como parte do programa Explorer da Rocketseat. Abaixo está uma visão geral do que foi implementado.

## Sobre o Projeto
O Desafio Final visa criar um sistema robusto e funcional para gerenciar um restaurante, com destaque para as operações de CRUD (Criar, Ler, Atualizar, Apagar) relacionadas aos pratos oferecidos. O backend é responsável por fornecer uma API eficiente, segura e bem documentada.

## Tecnologias Utilizadas
- **Node.js e Express:** O backend foi construído utilizando Node.js como runtime e o framework Express para criar a API de forma rápida e eficiente.
- **SQLite:** Para o armazenamento de dados, foi utilizado o SQLite, um banco de dados SQL, o qual fica no mesmo local da execução do servidor.
- **JWT (JSON Web Tokens):** Foi implementada autenticação baseada em JWT para garantir a segurança das operações, distinguindo usuários comuns de administradores.
- **Validações e Middlewares:** Utilizamos middlewares para validar entradas e saídas de dados, assegurando a integridade das informações manipuladas pela aplicação.

## Funcionalidades Implementadas
- **API de Pratos:** Desenvolvi uma API completa para realizar operações CRUD em pratos do restaurante.
- **Autenticação:** Implementação de autenticação JWT, permitindo o acesso seguro a funcionalidades específicas para administradores e usuários autenticados.
- **Banco de Dados:** Utilizamos o SQLite para armazenar dados do administrador, restaurante e usuários.
- **Funcionalidades de Busca:** Implementação de funcionalidades de busca por nome e ingredientes para facilitar a pesquisa de pratos.
- **Documentação Detalhada:** O README do projeto contém informações completas sobre a execução do projeto, incluindo instruções de configuração e link para deploy.

## Estrutura do Projeto
O código está organizado de forma modular, seguindo as boas práticas de desenvolvimento. Os endpoints da API estão divididos de maneira lógica, facilitando a manutenção e escalabilidade do sistema.

## Features
### Rota de Usuário
- [x]  Controller para o usuário;
- [x]  Método de criação de um usuário;
    - [x]  Senha Criptografada usando com o Bcrypt;
### Rota de Sessão
- [x]  Controller para a sua sessão do usuário;
- [x]  Método para a criação de uma sessão:
    - [x]  Validar se usuário já existe e comparar as senhas;
    - [x]  Cria o token da sessão;
### Rota de Prato
- [x]  Controller para os seus pratos:
- [x]  Método de criação de um prato;
    - [x]  Lógica de criação dos ingredientes;
- [x]  Método de visualização de todos os pratos;
    - [x]  Lógica de busca por título do prato;
    - [x]  Lógica de busca por ingredientes;
- [x]  Método de visualização de um prato;
- [x]  Método de edição de um prato;
- [x]  Método de exclusão de um prato;
- [x]  Controller para os pratos favoritos;
- [x]  Método para favoritar um prato se não for um usuário admin
- [x]  Método para desfavoritar um prato caso ele seja favorito.
- [x]  Método para verificar se um prato é favorito.
- [x]  Método para retornar todos os pratos favoritos do usuário.
### Rota de Pedidos (TO DO)
- [ ]  Controller para os pedidos
- [ ]  Controller para o histórico
