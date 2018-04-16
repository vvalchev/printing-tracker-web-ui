#!/bin/sh
set -e

wget -c http://central.maven.org/maven2/io/swagger/swagger-codegen-cli/2.3.1/swagger-codegen-cli-2.3.1.jar -O codegen.jar
rm -rf src/app/swagger
java -jar codegen.jar generate \
    -l typescript-angular \
    -o src/app/swagger \
    -i swagger.yaml
