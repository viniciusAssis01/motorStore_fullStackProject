# Motor Store

proporcionar aos potenciais compradores uma plataforma conveniente e eficiente para encontrar, pesquisar e comprar veículo

## Requisitos

- Node.js (versão 18.15.0)
- Um JSON do espaço de trabalho Insomnia exportado (v4)

## Stack utilizada

**Back-end:**

- Node
- Express
- bcryptjs
- dotenv
- express-async-errors
- jsonwebtoken
- pg
- typeorm
- zod
- typescript
- ts-node-dev

a URL base da aplicação: http://localhost:3000

# Requisitos para instalação

### Instalando Dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

```shell
npm
```

### Variáveis de Ambiente

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:

```
cp .env.example .env
```

Configure suas variáveis de ambiente com suas credenciais do Postgres e uma nova database da sua escolha.

### Migrations

Execute as migrations com o comando:

```
npm run typeorm migration:run -- -d ./src/data-source.ts
```

## Diagrama ER

Diagrama ER da API definindo bem as relações entre as tabelas do banco de dados.

![DER](1_DER m6 projeto final.jpg)

# Endpoints:

| Método | Endpoint                       | Responsabilidade                         | Autenticação                                           |
| ------ | ------------------------------ | ---------------------------------------- | ------------------------------------------------------ |
| POST   | /users                         | Criação de usuário                       | Qualquer usuário, não necessita token                  |
| PATCH  | /users/:userId/profile         | Atualiza um usuário (perfil)             | Apenas dono da conta, necessita de token               |
| PATCH  | /users/:userId/address         | Atualiza um usuário (endereço)           | Apenas dono da conta, necessita de token               |
| DELETE | /users/:userId                 | Deleta um usuário                        | Apenas dono da conta, necessita de token               |
| GET    | /users/:userId                 | Lista um usuario especifico              | Qualquer usuário, não necessita token                  |
| POST   | /login                         | Gera o token de autenticação             | Qualquer usuário, não necessita token                  |
| GET    | /profile                       | Lista usuario autenticado                | necessita de token                                     |
| POST   | /announcements                 | Criação de anuncio                       | Apenas usuarios do tipo anunciante, necessita de token |
| GET    | /announcements                 | Lista todos anuncios                     | qualquer usuario, não necessita token                  |
| GET    | /announcements/:announcementId | Lista um anuncio especifico              | qualquer usuario, não necessita token                  |
| GET    | /announcements/user/:userId    | Lista todos anuncios de um usuario       | qualquer usuario, não necessita token                  |
| PUT    | /announcements/:announcementId | Atualiza um anuncio                      | Apenas dono do anuncio, necessita de token             |
| POST   | /comments/:announcementId      | Criação de um comentario                 | Qualquer usuário, necessita token                      |
| GET    | /comments/:announcementId      | Lista todos os comentarios de um anuncio | Qualquer usuário, necessita token                      |
| PATCH  | /comments/:commentId           | Atualiza um comentario                   | Apenas autor do comentario, necessita de token         |
| DELETE | /comments/:commentId           | Deleta um comentario                     | Apenas autor do comentario, necessita de token         |

# Documentação da API

### 1. **Users**

#### `/users`

Deve ser possível criar um usuário com o perfil de anunciante ou comprador;

As rotas de edição de deleção de usuário devem ser protegidas;

Apenas o usuário dono da conta pode editar ou excluir ele mesmo;

O endereço deve ser vinculado ao usuário na rota de registro de usuário.

### 1.1. Criação de Usuário

#### Exemplo de Request:

```
POST /users
Host: http://suaapi.com/v1
Authorization: nenhum
Content-type: application/json
```

#### Corpo da Requisição:

```json
{
	"name": "vinicius",
	"email": "vinicius@kenzie.com",
	"cpf": "11111111111",
	"cellphone": "4002-8922",
	"dateBirth": "01/01/1998",
	"description": "so vendo",
	"accountType": "anunciante",
	"password": "1234",
	"address": {
		"zipCode": 11111111,
		"state": "São Paulo",
		"city": "São Paulo",
		"street": "rua 1",
		"number": 1111,
		"complement": "casa 1"
	}
}
```

#### Exemplo de Response:

```
201 Created
```

```json
{
	"id": "57fc1e77-0ec5-419f-9274-491d762d3d2e",
	"name": "vinicius",
	"email": "vinicius@kenzie.com",
	"cpf": "11111111111",
	"cellphone": "4002-8922",
	"dateBirth": "01/01/1998",
	"description": "so vendo",
	"accountType": "anunciante",
	"address": {
		"id": "a640a20c-8d1d-4387-9fc5-8f7f9ab3a513",
		"zipCode": 11111111,
		"state": "São Paulo",
		"city": "São Paulo",
		"street": "rua 1",
		"number": 1111,
		"complement": "casa 1"
	}
}
```

