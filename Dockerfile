FROM node:16.9.1
COPY . /app
WORKDIR /app
COPY package.json package-lock.json* ./
COPY .env ./
COPY src ./src
RUN npm install
EXPOSE 3000
CMD [ "npm", "run", "dev"]