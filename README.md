# nodejs-chat

# About the project

## This project consists of the following stack
- Nodejs
- MongoDB
- Docker

### This project allows users to authenticate and gain a token to connect to a websocket that acts as a chat room.
### When a user connects to the chat room they will be server a copy of the chat history
### A user will have the option to send a message and delete a message
### NodeJs test runner is used to run the test
### The application will be linted , tested and built on a push to the main branch
### Docker is used to create a container of mongDB we can use for the persistent storgae of data in the application

## Postman workspace
- https://app.getpostman.com/join-team?invite_code=863f6792ccc98a6d238766e671952755&target_code=5544a93e96c4fbde787923c6f86b44a0


# To get up and running:

### This project useses node 20 to make use of node test runner
- Please install node 20 stable

```
nvm use v20
```

### This project use pnpm as a package manager

```
pnpm install
```

### Setup ENV file

- Setup ENV file with the following
- Create a .env file

```
  JWT_ACCESS_SECRET=super-secret
  PORT=8080
```

### Source ENV:

- For linux just add a .env file
- For Mac run:
  `set -o allexport; source .env; set +o allexport`

### spin up a mongo db container for data persitence in a seperate terminal

```
docker compose up
```

### you can use this command to start the server

```
pnpm run dev
```

### some other commands you can you are:

```
pnpm run build
pnpm run lint
pnpm run start
pnpm run lint:fix
pnpm run test
```



### How to authenticate

- In order to use the websocket, you will need to authenticate
- The db will be seeded with three users on first start of the server

```
  {
    username: "Charmander",
    password: "Charmander1234!",
  },
  {
    username: "Squirtle",
    password: "Squirtle1234!",
  },
  {
    username: "Bulbasaur",
    password: "Bulbasaur1234!",
  },
```

- You can use any of the above to hit this endpoint
```
http://localhost:8080/api/auth/login

{
	"username": "Squirtle",
	"password": "Squirtle1234!"
}

```

- Once you have been authenticated , the server will return a response that contains your access token and a state of authenticated

- Once you recieve your access token , you can add it to the authorization header on the client

- You can connect to ws://localhost:8080 with your access token

- once you are authenticated , your connection will be upgraded to websocket
- access tokens are shortlived and you will need to get a new one if ythe websocket is closed



## Websocket use

-how to use

### What the server will send to the client

- when connecting to the websocket data will be sent to the client , this data contains the history of the chat room

```
{
	"type": "history",
	"data": [
		{
			"_id": "65eaf807d67834ba0974fa98",
			"sender": "65e98b6f362cbee77c1253b8",
			"message": "Hello im client 1",
			"username": "Squirtle",
			"createdAt": "2024-03-08T11:35:35.875Z",
			"updatedAt": "2024-03-08T11:35:35.875Z",
		},
	]
}

```
## What a client can send to the server

- you will then be able to send a message to the chat room from the client like below, where the action is send_message and the data is the message 

```
{
	"action": "send_message",
	"data": "Hello im client 1"
}

```

- you will then be able to delete a message to the chat room from the client like below:
, where the action is delete_message and data is the ID of the message


```
{
	"action": "delete_message",
	"data": "65eaf807d67834ba0974fa98"
}

```

### future concerns

- in order to scale , i would make a sole websiocket server and api on another , its always a good idea to have a dedicated websocket server.

