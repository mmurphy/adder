FROM node:carbon-alpine
WORKDIR /app
COPY . .
RUN npm install --production
EXPOSE 4001
CMD ["npm", "start"]
