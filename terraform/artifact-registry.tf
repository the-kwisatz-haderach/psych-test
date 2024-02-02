resource "google_artifact_registry_repository" "default" {
  repository_id = "psych-app"
  description   = "repository for psych-app docker images"
  format        = "DOCKER"
}