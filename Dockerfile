FROM golang:1.20-alpine AS builder

RUN apk update && apk add make

COPY . /app/

WORKDIR /app
RUN go generate ./...
RUN make honey

FROM alpine:3

COPY --from=builder /app/honey /bin/honey

WORKDIR /app
COPY public /app/public
COPY migrations /app/migrations

CMD ["/bin/honey"]
