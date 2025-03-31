# Use the official Node image as the base image
FROM node:22-alpine as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the application files
COPY . .

# Build the Angular application
RUN npm run buildDev

FROM nginx:1.25.3



COPY --from=build /app/dist/Aplus/browser /usr/share/nginx/html


# Start Nginx
# CMD ["nginx", "-g", "daemon off;"]

# Sử dụng lệnh envsubst để thay thế các biến môi trường trong tệp env.sample.js và ghi kết quả vào env.js.
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.sample.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
