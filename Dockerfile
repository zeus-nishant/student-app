# Use Node.js for building and serving the app
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy all project files
COPY . .

# Build the React app
RUN npm run build

# Install serve to host the static files
RUN npm install -g serve

# Expose port (Railway typically uses PORT environment variable)
EXPOSE 8080

# Start the server using serve
CMD ["serve", "-s", "build", "-l", "8080"]