# Projeto GoBarber

**Descrição:** Projeto de desafio para Bootcamp 2019 da Rocketseat.

## Documentação do projeto

**Tecnologias utilizadas back-end**
* NodeJS
* Bibliotecas: Express, Sequelize, Sucrase, ESLint e Prettier
* Banco de Dados: PostgreSQL e MongoDB
* AJAX

**Linguagens back-end**
* Javascript
* JSON

**Tecnologias utilizadas back-end**
* ReactJS
* ReactNative

**Linguagens front-end**
* Javascript
* JSX

### Arquivos de documentação

A documentação está integrada nas pastas, de acordo com o nome de cada uma, funções, arquivos e instruções, quando necessário.

# FastFeet

Para rodar a aplicação no seu computador/servidor serão necessários os seguintes passos:

1. Clonar este repositório para seu computador.
2. No terminal, dentro da pasta, digitar: ```yarn```, para instalar as dependências da aplicação.
3. Criar o banco de dados PostgreSQL
3.1. Ter o docker instalado ou o PostgreSQL instalado na máquina.
3.2. Criar o banco de dados ```fastfeet``` no banco de dados.
4. Rodar a migration: ```yarn sequelize db:migrate```
5. Rodar o seed: ```yarn sequelize db:seed:all```
6. Iniciar aplicação: ```yarn dev```

Observações

1. Deliveryman foi substituído por Courier, pois o plural de Deliveryman é Deliverymen, o sequelize pluraliza colocando apenas um **s** ao final da palavra, por este motivo optei por nomear o Entregador como Courier.
2. A Encomenda a ser entregue é nomeada de Carrier.
