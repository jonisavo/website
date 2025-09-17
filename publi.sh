rsync -uvrP --exclude={'.editorconfig','.idea','.git','README.md','publi.sh'} --delete-after --protect-args "./" "joni@savolainen.io:/var/www/home"
