# Use the base image with Node.js 14
FROM node:14-alpine

# Set the working directory
WORKDIR /usr/src/app

# Install app dependencies by copying both package.json AND package-lock.json
COPY package*.json ./

# If you want to install both production and development dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Expose port 3000 to be accessible externally
EXPOSE 8080

# Run your application in dev mode using nodemon
CMD [ "nodemon", "./src/app.js" ]
