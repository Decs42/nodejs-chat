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
