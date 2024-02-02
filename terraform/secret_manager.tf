resource "google_secret_manager_secret" "auth0_client_id" {
  secret_id = "AUTH0_CLIENT_ID"

  replication {
    auto {

    }
  }
}

resource "google_secret_manager_secret" "auth0_client_secret" {
  secret_id = "AUTH0_CLIENT_SECRET"

  replication {
    auto {

    }
  }
}

