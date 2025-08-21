# Use official lightweight OpenJDK image
FROM openjdk:17-jdk-slim

# Set working directory inside container
WORKDIR /app

# Copy the built jar file from Maven build
COPY target/*.jar app.jar

# Expose Spring Boot default port
EXPOSE 8080

# Run the Spring Boot app
ENTRYPOINT ["java", "-jar", "app.jar"]

