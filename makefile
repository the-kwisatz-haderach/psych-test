REPOSITORY=europe-west1-docker.pkg.dev/psych-411610/psych-app

build-docker:
	docker build \
	-t ${REPOSITORY}/psych:latest \
	--build-arg APP_VERSION="v0.0.1" \
	--build-arg AUTH0_DOMAIN="dev-78w6khnp.us.auth0.com" \
	--build-arg AUTH0_CALLBACK_URL="https://psych-dw5s4o7ymq-ew.a.run.app/callback" \
	.

deploy-docker:
	docker push ${REPOSITORY}/psych:latest

build-frontend:
	npm run --prefix web build