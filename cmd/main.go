// main.go

package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/joho/godotenv"
	"github.com/the-kwisatz-haderach/psych-test/m/internal/authenticator"
	"github.com/the-kwisatz-haderach/psych-test/m/internal/router"
)

const port = 8000

func main() {
	if err := godotenv.Load(".env"); err != nil {
		log.Fatalf("Failed to load the env vars: %v", err)
	}

	auth, err := authenticator.New()
	if err != nil {
		log.Fatalf("Failed to initialize the authenticator: %v", err)
	}

	rtr := router.New(auth)

	log.Printf("Server listening on http://localhost:%d/", port)
	if err := http.ListenAndServe(fmt.Sprintf("0.0.0.0:%d", port), rtr); err != nil {
		log.Fatalf("There was an error with the http server: %v", err)
	}
}
