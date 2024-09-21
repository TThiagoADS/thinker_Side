--Projeto: Cadastro de produtos - Thinker Side--

Este projeto é uma API RESTful desenvolvida com Node.js e TypeScript, que permite a gestão de um sistema de cadastro de produtos.
Alem do cadastro de produtos foram implementadas cadastro de usuario e categorias e seus respectivos CRUD's e um Payload.
A aplicação utiliza o framework Express para a criação das rotas e integra o Prisma Client para a comunicação com o banco de dados.
O sistema inclui autenticação baseada em JWT para garantir a segurança das rotas protegidas.
Teste automatizados utilizando o framework jester.

--Principais funcionalidades:--

Autenticação JWT: Implementação de autenticação segura com tokens JWT, protegendo rotas sensíveis.
CRUD de Produtos: Operações de criação, leitura, atualização e exclusão de produtos no banco de dados.
CRUD de Usuario : Criação de usuarios, edição, exclusão e a geração de Token para autenticação.
CRUD de Categorias: Criação de categorias, edição, atualização e exclusão de categorias.
Funcionalidade de payload.
Prisma Client: Interações com o banco de dados de forma eficiente, utilizando o ORM Prisma.
Testes com jester: Utilizando a ferramenta foram criados testes.
Documentação com Swagger: A API é documentada e acessível via interface Swagger, permitindo testes diretos dos endpoints.

--Pré-requisitos--

Node.js v14+
Typescript v4.9+
Yarn v1.22+
GitHub e GitBash ou equivalentes

--Instalação--

Utilizando o GitHub e alguns comandos para realizar a instalação do projeto.

1 - Na paste onde deseja utilize o comando clone do GitHub 
"git clone https://github.com/TThiagoADS/thinker_Side.git "

2 - Utilize o comando cd no terminal para acessar a pasta do projeto.
"cd/thinker_Side"

3 - Importe o arquivo das configurações .env.
No terminal iremos instalar as depencias do projeto utilizando o Yarn
"yarn install"

4 - Após todas as dependencias do projeto serem devidamente instaladas iremos rodar a aplicação utilizando:
"yarn start"

Agora o projeto deve estar rodando localmente!

--Testes--

O comando "yarn test" executa um teste ao qual cria um produto completo e verifica se não houver uma imagem lançara um erro.

--End points e parametros--

Para acessar a interface do Swagger basta utilizar o "yarn start" para iniciar a Api em seguida no navegador utilizar o endereço:
"(http://localhost:3333/api-docs)".

Tambem é possivel hitar os endpoints através do Postman.

Antes de realizar o teste é necessario gerar um token utilizando o end point /v1/user com metodo post com parametros de nome, email e senha.
Após realizar o cadastro é necessario tambem receber o token utilizando o end point v1/session com metodo post passando o email e senha,
após isso é necassario colocar na parte superior esquerda no local "authorized", após isso os endpoints serão autorizados.







