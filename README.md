# Mon Vieux Grimoire

Un site de libraire qui sert pour le référencement et la notation de livres

Application réalisée en stack MERN (MongoDB, ExpressJS, ReactJS, NodeJS)

## Installation & Lancement

ReactJS :

```bash
  cd frontend
  npm i
  npm start
```

ExpressJS :

```bash
  cd backend
  npm i
  npm start
```

Il manque le fichier ".env" dans le dossier "backend" (pour des raisons de sécurité)
Celui ci contient 2 variables :

- jsonWebToken_PRIVATE = un string qui sert de private key pour jsonWebToken
- MONGODB_URL = l'url de connection à mongoDB, au format :

mongodb+srv://"username":"password"@"cluster".mongodb.net/?retryWrites=true&w=majority

Il manque également le dossier "images" dans le dossier "backend" où sont sauvegardés les fichiers images des livres mis en ligne par les utilisateurs
