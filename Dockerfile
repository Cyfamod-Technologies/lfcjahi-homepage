# syntax=docker/dockerfile:1

FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build
COPY . .
ARG NEXT_PUBLIC_API_URL
# Build with an explicitly provided API URL or fall back to values in .env/.env.production
RUN if [ -n "$NEXT_PUBLIC_API_URL" ]; then \
      NEXT_PUBLIC_API_URL="$NEXT_PUBLIC_API_URL" npm run build; \
    else \
      npm run build; \
    fi

EXPOSE 3000
CMD ["npm", "run", "start"]
