#!/usr/bin/env bash

rsync -uvrP --exclude={'.editorconfig','.idea','.git','README.md','publi.sh'} --delete-after "./" "joni@savolainen.io:/var/www/home"
