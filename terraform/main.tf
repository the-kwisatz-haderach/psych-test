terraform {
  backend "gcs" {
    bucket = "a22fea2f9857fc71-bucket-tfstate"
    prefix = "terraform/state"
  }

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.51"
    }
  }

  required_version = ">= 1.2.0"
}

provider "google" {
  project = "psych-411610"
  region  = "europe-west1"
}

resource "google_service_account" "terraform" {
  account_id   = "tf-admin"
  display_name = "A service account allowing terraform to manage cloud resources"
}

resource "google_service_account" "cloud_run_invoker" {
  account_id  = "cloud-run-invoker"
  description = "Run cloud run service"
}

resource "google_project_iam_member" "default" {
  project    = "psych-411610"
  role       = "roles/admin"
  member     = google_service_account.terraform.member
  depends_on = [google_service_account.terraform]
}

resource "random_id" "bucket_prefix" {
  byte_length = 8
}

resource "google_storage_bucket" "tf_state" {
  name          = "${random_id.bucket_prefix.hex}-bucket-tfstate"
  force_destroy = false
  location      = "EU"
  storage_class = "STANDARD"
  versioning {
    enabled = false
  }
  depends_on = [
    google_project_iam_member.default
  ]
}