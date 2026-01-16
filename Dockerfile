# 1. On utilise Node 18 comme demandé
FROM node:18-alpine

# 2. Dossier de travail
WORKDIR /app

# 3. On copie le package.json
COPY package.json ./

# 4. Installation des dépendances
RUN npm install

# 5. On copie tout le code source
COPY . .

# 6. Le projet scotch-io écoute sur le port 8080
EXPOSE 8080

# 7. Commande de démarrage (regarde le script "start" du package.json)
CMD ["npm", "start"]
