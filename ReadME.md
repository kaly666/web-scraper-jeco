# Jeco Scraper API + Web-App Client

## Prerequisites

1. Node v18

## Setup
There are 2 ways to start up the application.

### Different terminals
1. Execute `npm run setup` (this will install the node modules used by the apps)
2. Execute `npm run server` to start the API
3. Open a new terminal and execute `npm run client`
4. Feel free to use the API on port http://localhost:3000 or check out the app at port http://localhost:8080

### Background
1. Execute `npm run setup`
2. Execute `npm run background` (this will install pm2 and will run the apps in the background)
3. Feel free to use the API on port http://localhost:3000 or check out the app at port http://localhost:8080 (127.0.0.1:8080 or any other displayed IP in the terminal)
4. To check out API's status execute `pm2 list` or `pm2 logs [id]`

## Usage

For API endpoints testing feel free to use the swagger file. (jeco-scrapper.yaml)
To try it out use swagger or upload it at https://editor.swagger.io
