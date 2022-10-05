FROM tomcat:9.0-alpine
RUN apk update && apk add --no-cache git
WORKDIR /usr/local/tomcat/webapps

RUN git clone https://github.com/a1qatraineeship/docker_task app/