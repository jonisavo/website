#!/bin/sh

rsync -urvP --delete-after ./_site/ joni@savolainen.io:/var/www/home