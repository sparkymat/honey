start-app:
	# Install reflex with 'go install github.com/cespare/reflex@latest'
	# Install godotenv with 'go install github.com/joho/godotenv/cmd/godotenv@latest'
	reflex -s -r '\.go$$' -- godotenv -f .env go run honey.go

start-view:
	# Install reflex with 'go install github.com/cespare/reflex@latest'
	reflex -r '\.qtpl$$' -- qtc -dir=view

honey:
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags '-s -w -extldflags "-static"' -o honey honey.go

db-migrate:
	migrate -path ./migrations -database "postgres://localhost:5432/honey?sslmode=disable" up

db-schema-dump:
	pg_dump --schema-only -O honey > database/schema.sql

sqlc-gen:
	sqlc --experimental generate

.PHONY: start-app start-view db-migrate db-schema-dump sqlc-gen
