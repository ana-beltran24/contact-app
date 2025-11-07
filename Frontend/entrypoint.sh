#!/bin/sh
# Genera env.js reemplazando variables de entorno
envsubst < /usr/share/nginx/html/env.js.tpl > /usr/share/nginx/html/env.js

# Arranca nginx
nginx -g "daemon off;"