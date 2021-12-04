# - OpenClassrooms Projet 07 -

## Créez un réseau social d’entreprise

![screen Site](./readme.png)

## Technologie :
```
Mysql - Sequelize - NodeJS - Express - ReactJS - Sass/Css
```

## Dans un premier temps : 

- clonez le répository 

## Dans un second temps :

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

- Un fichier dans backend/config/config.json permet de configurer la base de donnée relié a l'application, un dossier migration vous permettra de créez les tables directement comme ceci :

Dans backend 
```
sequelize db:create
```
```
sequelize db:migrate
```

## Administration de l'application : 

- La seule façon de créer un administrateur, serra donc de l'intégrer de façon manuelle sur la base de données afin d'éviter les problème lié à la sécurité de l'application

## Problème possible :
- Aucun 
- Testé sous Windows / Linux sur deux appareils différents