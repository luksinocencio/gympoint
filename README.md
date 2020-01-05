# Gympoint

<p>Bem vindo ao projeto final da turma 09 da rocketseat, onde a ideia é criar um sistemas capaz de gerir atividades dentro de uma academia.</p>

<p>Para iniciarmos os testes é necessário  ter um ambiente com</p>

<ul>
  <li><a href="https://nodejs.org/en/" target="_blank">NodeJS</a></li>
  <li><a href="https://yarnpkg.com/lang/en/" target="_blank">Yarn</a></li>
  <li><a href="https://www.docker.com/" target="_blank">Docker</a></li>
  <li><a href="https://pt-br.reactjs.org/" target="_blank">ReactJS</a></li>
  <li><a href="https://facebook.github.io/react-native/" target="_blank">React Native</a></li>
</ul>

<p>Após ambiente configurando, existem alguns comandos necessários para baixar e criar imagens de bancos e serviços utilizados nesse projeto. Rode o seguinte comando:</p>

- Baixar a imagem docker para o banco postgres que é utilizado nesse projeto.

  <pre>
  docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
  </pre>

  - _Obeservação: a senha do banco é docker e usuário é postgres._
  - _É necessário criar um banco com o nome de gympoint_
  - _Para manipulação usando uma interface grafica recomendo o uso da ferramenta "Postbird" <a>https://electronjs.org/apps/postbird</a>_

- Baixar a imagem docker para o serviço de controle de fila dentro do projeto:

  <pre>
     docker run --name redisgympoint -p 6379:6379 -d -t redis:alpine
  </pre>

- Baixar a imagem para o serviço se notificações, para isso usamos um banco não relacional, pois precisamos de performance.

  <pre>
    docker run --name mongoDB -p 27017:27017 -d -t mongo
  </pre>

  <p>Após configurar tudo do docker é necessário rodar os seguintes comandos para ter um usuário base e as migrations dentro do banco</p>

  <pre>
    yarn sequelize db:migrate
  </pre>

  <p>Para criar usuário admin e planos base, execute o seguinte comando:</p>

  <pre>
    yarn sequelize-cli db:seed:all
  </pre>

  <p>Com ambientes configurados é necessário instalar dependencias dos projetos:</p>

- Dentro do projeto gympoint_backend rode o seguinte comando para instalar e iniciar o projeto:

  <pre>yarn && yarn dev</pre>

  <p>Para o serviço de e-mail funcionar é necessário rodar também em um outra aba do terminal no projeto do backend.</p>

  <pre>yarn queue</pre>

- _Obeservação: so irá funcionar 100% depois de todos os passos com o docker estiverem funcionando perfeitamente._

- Dentro do projeto gympoint_web rode o seguinte comando para instalar e iniciar o projeto:

    <pre>yarn && yarn start</pre>

  - _Obeservação: é recomenado ter instalado globalmente o eslint_

  - Dentro do projeto gympoint_mobile rode o seguinte comando para instalar e iniciar o projeto:
    <p>Compudores com sistemas operacional macOS, será possivel roda nas duas plataformas, caso nao seja, so consiguirá rodar no android</p>
    <pre>yarn && npx react-native run-ios</pre>
    <pre>yarn && npx react-native run-android</pre>

  <p>Segue em anexo um arquivo .json para ser importado no Postman com as requisiçoes testes para API.</p>
# gympoint
