#!/bin/sh
docker-compose up --build -d  
cd frontend
npm install && npm start
