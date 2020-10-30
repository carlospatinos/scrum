# scrum

Personal dev tools

[![Build Status](https://travis-ci.com/carlospatinos/scrum.svg?branch=main)](https://travis-ci.com/carlospatinos/scrum)

I am just trying to create a client to communicate multiple users.

## Installation
Clone this repo.

Then from its root, run:

```
npm install
npx lerna bootstrap
```

## Set up

Then from its root, run:


Please generate an .env file using the template.env as a template, complete all the information, specially about the mongodb and you are ready to work. This project uses mongo as the persitant storage so you need to have one local or cloud based.

heroku config:set DB_USER=dbname --app app-name

## Usage
Run `npm start` from the root.


## Milestones

Broadcast a message to connected users when someone connects or disconnects.
Add support for nicknames.
Don’t send the same message to the user that sent it. Instead, append the message directly as soon as he/she presses enter.
Add “{user} is typing” functionality.
Show who’s online.
Add private messaging. 
