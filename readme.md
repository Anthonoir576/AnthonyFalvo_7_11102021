# - OpenClassrooms Projet 07 -

## Créez un réseau social d’entreprise

![screen Site](./readme.png)

## Technologie :
```
Mysql - Sequelize - NodeJS - Express - ReactJS - Sass/Css
```

## Tout d'abord : 

- clonez le répository 

## Installation back-end : 

Allez dans le fichier backend 
```
npm i
```
```
npm start
```

## Installation front-end : 

Allez dans le fichier frontend
```
npm i
```
```
npm start
```

## Installation Database : 

- Un fichier dans backend/config/config.json permet de configurer la base de donnée relié a l'application exemple :
```
 "development": {
    "username": "root",
    "password": "47571971",
    "database": "database_development_p7",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
```

- Un dossier migration vous permettra de créez les tables directement, aller dans backend à la racine :
```
sequelize db:create
```
```
sequelize db:migrate
```

## Administration de l'application : 

- La seule façon de créer un administrateur, serra donc de l'intégrer de façon manuelle sur la base de données en plaçant celui-ci sur 'isAdmin=true', afin d'éviter les problème lié à la sécurité de l'application.

## Problème possible lié a l'installation :
- Aucun pour le moment
- Testé sous Windows / Linux. Sous deux appareils différents