down:
	docker-compose down

build:
	docker-compose build

shell:
	docker-compose --env-file ./.env.dev run --rm app sh 

test: down
	docker-compose --env-file ./.env.dev run --rm app npm run test

test-watch: down
	docker-compose --env-file ./.env.dev run --rm app npm run test:watch

deploy:
	serverless deploy --aws-profile transcritter

serverless-remove:
	serverless remove --aws-profile transcritter