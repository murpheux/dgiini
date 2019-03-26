docker build -t my-php-app .

docker run -d -p 80:80 443:443 --name qtaskr_ui -v "$PWD":/var/www/html php:7.0-apache

