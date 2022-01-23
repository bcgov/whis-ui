FROM node:14 as builder
WORKDIR /usr/src/app
COPY . ./
RUN npm build

# Stage 2: Copy the JS React SPA into the Nginx HTML directory
FROM bitnami/nginx:latest
COPY --from=builder /usr/src/app/build /app
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]