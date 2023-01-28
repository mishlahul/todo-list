include .env
export

TAG=ishlahmuzakki/todo-list

build:
	docker build -t ${TAG} .

run:
	docker run --network=host -e MYSQL_HOST=${MYSQL_HOST} -e MYSQL_USER=${MYSQL_USER} -e MYSQL_PASSWORD=${MYSQL_PASSWORD} -e MYSQL_DBNAME=${MYSQL_DBNAME} -p 8090:3030 ${TAG}

push:
	docker push ${TAG}
	