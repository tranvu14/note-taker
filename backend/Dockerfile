# Build stage
FROM node:20-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

# Install NestJS CLI globally
RUN npm install -g @nestjs/cli

COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# Install all dependencies including dev dependencies for development
RUN npm install

# Install NestJS CLI globally in production stage too
RUN npm install -g @nestjs/cli

COPY --from=builder /app/dist ./dist

EXPOSE 3001

CMD ["npm", "run", "start:dev"] 