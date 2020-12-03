<h1 align="center">
  <img alt="FastFeet" title="FastFeet" src="https://github.com/MGustav0/fastfeet/blob/master/extras/images/logo.png" width="300px">
</h1>

![Badge](https://img.shields.io/badge/types-Flow%20%7C%20TypeScript-blue) ![Badge](https://img.shields.io/badge/node-%3E%3D%2012.18.2-brightgreen) ![Badge](https://img.shields.io/badge/ReactJS-blueviolet)

<img src="https://github.com/MGustav0/fastfeet/blob/master/extras/images/front1.png">
</br>

<img src="https://github.com/MGustav0/fastfeet/blob/master/extras/images/front2.png">
</br>

<img src="https://github.com/MGustav0/fastfeet/blob/master/extras/images/front3.png">
</br>

## :rocket: Sobre o desafio

Este projeto é um serviço de gestão de acompanhamento de encomendas de uma transportadora fictícia FastFeet.

Neste projeto está contida uma aplicação completa envolvendo backend, frontend e mobile. Tudo foi construído com as tecnlologias mais populares de JavaScript.

No backend, em **Node.js**, é uma **API REST** com o intuito de distribuir os dados para as plataformas tanto **WEB** como **MOBILE**, onde também vem integrado o **Sentry** para o monitoriamento dos erros.

No frontend, em **ReactJS**, é onde o administrador pode cadastrar os entregadores, destinatários e as encomendas, podendo assim fazer a gestão das desses mesmos.

## 🧰 Ferramentas utilizadas

- :whale: **Docker** - É um software contêiner que fornece uma camada de abstração e automação para virtualização de sistema operacional

Foi utilizado o docker para a criação do banco de dados.

  Criar e startar a base de dados **POSTGRES**:

    docker run --name fastfeet -e POSTGRES_PASSWORD=fastfeet -p 5432:5432 -d postgres

    docker start fastfeet

  Criar e startar a base de dados **REDIS**:

    docker run --name redisfastfeet -p 6379:6379 -d -t redis:alpine

    docker start redisfastfeet

- ⚛️ **ReactJs** - Biblioteca Javascript para criar interfaces de usuário.
- 💅 **Styled Components** - Biblioteca Javascript pra estilizar componentes.
- 🔁 **Redux** - Biblioteca JavaScript de código aberto para gerenciar o estado do aplicativo.
- 🔂 **Redux Saga** - Biblioteca Javascript que torna os efeitos colaterais do aplicativo mais faceis de gerenciar.
- 📛 **Sentry** - Plataforma para monitoramento de erros e notificação em tempo real.

## :package: Começando

 ``git clone https://github.com/ricardobron/FastFeet.git``

 ``cd fasfeet``

## :package: Backend

1. ``cd backend``
2. ``yarn``
3. ``Criar o arquivo .env com base no .env.example``
4. ``yarn sequelize db:migrate``
5. ``yarn sequelize db:seed:all`` 
6. ``yarn dev``

Existe um usuário administrador padrão gerado através do seed: admin@fastfeet.com / 123456

## 💻 Frontend

1. ``cd frontend``
2. ``yarn``
3. ``yarn start``