#### Possíveis Erros:

| Código do Erro | Descrição                 |
| -------------- | ------------------------- |
| 409 Conflict   | Email already registered. |
| 409 Conflict   | Cpf already registered.   |

### 1.2. Atualização pefil de Usuário

#### Exemplo de Request:

```
PATCH /users/:userId/profile
Host: http://suaapi.com/v1
Authorization: dono da conta a ser atualizada
Content-type: application/json
```

#### Corpo da Requisição:

```json
{
	"description": "quero ganhar um playstation"
}
```

#### Exemplo de Response:

```
200 OK
```

```json
{
	"id": "b522fb51-2fc6-4dfa-b157-ea724aa3816b",
	"name": "vinicius",
	"email": "vinicius@kenzie.com",
	"cpf": "11111111111",
	"cellphone": "4002-8922",
	"dateBirth": "1998-01-01",
	"description": "quero ganhar um playstation",
	"accountType": "comprador"
}
```

### 1.2.1. Atualizando Endereço de Usuário

#### Exemplo de Request:

```
PATCH /users/:userId/address
Host: http://suaapi.com/v1
Authorization: dono da conta a ser atualizada
Content-type: application/json
```

#### Corpo da Requisição:

```json
{
	"street": "rua sem saída"
}
```

#### Exemplo de Response:

```
200 OK
```

```json
{
	"id": "a286daf3-5116-47c9-8534-2c250365c7f5",
	"zipCode": 11111111,
	"state": "São Paulo",
	"city": "São Paulo",
	"street": "rua sem saída",
	"number": 1111,
	"complement": "casa 1"
}
```

### 1.3. Deletar Usuários

#### Exemplo de Request:

```
DELETE /users/:userId
Host: http://suaapi.com/v1
Authorization: dono da conta a ser atualizada
Content-type: application/json
```

#### Corpo da Requisição:

```json
Vazio
```

#### Exemplo de Response:

```
204 OK
```

```json
Vazio
```

### 1.4 Lista usuario especifico

#### Exemplo de Request:

```
GET /users/:userId
Host: http://suaapi.com/v1
Authorization: dono da conta a ser atualizada
Content-type: application/json
```

#### Corpo da Requisição:

```json
{}
```

#### Exemplo de Response:

```
200 OK
```

```json
{
	"id": "a8d1db3c-08e6-4b3b-8221-1110f44be1aa",
	"name": "ze",
	"email": "ze@kenzie.com",
	"cpf": "44444444444",
	"cellphone": "4002-8922",
	"dateBirth": "1998-01-01",
	"description": "só vendo",
	"accountType": "anunciante",
	"address": {
		"id": "11f618cd-f0fe-46e6-824f-962444587392",
		"zipCode": 44444444,
		"state": "São Paulo",
		"city": "São Paulo",
		"street": "rua 4",
		"number": 4444,
		"complement": "casa 4"
	},
	"anouncements": [
		{
			"id": "fc9e3bc0-a793-4c56-b088-9503ee2e573c",
			"brand": "tesla",
			"model": "model X",
			"year": 2018,
			"fuel": "eletrico",
			"coverImage": "https://cdn.motor1.com/images/mgl/Zp9qr/s1/tesla-roadster.webp",
			"mileage": 5000,
			"color": "red",
			"fipeTablePrice": "R$450.000,00",
			"price": 500000,
			"description": "novo",
			"images": [
				{
					"id": "8a34c926-df33-42f8-b74f-6f07f85c8829",
					"image_url": "https://i0.wp.com/naccar.com.br/wp-content/uploads/2017/11/Tesla9.jpg?resize=750%2C422"
				},
				{
					"id": "950cdf1c-e554-4204-8109-c7cfc879dcf2",
					"image_url": "https://www.infomoney.com.br/roadsterfrontprofile/?1510916241853"
				}
			]
		}
	]
}
```

### 2. **Login**

#### `/login`

#### Exemplo de Request:

```
POST /login
Host: http://suaapi.com/v1
Authorization: nenhum
Content-type: application/json
```

#### Corpo da Requisição:

```json
{
	"email": "vinicius@kenzie.com",
	"password": "1234"
}
```

#### Exemplo de Response:

```
200 OK
```

