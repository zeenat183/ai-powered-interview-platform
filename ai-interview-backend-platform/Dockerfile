# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy project files
COPY . .

# Build NestJS project
RUN npm run build

# Run the app
CMD ["node", "dist/main.js"]
