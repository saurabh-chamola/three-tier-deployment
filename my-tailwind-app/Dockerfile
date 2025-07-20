# ------------------- Stage 1: Build Dependencies ------------------------------
FROM node:21 AS frontend-three

# Set the working directory to /app
WORKDIR /app

# Copy only package files first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# ------------------- Stage 2: Development Environment ------------------------------
FROM node:21-slim

# Set the working directory to /app
WORKDIR /app

# Copy dependencies and code from previous stage
COPY --from=frontend-three /app .

# Expose the Vite dev server port
EXPOSE 5173

# Vite requires --host to expose to outside Docker
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
