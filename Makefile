# utilities to speed up common commands using Make

frontend-start:
	cd mobile; \
	npx expo start

frontend-start--ios:
	cd mobile; \
	npx expo start --ios

backend-start:
	cd backend; \
	yarn start

remove-db:
	rm db/database.db

default:
	@echo Choose a valid target: frontend-start, frontend-start--ios, backend-start, or remove-db