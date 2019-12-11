# Floogle
* Requirements 
 * Docker -> https://docs.docker.com/install/linux/docker-ce/ubuntu/

## Installation
* Simply run the following command to start
```
> docker-compose up -d --build 
```
* On startup the `webcrawler` container will pull data from our sites then it will save to ElasticSearch, so it will take a while before results will show

## Infrastructure
![alt text](img/Floogle%20Infra%20Local.png "Local Infrastructure")

![alt text](img/Floogle%20Infra%20Prod.png "Local Infrastructure")