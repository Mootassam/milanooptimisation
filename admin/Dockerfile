FROM node:18 AS builder
WORKDIR /app

COPY package*.json ./

# Upgrade npm
RUN npm install -g npm@11

# Install dependencies ignoring peer dependency conflicts
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build:production

FROM nginx:stable
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
