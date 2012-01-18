TODOZEN
=======

Todozen is an open source project that allows you to build a list of tasks or goals of a project in order to work in a organized way

Tasks are updated across multiple computers in real time.

Server side technologies:

- nodejs v0.6.5
- express v2.5.1
- connect-redis v1.2.0
- connect v1.8.5
- jade v0.19.0
- redis v0.7.1
- socket.io v0.8.6 

Client side technologies:

- jQuery v1.7.1
- Backbone v0.5.3
- underscore v1.2.3

## Instalation

We need nvm (node version manager)

    git clone git://github.com/creationix/nvm.git ~/.nvm

To activate nvm you need to source it from bash shell

    . ~/.nvm/nvm.sh

Todozen's engine is node v0.6.5

    nvm install v0.6.5

If you have all ready installed node you can change node version with

    nvm use v0.6.5

Todozen works with redis as key value store database, in order to install it we need to run in our bash console:

    wget http://download.redis.io/redis-stable.tar.gz
    tar xvzf redis-stable.tar.gz
    cd redis-stable
    make
    sudo cp redis-server /usr/local/bin/
    sudo cp redis-cli /usr/local/bin/

    redis-server

To run all todozen's dependencies we would need npm (node package manager)

    curl http://npmjs.org/install.sh | sudo sh
    npm install -d

To run todozen:

    node app.js

## Usage

On the browser we should open:

    http://localhost:4000

Todozen starts up with three columns named  'inbox','working', and 'complete' whitch they could be deleted with

    [X]

or you can add your oun columns using:

    add column

in order to send a Task to a column use '#' like:

    Start working on foo #inbox

to set up a color you can use '!' like:

    Start #working on foo !red
