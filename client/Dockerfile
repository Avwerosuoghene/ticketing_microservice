FROM node:alpine

WORKDIR /app

# The only time package.json and npm install is run is when package.json file is changed
COPY package.json .

# This ensures dev dependencies are not run on our docker image creation
RUN npm install --only=prod
COPY . .
CMD ["npm", "run", "dev"]