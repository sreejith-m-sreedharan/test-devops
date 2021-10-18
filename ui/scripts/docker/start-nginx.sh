#!/bin/bash

envsubst < "/etc/nginx/nginx.conf" > "/etc/nginx/temp.conf"
yes | cp -rf "/etc/nginx/temp.conf" "/etc/nginx/nginx.conf"  
echo $FUND_MANAGER_URL;
echo $BLOCK_CHAIN_URL;
echo $INVESTOR_URL;
nginx -g 'daemon off;'
