FROM maven:3.8.4-jdk-11
COPY ./ ./
RUN mvn clean package
EXPOSE 8080
CMD ["java", "-jar", "target/apiServer.jar"]