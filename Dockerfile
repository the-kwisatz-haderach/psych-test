# syntax=docker/dockerfile:1
ARG GO_VERSION=1.21

FROM golang:${GO_VERSION} AS build-stage

WORKDIR /app

COPY . ./

RUN go mod download

RUN CGO_ENABLED=0 GOOS=linux go build -o /psych-out ./cmd/main.go

FROM golang:${GO_VERSION}-alpine

ARG AUTH0_DOMAIN
ARG AUTH0_CALLBACK_URL

RUN apk --no-cache add curl

RUN addgroup -S nonroot && adduser -S user -G nonroot
USER user

COPY --from=build-stage /app/web/build ./web/build
COPY --from=build-stage /psych-out /cmd/psych-out

EXPOSE 8000

ENV PORT 8000

# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

ENV AUTH0_DOMAIN=${AUTH0_DOMAIN}
ENV AUTH0_CALLBACK_URL=${AUTH0_CALLBACK_URL}

# HEALTHCHECK --interval=30s --timeout=3s --start-interval=5s \
#   CMD curl -f http://localhost:8000/health || exit 1

CMD ["/cmd/psych-out"]
