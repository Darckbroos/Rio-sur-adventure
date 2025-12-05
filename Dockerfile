# Stage 1: Install dependencies
FROM node:18-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install 

# Stage 2: Build the application
FROM node:18-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set NEXT_TELEMETRY_DISABLED to 1 to disable telemetry during build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Stage 3: Production image
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED 1

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the standalone Next.js server output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# Copy the public and static assets
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Set the user to the non-root user
USER nextjs

EXPOSE 3000

ENV PORT 3000

# Run the Next.js server
CMD ["node", "server.js"]
