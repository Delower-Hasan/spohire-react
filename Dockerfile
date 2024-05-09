FROM node:18-alpine3.18

# Set the working directory in the container
WORKDIR /app/frontend

# Copy package.json and package-lock.json to the working directory
COPY package.json .

# Install project dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Expose the port that the app will run on
EXPOSE 5000

# Define the command to run your application
CMD ["npm", "run", "dev"]