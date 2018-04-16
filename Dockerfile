FROM node:9.11.1-alpine

ENV BACKEND_HOST=localhost:8080

# инсталиране на нужните неща
RUN apk add --no-cache nginx

# добавяне на изходният код
ADD . /tmp/app

# компилиране на проекта
RUN cd /tmp/app && \
    cp docker-entrypoint.sh / && \
    mkdir -p /run/nginx && \
    npm install && \
    ./node_modules/.bin/ng build -prod --output-path /var/lib/nginx/html && \
    rm -rf /tmp/app

CMD "/docker-entrypoint.sh"
