# Use a newer Node version (supports node:crypto)
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Set environment variable
ENV BACKEND_URL="http://66.29.133.66:8085/api/"

# Expose port
EXPOSE 8085

# Start the app
CMD ["npm", "start"]
