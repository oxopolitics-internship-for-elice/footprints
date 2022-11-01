#  Define from what image we want to build from
FROM node:16-alpine

# Create a directory to hold the application code inside the image
WORKDIR /oxo/src/app

COPY server/package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY server/ .

# Bundle app's source code inside the Docker image
RUN npm run build

# Bind port
EXPOSE 8080

# Define commands to run app during runtime
CMD ["node", "dist/main"]