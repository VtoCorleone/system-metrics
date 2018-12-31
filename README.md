# system-metrics
An application to get system metrics for a given machine

# setting up influxdb and grafana

Create influxdb container

> $ docker run -d -p 8083:8083 -p 8086:8086 -p 25826:25826/udp --name influxdb influxdb:1.5

Create a database

> $ docker exec -it influxdb influx
> CREATE DATABASE {{database-name}}
> exit

Create grafana container

> $ docker run -d --name grafana -p 3000:3000 -e INFLUXDB_HOST=localhost -e INFLUXDB_PORT=8086 -e INFLUXDB_NAME={{database-name}} -e INFLUXDB_USER=root -e INFLUXDB_PASS=root grafana/grafana:5.4.2

Login to grafana

> Navigate to localhost:3000
> user: admin
> pass: admin

Setup new datasource

> Name: what you want the display name to be
> URL: http://localhost:8086
> Access: Browser (very important for docker container setup)
> Auth: do not check any boxes
> Database: {{database-name}}
> User: blank
> Password: blank
> Click Save & Test