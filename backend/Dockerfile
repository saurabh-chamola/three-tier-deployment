FROM node:21 AS backend-stage
WORKDIR /app
COPY . .
RUN npm install

FROM node:21-slim
WORKDIR /app
COPY --from=backend-stage /app .
EXPOSE 8080 
CMD ["npm", "start"]
