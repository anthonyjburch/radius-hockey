data "google_client_config" "gcp_config" {}

locals {
  cloud_functions = ["getSkaters"]
}


resource "google_cloudfunctions2_function" "function" {
  for_each = toset(local.cloud_functions)
  name     = each.key
  location = data.google_client_config.gcp_config.region

  build_config {
    runtime = "nodejs20"
  }

  service_config {
    environment_variables = {
      HOST_PROJECT = data.google_client_config.gcp_config.project
    }
    ingress_settings               = "ALLOW_INTERNAL_ONLY"
    all_traffic_on_latest_revision = true
    service_account_email          = var.service_account_email
  }
}
