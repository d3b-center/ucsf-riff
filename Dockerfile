# First image to compile typescript to javascript
FROM node:18.10.0-alpine3.15 AS build-image
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

# Second image, that creates an image for production
FROM node:18.10.0-alpine3.15 AS prod-image
WORKDIR /app
COPY --from=build-image ./app/dist ./dist
COPY package* ./
COPY migrations ./migrations
COPY .env .env
RUN npm ci --production
CMD [ "npm", "run", "start:prd" ]