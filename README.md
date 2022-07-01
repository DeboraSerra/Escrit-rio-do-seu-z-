# Projeto Bônus 'Escritório do seu zé'

Esse projeto foi desenvolvido como projeto bônus no módulo de Backend no curso de Desenvolvimento Web da Trybe. O objetivo do projeto foi colocar em prática os conhecimentos adquiridos até agora usando Node.js para criação de uma API, mocha e chai pra realizar os testes do backend, React para consumir a API e RTL e Jest para realização dos testes do frontend.

## Preview do projeto

![Preview do funcionamento da aplicação](https://github.com/DeboraSerra/Escritorio-do-seu-ze/blob/main/escritorio-do-seu-ze.gif)

## Sumário
- [Projeto Bônus 'Escritório do seu zé'](#projeto-bônus-escritório-do-seu-zé)
  - [Preview do projeto](#preview-do-projeto)
  - [Sumário](#sumário)
  - [Desenvolvimento](#desenvolvimento)
  - [Instalação do projeto localmente](#instalação-do-projeto-localmente)
    - [Opção 1. Visualizar o funcionamento da aplicação sem risco de alterações indesejadas (obs: é necessário ter o docker e o docker compose instaldo no computador):](#opção-1-visualizar-o-funcionamento-da-aplicação-sem-risco-de-alterações-indesejadas-obs-é-necessário-ter-o-docker-e-o-docker-compose-instaldo-no-computador)
    - [Opção 2. Abrir cada uma das partes separadas e rodar a aplicação (obs: para essa opção é necessário ter o Node.js instalado no computador):](#opção-2-abrir-cada-uma-das-partes-separadas-e-rodar-a-aplicação-obs-para-essa-opção-é-necessário-ter-o-nodejs-instalado-no-computador)
  - [Explicando as rotas](#explicando-as-rotas)
    - [Backend](#backend)
      - [GET /user/login](#get-userlogin)
      - [POST /user/register](#post-userregister)
      - [GET /people](#get-people)
      - [GET /people/search](#get-peoplesearch)
      - [GET /people/:id](#get-peopleid)
      - [POST /people](#post-people)
      - [PUT /people/:id](#put-peopleid)
      - [DELETE /people/:id](#delete-peopleid)
    - [Frontend](#frontend)
      - [http://localhost:3000](#httplocalhost3000)
      - [http://localhost:3000/register](#httplocalhost3000register)
      - [http://localhost:3000/dashboard](#httplocalhost3000dashboard)
      - [http://localhost:3000/:id](#httplocalhost3000id)
      - [http://localhost:3000/add-person](#httplocalhost3000add-person)
      - [http://localhost:3000/:id/update](#httplocalhost3000idupdate)
  - [Link para meu portfolio](#link-para-meu-portfolio)

## Desenvolvimento

Este projeto foi desenvolvido utilizando Node.js para criar a API e React-js para consumi-la.

Através dessa aplicação é possível realizar as operações do CRUD (Criar, Ler, Atualizar e Deletar) em um 'banco de dados' fictício, sendo necessário fazer um 'login' para receber uma 'chave de autenticação'.

[Voltar ao topo](#sumário)

## Instalação do projeto localmente

Passo 1. Abra o terminal e crie um diretório no local de sua preferência e entre nesse diretório:
```
mkdir projeto-escritorio-do-seu-ze && cd projeto-escritorio-do-seu-ze
```
Passo 2. Clone o projeto:
```
git clone git@github.com:DeboraSerra/Escritorio-do-seu-ze.git
```
Passo 3. Entre no repositório:
```
cd Escritorio-do-seu-ze
```

A partir desse ponto existem duas opções:
### Opção 1. Visualizar o funcionamento da aplicação sem risco de alterações indesejadas (obs: é necessário ter o docker e o docker compose instaldo no computador):
Passo 4. Inicie os containers da aplicação:
```
docker-compose up -d
```
Passo 5. Abra o navegador com o link:
```
https://localhost:3000
```

Pronto! A aplicação já está rodando!

### Opção 2. Abrir cada uma das partes separadas e rodar a aplicação (obs: para essa opção é necessário ter o Node.js instalado no computador):
Passo 4. Instale as dependências no diretório principal:
```
npm install
```

Passo 5. Instale as dependências do backend:
```
cd backend
npm install
```
Passo 6. Inicie o backend:
```
npm run dev
```
Passo 7. Instale as dependências do frontend:
```
cd ../frontend
npm install
```
Passo 8. Inicie o frontend:
```
npm start
```
Aguarde o navegador carregar e curta!

Para instalação do Docker, acesse esse [link](https://docs.docker.com/get-docker/).
Para instalaçao do Docker-compose, acesse esse [link](https://docs.docker.com/compose/install/).
Para instalação do Node.js acesse esse [link](https://nodejs.org/en/download/).
<br/>
<br/>
[Voltar ao topo](#sumário)

## Explicando as rotas
### Backend
#### GET /user/login
```
http://localhost:3005/user/login?email=teste@email.com&password=teste12!
```
Essa rota é utilizada para a realização do 'login' da pessoa usuária. Ela recebe os dados de login através do query no login e retorna um token para autenticação das outras rotas.
<br/>
[Voltar ao topo](#sumário)

#### POST /user/register
```
http://localhost:3005/user/register
```
Essa rota é utilizada para realizar o 'cadastro' da pessoa usuária caso ela não esteja cadastrada ainda.
Ela espera no corpo da requisição um JSON com o seguinte formato:
```
{
  "email": "teste@email.com",
  "password": "teste12!"
  "name": "teste"
}
```
Caso os dados sejam válidos, retorna uma mensagem de sucesso.
<br/>
[Voltar ao topo](#sumário)

#### GET /people
```
http://localhost:3005/people
```
Essa rota espera receber um token de autenticação no header da requisição e é utilizada para retornar todas as pessoas 'cadastradas'. O retorno dessa requisição é um array de objetos:
```
[
  {
    "id": "be9cfac4-4d72-386a-8912-eed311837403",
    "first_name": "Gian",
    "last_name": "Barreto",
    "birthday": "11-05-2009",
    "city": "Rafael do Leste",
    "email": "anderson71@espinoza.com",
    "phone": "+1390193082165",
    "state": "Rondônia",
    "address": "Avenida Elias de Aguiar, 6311. Bloco B"
  },
  {
    "id": "77588c19-e3bd-34e2-aa82-828d67c05aca",
    "first_name": "Santiago",
    "last_name": "Campos",
    "birthday": "14-08-2017",
    "city": "Vila Isabella do Norte",
    "email": "david.padilha@gmail.com",
    "phone": "+9219718387469",
    "state": "São Paulo",
    "address": "Travessa Maitê, 294"
  },
  {
    "id": "8460827c-91b0-3076-8eab-d71659c9d550",
    "first_name": "Jácomo",
    "last_name": "Maia",
    "birthday": "07-02-2015",
    "city": "Vicente do Leste",
    "email": "valentina71@gmail.com",
    "phone": "+2682023101489",
    "state": "Bahia",
    "address": "Travessa Neves, 58892"
  }
]
```
[Voltar ao topo](#sumário)

#### GET /people/search
```
http://localhost:3005/people/search?q=di
```
Essa rota é utilizada para fazer pesquisa baseada no nome da passoa 'cadastrada'. Ela espera receber uma string no parâmetro q da requisição e retorna um array com as pessoas correspondentes à pesquisa.
<br/>
[Voltar ao topo](#sumário)

#### GET /people/:id
```
http://localhost:3005/people/77588c19-e3bd-34e2-aa82-828d67c05aca
```
Essa requisição retorna os dados da pessoa correspondente ao id no parâmetro de rota.
<br/>
[Voltar ao topo](#sumário)

#### POST /people
```
http://localhost:3005/people
```
Essa rota é utilizada para adicionar uma pessoa ao 'banco de dados'. Ela espera receber um json no seguinte formato:
```
{
  "first_name": "Jácomo",
  "last_name": "Maia",
  "birthday": "07-02-2015",
  "city": "Vicente do Leste",
  "email": "valentina71@gmail.com",
  "phone": "+2682023101489",
  "state": "Bahia",
  "address": "Travessa Neves, 58892"
}
```
Sendo que apenas os campos `first_name`, `last_name`, `email` e `birthday` são obrigatórios.
<br/>
[Voltar ao topo](#sumário)

#### PUT /people/:id
```
http://localhost:3005/people/77588c19-e3bd-34e2-aa82-828d67c05aca
```
Essa rota é utilizada para atualizar os dados de uma pessoa no 'banco de dados' e espera receber o id referente a uma pessoa pelo parâmetro de rota e um json no seguinte formato no corpo da requisição:
```
{
  "first_name": "Jácomo",
  "last_name": "Maia",
  "birthday": "07-02-2015",
  "city": "Vicente do Leste",
  "email": "valentina71@gmail.com",
  "phone": "+2682023101489",
  "state": "Bahia",
  "address": "Travessa Neves, 58892"
}
```
Sendo que apenas os campos `first_name`, `last_name`, `email` e `birthday` são obrigatórios.
<br/>
[Voltar ao topo](#sumário)

#### DELETE /people/:id
```
http://localhost:3005/people/77588c19-e3bd-34e2-aa82-828d67c05aca
```
Essa rota é utilizada para deletar uma pessoa do 'banco de dados'. Ela espera receber um id como parâmetro de rota.
<br/>
[Voltar ao topo](#sumário)

### Frontend
#### http://localhost:3000
Essa rota é utilizada para realização do login e consome a rota `GET /user/login` do backend. Caso a pessoa usuária esteja registrada e o email e senha estejam de acordo com o cadastrado, ela será redirecionada para o dashboard. Caso contrário ela recebe um aviso informando que o email ou senha está errado.
<br/>
A pessoa usuaria também tem a possibiliade de clicar no botão para se registrar e ser redirecionada para a rota seguinte.
<br/>
[Voltar ao topo](#sumário)

#### http://localhost:3000/register
Essa rota é utilizada para realizar o cadastro da pessoa usuária e consome a rota `POST /user/register` do backend. O botão para registro só é habilitado caso todos os dados sejam preenchidos corretamente. Se o email já tiver sido utilizado, a pessoa usuária recebe um aviso informando. Senão, ela é redirecionada para a página de login, podendo então ser redirecionada para o dashboard.
<br/>
[Voltar ao topo](#sumário)

#### http://localhost:3000/dashboard
Essa rota é a página principal de acesso da pessoa usuária. A partir desse ponto todas as requisições ao backend utilizam o token de autorização recebido no momento do login.
<br/>
Ao clicar no primeiro botão, a aplicação realiza uma requisição à rota `GET /people` do backend e os cards das pessoas são mostrados na tela junto com um campo de texto onde a pessoa usuária pode realizar um filtro dos cards mostrados.
<br/>
Ao clicar em um dos cards a pessoa usuária é redirecionada para essa [rota](#httplocalhost3000id).
<br/>
A pessoa usuária pode também clicar no botão para adicionar uma nova pessoa e é então redirecionada para essa [rota](#httplocalhost3000add-person).
<br/>
[Voltar ao topo](#sumário)

#### http://localhost:3000/:id
A aplicação consome a rota `GET /people/:id` e renderiza na tela todos os dados disponíveis da pessoa selecionada.
<br/>
A pessoa usuária pode clicar no botão para atualizar os dados da pessoa selecionada e ser redirecionada para essa [rota](#httplocalhost3000idupdate).
<br/>
Ou clicar no botão para deletar a pessoa selecionada, então a aplicação consome a rota `DELETE /pople/:id` e a pessoa usuária é redirecionada novamente para o dashboard.
<br/>
[Voltar ao topo](#sumário)

#### http://localhost:3000/add-person
Essa rota da aplicação possui campos de texto para serem preenchidos com os dados da pessoa a ser adiciona, sendo que apenas os campos `First name`, `Last name`, `E-mail` e `Birthday` são obrigatórios para habilitar o botão. Quando o botão é clicado, a aplicação consome a rota `POST /people` do backend e a pessoa usuária é redicionada de volta para o dashboard.
<br/>
[Voltar ao topo](#sumário)

#### http://localhost:3000/:id/update
Essa rota da aplicação possui campos de texto para serem preenchidos com os dados da pessoa a serem atualizados, sendo que apenas os campos `First name`, `Last name`, `E-mail` e `Birthday` são obrigatórios para habilitar o botão. Quando o botão é clicado, a aplicação consome a rota `PUT /people/:id` do backend e a pessoa usuária é redicionada de volta para o dashboard.
<br/>
[Voltar ao topo](#sumário)

<hr/>
Este projeto encontra-se em desenvolvimento e todas as sugestões são bem vindas! Caso possua alguma, direcione-as para o meu email debora.r.serra@gmail.com
<hr/>

## Link para meu portfolio
Confira outro projetos que já desenvolvi em:
<br/>
https://deboraserra.github.io/portfolio/
<br/>
[Voltar ao topo](#sumário)
