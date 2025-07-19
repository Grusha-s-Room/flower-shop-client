# Etapa 1: Construcción de la aplicación Angular
FROM node:22.12.0 AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia archivos de configuración e instala dependencias
COPY package.json package-lock.json* ./
RUN npm install

# Copia el resto del código fuente
COPY . .

# Compila la aplicación Angular en modo producción
RUN npm run build -- --configuration production

# Etapa 2: Servir aplicación con Nginx
FROM nginx:alpine

# Elimina configuración por defecto de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia los archivos compilados Angular al contenedor de Nginx
COPY --from=builder /app/dist/flower-shop-client /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]