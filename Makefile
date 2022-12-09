# utilities to speed up common commands using Make

mobile-start:
	cd mobile; \
	npx expo start

mobile-start--ios:
	cd mobile; \
	npx expo start --ios

web-start:
	cd web; \
	yarn start

backend-start:
	cd backend; \
	yarn start

remove-db:
	rm db/database.db

default:
	@echo Choose a valid target: mobile-start, mobile-start--ios, web-start, backend-start, or remove-db