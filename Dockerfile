# Imagen a utilizar de base, incluye preinstalado Node y npm
FROM node:10-alpine

# Creo la carpeta node modules, y le otorgo acceso al usuario.
# El usuario node viene predefinido, pero no es usuario root, por cuestiones de seguridad.
# Solo le damos permisos para lo indispensable.
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
# Selecciono el espacio de trabajo
WORKDIR /home/node/app
# Copio el package.json
COPY package*.json ./
# Indico el usuario que ejecutara los siguientes comandos
USER node
# Instalo las dependencias del proyecto
RUN npm install
# Copio el proyecto
COPY --chown=node:node . .

EXPOSE 8080

CMD [ "node", "server.js" ]