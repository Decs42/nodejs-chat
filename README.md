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

### endpoints

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


