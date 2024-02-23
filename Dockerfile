# build step
FROM node:alpine as build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . ./
RUN npm run build

# release step
FROM nginx:alpine as release
COPY --from=build /app/build /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html/myreactappenter
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]