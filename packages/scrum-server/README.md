# scrum

Personal dev tools

[![Build Status](https://travis-ci.com/carlospatinos/scrum.svg?branch=main)](https://travis-ci.com/carlospatinos/scrum)

## Set up

Please generate an .env file using the template.env as a template, complete all the information, specially about the mongodb and you are ready to work. This project uses mongo as the persitant storage so you need to have one local or cloud based.


# Load testing 

We use jmeter to execute load testing, please install it and configured accordingly. For load testing do not use UI mode, you can use the following command. 

./jmeter.sh -n -t ./loadTesting/ScrumTestPlan.jmx -l testresults.jtl

## Milestones

Broadcast a message to connected users when someone connects or disconnects.
Add support for nicknames.
Don’t send the same message to the user that sent it. Instead, append the message directly as soon as he/she presses enter.
Add “{user} is typing” functionality.
Show who’s online.
Add private messaging. 



## Contributors

carlospatinos
doncesarts