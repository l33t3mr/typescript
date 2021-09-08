FROM node:16

RUN mkdir /opt/app; exit 0

WORKDIR /opt/app

COPY . /opt/app

RUN npm install

# # Start the app
CMD npm start