```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidmluaWNpdXMiLCJlbWFpbCI6InZpbmljaXVzQGtlbnppZS5jb20iLCJhY2NvdW50VHlwZSI6ImNvbXByYWRvciIsImlhdCI6MTY5NjY5NzU2NywiZXhwIjoxNjk3NTYxNTY3LCJzdWIiOiI1N2ZjMWU3Ny0wZWM1LTQxOWYtOTI3NC00OTFkNzYyZDNkMmUifQ.JFn8zjIF8ASsSZzrPF-SyXwzfNd7P8sNKATmD7l4V18"
}
```

### 3. **Profile**

#### `/profile`

retorna usuario autenticado

#### Exemplo de Request:

```
GET /profile
Host: http://suaapi.com/v1
Authorization: nenhum
Content-type: application/json
```

#### Corpo da Requisição:

```json
{}
```

#### Exemplo de Response:

```
200 OK
```

```json
{
	"id": "ab1fba76-c82a-4a83-a7c3-099a21784949",
	"name": "vinicius",
	"email": "vinicius@kenzie.com",
	"cpf": "11111111111",
	"cellphone": "4002-8922",
	"dateBirth": "1998-01-01",
	"description": "testando ",
	"accountType": "comprador",
	"address": {
		"id": "481bd712-bc67-4fe9-9d5e-5ac2cd7d4564",
		"zipCode": 11111111,
		"state": "São Paulo",
		"city": "São Paulo",
		"street": "rua teste",
		"number": 1111,
		"complement": "casa 1"
	}
}
```

### 3. **Announcement**

#### `/announcements`

Todas as rotas devem ser protegidas, com exceção dos endpoints de GET;

Apenas usuários com o perfil de anunciante podem criar um anúncio;

Apenas o usuário dono do anúncio pode editar ou excluir o mesmo;

As imagens devem ser vinculadas ao anúncio na rota de registro de um anúncio.

### 3.1. Criação de Anuncio

#### Exemplo de Request:

```
POST /announcements
Host: http://suaapi.com/v1
Authorization: precisa estar autenticado; precisa ser usuario do tipo "anunciante"
Content-type: application/json
```

#### Corpo da Requisição:

```json
{
	{
	"brand": "mercedez Bens",
	"model": "GLA",
	"year": 2010,
	"fuel": "gasolina",
	"mileage": 5000,
	"color": "red",
	"fipeTablePrice": "R$150.000,00",
	"price": 200000,
	"description": "seminovo",
	"coverImage": "1",
	"images": [
		{
			"image_url": "url da imagem 2"
		},
		{
			"image_url": "url da imagem 3"
		}
	]
}
}
```

#### Exemplo de Response:

```
201 OK
```

```json
{
	"id": "be058c32-8f7a-4f61-ba57-8e371520074b",
	"brand": "audi Bens",
	"model": "GLA",
	"year": 2010,
	"fuel": "gasolina",
	"coverImage": "1",
	"mileage": 5000,
	"color": "red",
	"fipeTablePrice": "R$150.000,00",
	"price": 200000,
	"description": "seminovo",
	"images": [
		{
			"id": "a3a8705d-0497-4871-8b15-3dbc3382460c",
			"image_url": "url da imagem 3"
		},
		{
			"id": "fe658754-a243-4eac-96a7-e8e9dd51b302",
			"image_url": "url da imagem 2"
		}
	]
}
```

#### Possíveis Erros:

| Código do Erro | Descrição                                 |
| -------------- | ----------------------------------------- |
| 403 Forbidden  | Somente anunciantes podem criar anúncios. |

### 3.2. Listando Anuncios

#### Exemplo de Request:

```
GET /announcements
Host: http://suaapi.com/v1
Authorization: nenhum
Content-type: application/json
```

#### Corpo da Requisição:

```json
Vazio
```

#### Exemplo de Response:

```
200 OK
```

```json
[
	{
		"id": "2394c22b-f7dc-40a9-bc4e-662fe3f26f54",
		"brand": "tesla",
		"model": "model X",
		"year": 2018,
		"fuel": "eletrico",
		"coverImage": "https://cdn.motor1.com/images/mgl/Zp9qr/s1/tesla-roadster.webp",
		"mileage": 5000,
		"color": "red",
		"fipeTablePrice": "R$450.000,00",
		"price": 500000,
		"description": "novo",
		"images": [
			{
				"id": "68740833-4628-4bad-a00d-0ac38f3c5f54",
				"image_url": "https://i0.wp.com/naccar.com.br/wp-content/uploads/2017/11/Tesla9.jpg?resize=750%2C422"
			},
			{
				"id": "7397a0de-8822-4ea7-9fbb-14aab8880aa6",
				"image_url": "https://www.infomoney.com.br/roadsterfrontprofile/?1510916241853"
			}
		],
		"user": {
			"name": "ze",
			"cellphone": "4002-8922",
			"id": "712a508b-aea7-41cb-a3d2-2d1a6ea3f0dd",
			"description": "só vendo",
			"color": "#7D2A4D"
		}
	}
]
```

