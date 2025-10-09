# 1. Base Image: Use an official Node.js runtime as a parent image.
# We use the 'alpine' variant for a smaller image size.
FROM node:18-alpine AS base

# 2. Set working directory in the container
WORKDIR /app

# 3. Copy package.json and package-lock.json (if available)
COPY package*.json ./

# 4. Install dependencies for the 'base' stage
RUN npm install

# 5. Create a new stage for building the application
FROM base AS builder
WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY . .

# 6. Build the Next.js application for production
RUN npm run build

# 7. Create a final, smaller image for production
FROM node:18-alpine AS runner
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production

# 8. Copy built assets from the 'builder' stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

# 9. Expose the port the app runs on
EXPOSE 3000

# 10. The command to run the application
CMD ["npm", "start"]
