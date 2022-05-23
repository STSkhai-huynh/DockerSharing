#!/bin/sh
sed -i "s/\$BACKEND_API_URL/${BACKEND_API_URL:-localhost}/g" /usr/share/nginx/html/main*.js
sed -i "s/\$BACKEND_API_PORT/${BACKEND_API_PORT:-8080}/g" /usr/share/nginx/html/main*.js

exec "$@"