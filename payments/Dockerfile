FROM node:alpine

WORKDIR /app
COPY package.json .

# This ensures dev dependencies are not run on our docker image creation
RUN npm install --only=prod
COPY . .
CMD ["npm", "start"]