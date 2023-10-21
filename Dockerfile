FROM node:16.17.1 as build

WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:16.17.1
WORKDIR /app
COPY package.json .
COPY .env .
RUN npm install --only=production
COPY --from=build /app/dist ./dist
CMD npm run start:prod
