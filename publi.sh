rsync -uvrP --exclude={'.git','README.md','LICENSE','publi.sh'} --delete-after --protect-args "./" "joni@savolainen.io:/var/www/home"
