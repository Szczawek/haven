FROM mysql:lts-oraclelinux9

ENV MYSQL_ROOT_PASSWORD="9goFK18O7XNFZI" \
    MYSQL_DATABASE="garden"

COPY ./start.sql /docker-entrypoint-initdb.d

