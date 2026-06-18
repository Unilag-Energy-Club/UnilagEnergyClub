#!/bin/sh
(cd energytransition.dp && node_modules/.bin/next start -p 3001) &
node server.mjs
