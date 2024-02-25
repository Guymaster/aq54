# AQ54 Frontend

Application web permettant de consulter l'historique des mesures effectuées par les capteurs SMART188 et SMART199. Réalisée avec ReactJS.

## Comment exécuter ?

Cette application est censée communiquer avec d'autres services et donc il est préférable de passer [par ce repository](https://github.com/Guymaster/aq54-start) qui simplifie la configuration et le lancement.

Si toutefois, vous voulez lancer uniquement cette application, vous pouvez suivre les étapes suivantes.

Commencez par cloner ce dépot en ouvrant un terminal pour y entrer la ligne suivante :

```
git clone https://github.com/Guymaster/aq54.git
```

Ouvrez le nouveau dossier aq54 et créez-y un fichier environnement nommé `.env`. Vous devez y renseigner les variables d'environnement de la manière suivante :

```
PORT=3000
NODE_ENV=prod

# Api
REACT_APP_API_HOST=<Adresse du serveur aq54-backend>
REACT_APP_API_PORT=<Port d'écoute du serveur aq54-backend>
REACT_APP_MAPBOX_TOKEN=<Token Mapbox>

# Firebase
REACT_APP_FIREBASE_API_KEY=<Api key Firebase>
REACT_APP_FIREBASE_AUTH_DOMAIN=<Auth domain Firebase>
REACT_APP_FIREBASE_PROJECT_ID=<Project ID Firebase>
REACT_APP_FIREBASE_STORAGE_BUCKET=<Storage bucket Firebase>
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<Messaging sender Firebase>
REACT_APP_FIREBASE_APP_ID=<App ID Firebase>
REACT_APP_FIREBASE_MEASUREMENT_ID=<Measurement ID Firebase>
```

### Lancer en mode développement

Ouvrez un terminal dans le repertoire aq54 et installez les dépendances en entrant :

```
npm install
```

Ensuite, lancez avec :

```
npm start
```

Accédez à l'application via `localhost:3000`

### Lancer en mode production (avec Docker)

Ouvrez un terminal dans le repertoire aq54 et et entrez:

```
docker build -t aq54-frontend .
```

```
docker run --name aq54-frontend -p 3000:80  aq54-frontend
```

Accédez à l'application via `localhost:3000`