### 3.2.1. Listando um Anuncio

#### Exemplo de Request:

```
GET /announcements/:announcementId
Host: http://suaapi.com/v1
Authorization: nenhum
Content-type: application/json
```

#### Corpo da Requisição:

```json
Vazio
```

#### Exemplo de Response:

```
200 OK
```

```json
{
	"id": "fc9e3bc0-a793-4c56-b088-9503ee2e573c",
	"brand": "tesla",
	"model": "model X",
	"year": 2018,
	"fuel": "eletrico",
	"coverImage": "https://cdn.motor1.com/images/mgl/Zp9qr/s1/tesla-roadster.webp",
	"mileage": 5000,
	"color": "red",
	"fipeTablePrice": "R$450.000,00",
	"price": 500000,
	"description": "novo",
	"images": [
		{
			"id": "8a34c926-df33-42f8-b74f-6f07f85c8829",
			"image_url": "https://i0.wp.com/naccar.com.br/wp-content/uploads/2017/11/Tesla9.jpg?resize=750%2C422"
		},
		{
			"id": "950cdf1c-e554-4204-8109-c7cfc879dcf2",
			"image_url": "https://www.infomoney.com.br/roadsterfrontprofile/?1510916241853"
		}
	],
	"user": {
		"name": "ze",
		"cellphone": "4002-8922",
		"id": "a8d1db3c-08e6-4b3b-8221-1110f44be1aa"
	}
}
```

### 3.2.2 Listando Anuncios de um usuario

#### Exemplo de Request:

```
GET /announcements/user/:userId
Host: http://suaapi.com/v1
Authorization: nenhum
Content-type: application/json
```

#### Corpo da Requisição:

```json
Vazio
```

#### Exemplo de Response:

```
200 OK
```

```json
{
	"id": "712a508b-aea7-41cb-a3d2-2d1a6ea3f0dd",
	"name": "ze",
	"email": "ze@kenzie.com",
	"cpf": "44444444444",
	"cellphone": "4002-8922",
	"dateBirth": "1998-01-01",
	"description": "só vendo",
	"accountType": "anunciante",
	"color": "#7D2A4D",
	"address": {
		"id": "ebfd4604-1bb9-41b6-bbc3-b09be4bf44ef",
		"zipCode": "44444444",
		"state": "São Paulo",
		"city": "São Paulo",
		"street": "rua 4",
		"number": "4444",
		"complement": "casa 4"
	},
	"anouncements": [
		{
			"id": "2394c22b-f7dc-40a9-bc4e-662fe3f26f54",
			"brand": "tesla",
			"model": "model X",
			"year": 2018,
			"fuel": "eletrico",
			"coverImage": "https://cdn.motor1.com/images/mgl/Zp9qr/s1/tesla-roadster.webp",
			"mileage": 5000,
			"color": "red",
			"fipeTablePrice": "R$450.000,00",
			"price": 500000,
			"description": "novo",
			"images": [
				{
					"id": "68740833-4628-4bad-a00d-0ac38f3c5f54",
					"image_url": "https://i0.wp.com/naccar.com.br/wp-content/uploads/2017/11/Tesla9.jpg?resize=750%2C422"
				},
				{
					"id": "7397a0de-8822-4ea7-9fbb-14aab8880aa6",
					"image_url": "https://www.infomoney.com.br/roadsterfrontprofile/?1510916241853"
				}
			]
		}
	]
}
```

### 3.3. Atualização de Anuncio

#### Exemplo de Request:

```
PUT /announcements/:announcementId
Host: http://suaapi.com/v1
Authorization: precisa estar autenticado; precisa ser o dono do anuncio
Content-type: application/json
```

#### Corpo da Requisição:

```json
{
	"brand": "tesla",
	"model": "mode X",
	"year": 2020,
	"fuel": "eletrico",
	"mileage": 0,
	"color": "grey",
	"fipeTablePrice": "R$450.000,00",
	"price": 450000,
	"description": "novo 0km em perfeito estado",
	"coverImage": "tesla",
	"images": [
		{
			"image_url": "tesla 1"
		},
		{
			"image_url": "tesla 2"
		}
	]
}
```

