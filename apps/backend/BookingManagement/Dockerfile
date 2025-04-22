# Use official Node.js LTS image
FROM node:20

# Set working directory
WORKDIR /app

# Copy dependency definitions
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Expose the service port
EXPOSE 3000

# Start the app
CMD ["node", "app.js"]