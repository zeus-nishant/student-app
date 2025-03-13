# Use Node.js for building the app
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy all project files
COPY . .

# Build the React app
RUN npm run build

# Use Nginx to serve the built frontend
FROM nginx:1.25-alpine

# Remove default Nginx static file config
RUN rm -rf /usr/share/nginx/html/*

# Copy the built frontend files from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Copy a custom Nginx configuration (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
