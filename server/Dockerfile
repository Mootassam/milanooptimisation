FROM node:18

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

ENV BACKEND_URL="http://159.198.43.161:8085/api/"

EXPOSE 8085

CMD ["npm", "start"]
