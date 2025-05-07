FROM node:lts-alpine AS builder

WORKDIR /ui

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:lts-alpine AS production

WORKDIR /ui

# Install a simple static file server
RUN npm install -g serve

# Copy built files from the builder stage
COPY --from=builder /ui/dist ./dist

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["serve", "-s", "dist", "-l", "3000"]
