# Stage 1: Build the Next.js application
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) first to leverage Docker cache
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Prepare the production image
FROM node:18-alpine
RUN apk add --no-cache rsync
# Set the working directory
WORKDIR /app

# Copy the built files from the builder stage to a temporary directory
COPY --from=builder /app/.next /tmp/.next
COPY --from=builder /app/node_modules /tmp/node_modules
COPY --from=builder /app/package.json /tmp/package.json
COPY --from=builder /app/public /tmp/public

# Copy the entrypoint script to the container
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose the port that Next.js listens on
EXPOSE 3030

# Set the entrypoint script to handle the atomic copy of files to the shared volume and start the Next.js server
CMD ["/entrypoint.sh"]