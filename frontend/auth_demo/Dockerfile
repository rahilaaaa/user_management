#it tells to docker to use nodejs 18 version as base image
FROM node:20

#working directry inside the container 
WORKDIR /app


#copying package.json and package-lock.json from my folder to docker folder that is '/frontend'
COPY package*.json ./ 

#run the packages inside those files 
RUN npm install

#copying remaing files soruce(first dot) to destination(second dot)
COPY . . 

#expose vite default port(optional)
EXPOSE 5173

CMD ["npm", "run", "dev"]