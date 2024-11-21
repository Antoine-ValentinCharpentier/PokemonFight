# Utilisation de l'image node en base
FROM node:20

RUN mkdir /project
WORKDIR /project

COPY . .

RUN npm install -g @angular/cli
RUN npm install

CMD ["ng", "serve", "--configuration=development", "--host", "0.0.0.0", "--poll", "2000", "--disable-host-check"]
