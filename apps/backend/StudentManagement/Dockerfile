FROM node:18-alpine

WORKDIR /app

# Replace this:
# COPY . .

# With this:
COPY package*.json ./
RUN npm install     # Let Docker build bcrypt natively here
COPY . .

ENV PORT=3001
EXPOSE 3001

CMD ["node", "app.js"]