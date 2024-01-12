// main.go

package main

import (
	"log"
	"net/http"

	"github.com/joho/godotenv"
	"github.com/the-kwisatz-haderach/psych-test/m/internal/authenticator"
	"github.com/the-kwisatz-haderach/psych-test/m/internal/router"
)

func main() {
	if err := godotenv.Load(".env"); err != nil {
		log.Fatalf("Failed to load the env vars: %v", err)
	}

	auth, err := authenticator.New()
	if err != nil {
		log.Fatalf("Failed to initialize the authenticator: %v", err)
	}

	rtr := router.New(auth)

	log.Print("Server listening on http://localhost:3000/")
	if err := http.ListenAndServe("0.0.0.0:3000", rtr); err != nil {
		log.Fatalf("There was an error with the http server: %v", err)
	}
}
