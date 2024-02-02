resource "google_cloud_run_v2_service" "default" {
  name     = "psych"
  location = "europe-west1"
  ingress  = "INGRESS_TRAFFIC_ALL"

  traffic {
    type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
    percent = 100
  }

  template {
    service_account = google_service_account.cloud_run_invoker.email
    scaling {
      max_instance_count = 2
      min_instance_count = 0
    }
    containers {
      image = google_artifact_registry_repository.default.id
      resources {
        limits = {
          cpu    = "1000m"
          memory = "256Mi"
        }
        cpu_idle          = true
        startup_cpu_boost = false
      }
      ports {
        container_port = 8000
      }
      env {
        name = "AUTH0_CLIENT_SECRET"
        value_source {
          secret_key_ref {
            secret  = google_secret_manager_secret.auth0_client_secret.secret_id
            version = "latest"
          }
        }
      }
      env {
        name = "AUTH0_CLIENT_ID"
        value_source {
          secret_key_ref {
            secret  = google_secret_manager_secret.auth0_client_id.secret_id
            version = "latest"
          }
        }
      }
      startup_probe {
        initial_delay_seconds = 0
        timeout_seconds       = 240
        period_seconds        = 240
        failure_threshold     = 1
        tcp_socket {
          port = 8000
        }
      }
    }
  }

  depends_on = [google_artifact_registry_repository.default]
  lifecycle {
    ignore_changes = [
      client,
      client_version,
      template[0].containers[0].image,
    ]
  }
}