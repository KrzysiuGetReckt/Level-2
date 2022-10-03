FROM tomcat:9.0-alpine
LABEL maintainer="deepak@softwareyoga.com"

ADD docker_task-main /usr/local/tomcat/webapps/ROOT

EXPOSE 8080
CMD ["catalina.sh", "run"]