#### Exemplo de Response:

```
200 OK
```

```json
{
{
	"id": "be058c32-8f7a-4f61-ba57-8e371520074b",
	"brand": "tesla",
	"model": "mode X",
	"year": 2020,
	"fuel": "eletrico",
	"coverImage": "tesla",
	"mileage": 0,
	"color": "grey",
	"fipeTablePrice": "R$450.000,00",
	"price": 450000,
	"description": "novo 0km em perfeito estado",
	"images": [
		{
			"id": "da35052b-f255-4e07-b427-760f61de0abb",
			"image_url": "tesla 1"
		},
		{
			"id": "ca3e0313-3691-4d35-a953-1994c459dd73",
			"image_url": "tesla 2"
		}
	]
}
}
```

### 3.4. Deletar Anuncio

#### Exemplo de Request:

```
DELETE /announcements/:announcementId
Host: http://suaapi.com/v1
Authorization: dono da conta a ser atualizada
Content-type: application/json
```

#### Corpo da Requisição:

```json
Vazio
```

#### Exemplo de Response:

```
204 OK
```

```json
Vazio
```

### 4. **Comentarios**

#### `/comments`

Todas as rotas devem ser protegidas;

usuário com o perfil comprador pode editar ou excluir seu comentário de um anúncio;

usuário com o perfil anunciante pode editar o seu comentário, mas pode excluir qualquer comentário desde que seja dono do anúncio;

Deve ser possível visualizar o tempo que o comentário foi feito.

### 4.1. Criação de Comentario

#### Exemplo de Request:

```
POST /comments/:announcementId
Host: http://suaapi.com/v1
Authorization: precisa estar autenticado;
Content-type: application/json
```

#### Corpo da Requisição:

```json
{
	"comment": "um comentario"
}
```

#### Exemplo de Response:

```
201 OK
```

```json
{
	"id": "208b5549-361b-413b-a3ac-b2e0dff52b37",
	"comment": "um comentario"
}
```

### 4.2. Listando Comentarios de um Anuncio

#### Exemplo de Request:

```
GET /comments/:announcementId
Host: http://suaapi.com/v1
Authorization: precisa estar autenticado;
Content-type: application/json
```

#### Corpo da Requisição:

```json
Vazio
```

#### Exemplo de Response:

```
200 OK
```

```json
[
	{
		"id": "993ff2ec-2da4-4a1f-b398-3b828df873ee",
		"comment": "joaozinho comentou anouncio de vinicios",
		"createdAt": "2023-10-26",
		"user": {
			"name": "joao",
			"cellphone": "4002-8922",
			"id": "a357d9d4-b196-41b3-8e17-916ba29a8cde",
			"description": "sou um comprador",
			"color": "#7D2A4D"
		}
	},
	{
		"id": "fcab9932-73b3-426d-86f3-f3399032bd65",
		"comment": "update do comentario",
		"createdAt": "2023-10-26",
		"user": {
			"name": "vinicius",
			"cellphone": "4002-8922",
			"id": "2951b535-6903-40da-b647-193d2ce7b0c1",
			"description": "testando novamente",
			"color": "#7D2A4D"
		}
	}
]
```

### 4.3. Atualização de comentario

#### Exemplo de Request:

```
PATCH /comments/:commentId
Host: http://suaapi.com/v1
Authorization: precisa estar autenticado; precisa dono do comentario
Content-type: application/json
```

#### Corpo da Requisição:

```json
{
	"comment": "atualização de um comentario"
}
```

#### Exemplo de Response:

```
200 OK
```

```json
{
	"id": "208b5549-361b-413b-a3ac-b2e0dff52b37",
	"comment": "atualização de um comentario"
}
```

### 4.4. Deletar comentario

#### Exemplo de Request:

```
DELETE /comments/:commentId
Host: http://suaapi.com/v1
Authorization: precisa estar autenticado; precisa dono do comentario ou dono do anuncio
Content-type: application/json
```

#### Corpo da Requisição:

```json
Vazio
```

#### Exemplo de Response:

```
204 OK
```

```json
Vazio
```

## Licença

[MIT](https://choosealicense.com/licenses/mit/)

---

<p align="center"> created by Vinicius Assis  - © 2024 - Todos os direitos reservados.<p align="center">
 <a href="https://www.linkedin.com/in/viniciusAssis01/" target="_blank"><img src="https://static.licdn.com/sc/h/5bukxbhy9xsil5mb7c2wulfbx" height="25" width="25" alt="Linked" />
</p></p>

___




