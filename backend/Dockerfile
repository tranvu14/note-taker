# Build stage
FROM node:20-alpine as builder

WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies (including dev dependencies for building)
RUN npm install

# Copy the rest of the files, including tsconfig.json
COPY . .

# Build TypeScript project
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy only necessary files for production
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy the built dist folder and other necessary files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# Expose the application port
EXPOSE 3001

# Use a proper start command
CMD ["node", "dist/main.js"]
