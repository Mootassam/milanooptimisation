FROM node:14.16.0-alpine3.13
WORKDIR /app
COPY package*.json /app/
COPY . /app/
RUN npm install
#RUN npm ci --only=production
#RUN  npm install --production --silent && mv node_modules ../
# ENV BACKEND_URL="http://199.192.21.96:8082/api"
ENV BACKEND_URL="http://199.192.21.96:8085/api/"
# ENV BACKEND_URL="http://199.192.21.96:8082/api"
EXPOSE 8085
CMD ["npm", "start"]
