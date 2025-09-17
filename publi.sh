rsync -uvrP --exclude={'.git','README.md','publi.sh'} --delete-after --protect-args "./" "joni@savolainen.io:/var/www/home"
