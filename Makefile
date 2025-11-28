//MakeFile Client
build:
	docker build -t 7020079170/distributer-app .
run:
	docker run -d -p 3001:3001 7020079170/distributer-app