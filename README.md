# nodejs-chat

## To get up and running:

### This project use pnpm as a package manager

```
pnpm install
```

### Setup ENV file

- Setup ENV file with the following
- Create a .env file

```
  JWT_ACCESS_SECRET=
```

### Source ENV:

- For linux just add a .env file
- For Mac run:
  `set -o allexport; source .env; set +o allexport`

### spin up a mongo db container for data persitence

```
docker compose up
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



### Server and websocket capabilities

-how to use

## Server to client communication

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
## Client to server communication

- you will then be able to send a message to the chat room from the client like below:

```
{
	"action": "send_message",
	"data": "Hello im client 1"
}

```

- you will then be able to delete a message to the chat room from the client like below:


```
{
	"action": "delete_message",
	"data": "65eaf807d67834ba0974fa98"
}

```

### future concerns

- in order to scale , i would make a sole websiocket server and api on another , its always a good idea to have a dedicated websocket server.


