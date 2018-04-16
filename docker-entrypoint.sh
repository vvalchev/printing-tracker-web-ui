#!/bin/sh

# конфигуриране на nginx
cat << EOF > /etc/nginx/conf.d/default.conf
upstream api {
  server $BACKEND_HOST fail_timeout=0;
}

server {
	listen 80 default_server;
	listen [::]:80 default_server;

    root /var/lib/nginx/html;

    location /api {
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header Host \$http_host;
        proxy_redirect off;
        proxy_buffering off;
        proxy_pass http://api;
    }

	# You may need this to prevent return 404 recursion.
	location = /404.html {
		internal;
	}
}
EOF

# пускане на nginx във foreground
nginx -g "daemon off;"
