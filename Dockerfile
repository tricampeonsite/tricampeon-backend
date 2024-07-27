# Usa una imagen base de Node.js
FROM node:18.14.2

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app/api

# Copia el package.json y el package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación al contenedor
COPY . .

# Expone el puerto que usará la aplicación
EXPOSE 3100

# Define el comando por defecto para ejecutar la aplicación
CMD ["npm","run","start"]