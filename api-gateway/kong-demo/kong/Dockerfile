FROM kong:3.6.0-ubuntu
USER root
ENV KONG_PLUGINS=custom-auth
COPY ./custom-external-auth /usr/local/share/lua/5.1/kong/plugins/custom-auth
USER kong