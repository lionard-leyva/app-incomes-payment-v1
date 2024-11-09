FROM node:18-alpine

WORKDIR /app

# Add necessary build tools
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application files
COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]