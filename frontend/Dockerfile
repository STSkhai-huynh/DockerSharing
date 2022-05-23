FROM node:alpine as builder

ARG APP_ENV=production
ENV APP_ENV ${APP_ENV}

COPY package.json ./
RUN npm install && mkdir -p /app && cp -R ./node_modules ./app
WORKDIR /app
COPY . /app
RUN npm run build -- --configuration=${APP_ENV}

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist/docker-frontend-angular /usr/share/nginx/html

# Copy the EntryPoint
COPY ./entryPoint.sh /
RUN chmod +x entryPoint.sh

ENTRYPOINT ["sh", "/entryPoint.sh"]
CMD ["nginx", "-g", "daemon off;"]