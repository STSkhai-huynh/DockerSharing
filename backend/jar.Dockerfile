FROM openjdk:11
COPY target/apiServer.jar apiServer.jar
ENTRYPOINT ["java", "-jar", "/apiServer.jar"]