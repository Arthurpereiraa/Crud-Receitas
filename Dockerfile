# Use uma imagem base oficial do OpenJDK 17 (ou a versão que seu projeto usa)
FROM openjdk:17-jdk-slim

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie o arquivo JAR da aplicação para o container
COPY target/receitas-backend.jar app.jar

# Exponha a porta que a aplicação usa
EXPOSE 8080

# Comando para rodar a aplicação
ENTRYPOINT ["java","-jar","app.jar"]
