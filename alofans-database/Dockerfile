FROM postgres:12

RUN apt-get update && apt-get install -y make

COPY Makefile /scripts/Makefile

ENV POSTGRES_DB=TEMP	
ENV POSTGRES_USER=TEMPUSER
ENV POSTGRES_PASSWORD=TEMPPASSWOED

WORKDIR /scripts

EXPOSE 5432
