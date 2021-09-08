FROM node:16

RUN mkdir /opt/app; exit 0

WORKDIR /opt/app

COPY . /opt/app

RUN npm install

RUN npm run build

# # Start the app
CMD npm start