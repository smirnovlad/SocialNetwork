# HuaoMao

## Project idea

**HuaoMao** is a social network with the following implemented features:
<ol>
    <li> Site authorization
    <li> Creation of a personal profile with the ability to edit it (photo, birthday, city of residence)
    <li> Adding friends
    <li> Synchronized message exchange
    <li> Ability to leave feedback about the site
</ol>

### Implementation details

- Web application design: [design in Figma](https://www.figma.com/file/hlFAIfFrGb8HHlGH0B2Uy7/HuaoMao?type=design&node-id=0-1&mode=design&t=LrnYanTZAVLeXxYG-0)

- The backend of the application is written in Django. Djoser is used for authentication, and Django Channels for WebSocket notification.

- Frontend is developed using React + Redux.

### Example

At the time of writing this README, the application is hosted on the server http://158.160.113.82/. The virtual machine (server) is rented on Yandex Cloud.
#### Regular user

![MVP.gif](samples/MVP.gif)

#### Admin workflow

![AdminWorkflow.gif](samples/AdminWorkflow.gif)

Unauthenticated users can view the following pages:

- http://158.160.113.82/login
- http://158.160.113.82/profile/<id\>
- http://158.160.113.82/users
- http://158.160.113.82/feedback

## CI/CD

Upon push and pull request to the main branch, a workflow is triggered. It includes testing the application and deploying it to the remote server in case of success. A separate volume is allocated for the database, ensuring that its state remains current (not reset) with each update.
## How to build
### Locally
First, update the constants in `backend/backend/settings.py` and `react-app/src/api/config.js`, corresponding to the host and ports.
1. Apply migrations to data models from the backend directory:
```
python3 manage.py migrate
```

2. Run the server from the backend directory:
```
python3 manage.py runserver
```

3. Start the Docker container for handling sockets with Redis channels:
```
docker run -p 6379:6379 -d redis:5
```

4. Run the React application from the react-app directory:
```
npm install
npm start
```



### Dockerization
#### Local
1. First, bring up the container. From the project's root folder (where `docker-compose.yml` is located), execute:
```
docker-compose up -d
```
To rebuild images, execute:
```
docker-compose up --build
```
2. If the command ends with an error like:
```
ERROR: for nginx  Cannot start service nginx: Ports are not available: exposing port TCP 0.0.0.0:80 -> 0.0.0.0:0: listen tcp 0.0.0.0:80: bind: address already in use
```
Check which process is occupying port 80:
```
sudo lsof -i :80
```
Terminate that process using:
```
sudo kill -9 <pid>
```
If the port is occupied by the Apache server, run:
```
/etc/init.d/apache2 stop
```
#### Remote
Assuming **158.160.113.82** is the IP of the server where we want to run our application.
1. Create a context for remote SSH:
```
docker context create remoteContext --docker host=ssh://smirnovlad@158.160.113.82
```
2. Now, start the container with the remote context:
```
docker-compose --context remoteContext up -d
```

#### Extra

- To update, for example, the host of the context:
```
docker context update \
    --docker "host=ssh://smirnovlad@158.160.113.82" \
    remoteContext
```

- To remove the context:
```
docker context rm remoteContext
```

- Command to stop all containers:
```
docker stop $(docker ps -a -q)
```

- Command to remove all images:
```
docker system prune -a --volumes
```

## TODO

1. Devise more comprehensive tests (requests to the remote server, authentication, etc.)
2. Transition to JWT tokens
3. Add cryptographic dependencies
4. Add SEO support
5. Message notification outside the chat