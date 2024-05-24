FROM gradle:8.7.0-jdk17
ENTRYPOINT ["java", "-jar", "/app.jar"]

COPY build/libs/project-0.0.1-SNAPSHOT.jar /app.jar

EXPOSE 8080