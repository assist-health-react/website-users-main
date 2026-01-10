# FROM node:18-alpine AS build
# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .
# RUN npm run build

# FROM nginx:alpine
# COPY --from=build /app/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
# ---------- Build stage ----------
# FROM node:18-alpine AS build
# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .
# RUN npm run build

# FROM nginx:alpine
# COPY --from=build /app/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
FROM node:18-alpine AS build

WORKDIR /app

# 🔥 IMPORTANT: increase Node heap
ENV NODE_OPTIONS=--max-old-space-size=2048

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build
