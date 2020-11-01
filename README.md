# scrum

Personal dev tools

[![Build Status](https://travis-ci.com/carlospatinos/scrum.svg?branch=main)](https://travis-ci.com/carlospatinos/scrum)

I am just trying to create a client to communicate multiple users.

## Installation

Clone this repo.

Please generate an .env file on each module (located inside the package) using the template.env as a template, complete all the configuration, specially about the mongodb and you are ready to work. This project uses mongo as the persitant storage so you need to have one local or cloud based.

Then from its root, run:

```sh
npm install
npx lerna bootstrap
```

## Set up

There are 2 ways to start the app, the first one is for development purposes where 2 services run, the client and the server. In this mode all changes to the client or server are updated on the fly, and you can initiate it as follows:

```sh
npm run dev
```

The second mode is for production with a single instance server, the client still works but changes to the client code will not be reflected immediatelly, you can initiate it as follows:

```sh
npm start
```

## Deployment config

heroku config:set DB_USER=dbname --app app-name

## Coding Rules

To ensure consistency, style and best practices throughout the source code we follow the AirBnb ESlint rules:

- [AirBnb's JavaScript Style Guide](https://github.com/airbnb/javascript) eslint rules

## Contributing

Useful tasks to contribute:

- `npm run lint` : Checks if there are lint issues.
- `npm run lint-fix` : To fix lint issues.
- `npm run commit` : to commit the staged files using [conventional commits](https://github.com/commitizen/cz-cli)

## Milestones

Broadcast a message to connected users when someone connects or disconnects.
Add support for nicknames.
Don’t send the same message to the user that sent it. Instead, append the message directly as soon as he/she presses enter.
Add “{user} is typing” functionality.
Show who’s online.
Add private messaging.
