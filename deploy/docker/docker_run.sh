docker build -t my-php-app .

docker run -d -p 80:80 -p 443:443 --name dgini_ui -v "$PWD":/var/www/html nginx:1.16.0
