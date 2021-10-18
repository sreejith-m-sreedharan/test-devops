FROM nginx:1.17.6
RUN apt-get update
RUN apt-get install -y gettext-base

ARG FUND_MANAGER_URL="http://vmf48.southeastasia.cloudapp.azure.com:9081"
ARG BLOCK_CHAIN_URL="http://vmfalcon.southindia.cloudapp.azure.com:8080/api"
ARG INVESTOR_URL="http://vmf48.southeastasia.cloudapp.azure.com:8081"


ENV FUND_MANAGER_URL $FUND_MANAGER_URL 
ENV BLOCK_CHAIN_URL $BLOCK_CHAIN_URL
ENV INVESTOR_URL $INVESTOR_URL


RUN echo "deb http://security.debian.org/debian-security stretch/updates main" > /etc/apt/sources.security.only.list
RUN apt-get -y update -o Dir::Etc::SourceList=/etc/apt/sources.security.only.list -o Dir::Etc::Parts=/dev/null
RUN apt-get -y upgrade -o Dir::Etc::SourceList=/etc/apt/sources.security.only.list -o Dir::Etc::Parts=/dev/nulld

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/nginx.conf

COPY scripts/docker/start-nginx.sh /usr/share/nginx/start-nginx.sh

COPY dist/innovate2020 /usr/share/nginx/html
COPY version /usr/share/nginx/html/assets/version

RUN chmod +x /usr/share/nginx/start-nginx.sh

ENTRYPOINT ["/usr/share/nginx/start-nginx.sh"]
EXPOSE 80
