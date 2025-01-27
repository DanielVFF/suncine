<p align="center">
  <img src="../../docs/img/SunCine.png" width="500" alt="SunCine Logo" />
</p>
</br>

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-%23339933?style=for-the-badge&logo=nodedotjs&logoColor=white&labelColor=black" />
  <img src="https://img.shields.io/badge/Vitest-%236E9F18?style=for-the-badge&logo=vitest&logoColor=white&labelColor=black" />
  <img src="https://img.shields.io/badge/Fastify-%23FFFFFF?style=for-the-badge&logo=fastify&logoColor=white&labelColor=black" />
  <img src="https://img.shields.io/badge/TMDB-%23006DBF?style=for-the-badge&logo=themoviedatabase&logoColor=white&labelColor=black" />
  <img src="https://img.shields.io/badge/Docker-%232496ED?style=for-the-badge&logo=docker&logoColor=white&labelColor=black" />
</div>

---

[🔙 Volta para documentação principal](../../README.md)

Este é o backend do desafio SunCine, desenvolvido com [NestJS](https://nestjs.com/) com [Fastify](https://fastify.dev), utilizando [MongoDB](https://www.mongodb.com/) com [Mongoose](https://mongoosejs.com/), e testado com [Vitest](https://vitest.dev/).

> **Nota:** Para facilitar leitura, organizar as pastas, aproveitar validações e acima de tudo, padronizar eu escolhi migrar o paradigma do projeto e utilizar o framework NestJS. 


---

## 📋 Pré-requisitos
Antes de executar o projeto, certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/) (versão 18 ou superior).
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/).
- Gerenciador de pacotes [pnpm](https://pnpm.io/).

---

## 🚀 Como executar o projeto

### 1. Clonando o repositório
```bash
# Clone o repositório
$ git clone git@github.com:DanielVFF/suncine.git

# Navegue para o diretório do backend
$ cd projects/back
```

### 2. Configurando as variáveis de ambiente

Crie um arquivo `.env` na raiz do diretório `projects/back/` ,baseado no `.env.example`, com as seguintes configurações:

```env
TMDB_TOKEN=
PEPPER=changeToStrongPepper
JWT_TOKEN=changeToStrongJwtToken

MONGO_URL=mongodb://root:troqueASenha@127.0.0.1:27017

DEFAULT_USER_LOGIN=admin@email.com
DEFAULT_USER_PASS=Admin@123

TMDB_API_KEY=FASUYBDAIUOSBUASBOU
```

> **Nota:** Substitua `<SUA_CHAVE_DA_API_TMDB>` pela chave de acesso à API TMDB. 

### 3. Subindo os containers com Docker

Certifique-se de que o Docker está em execução e rode o seguinte comando para subir os serviços:

```bash
# Execute os serviços
$ docker-compose up -d
```
> **Nota:** É necssário executar o serviço do mongo, na pasta principal e verificar se as variaveis de conexão estão corretas 

### 4. Instalando as dependências

Abra um terminal e instale as dependências do projeto com `pnpm`:

```bash
# Instale as dependências
$ pnpm install
```

### 5. Iniciando o servidor

Com todos os serviços configurados, inicie o servidor:

```bash
# Inicie o servidor em modo de desenvolvimento
$ pnpm run start:dev

# O servidor estará disponível em: http://localhost:3000
```

---

## 🧪 Executando os testes
Para rodar os testes de integração utilizando Vitest, execute o seguinte comando:

```bash
# Execute os testes
$ pnpm run test
```

---

## 📚 Documentação
A documentação da API está disponível e foi gerada automaticamente com Swagger. Para acessá-la, basta abrir o navegador e visitar:

```url
http://localhost:3000/docs
```

---

## 🛠️ Decisões Técnicas

1. **Framework Utilizado:** Foi escolhido o NestJS devido à sua robustez e facilidade de escalabilidade.
2. **Banco de Dados:** Utilização do MongoDB, gerenciado com Mongoose, devido à sua flexibilidade e integração com o NestJS.
3. **Testes Automatizados:** Vitest foi utilizado por sua simplicidade e integração com TypeScript.
4. **Integração com TMDB:** As requisições à API TMDB foram abstraídas em um serviço dedicado para facilitar testes e manutenções futuras.

---

## 💡 Notas Finais
Caso encontre algum problema ou tenha dúvidas, fique à vontade para abrir uma issue no repositório ou entrar em contato.

---

[🔙 Volta para documentação principal](../../README.md)
