locals {
  required_services = [
    {
      "name"    = "firestore"
      "service" = "firestore.googleapis.com"
    },
    {
      "name"    = "cloudbuild"
      "service" = "cloudbuild.googleapis.com"
    },
    {
      "name"    = "cloudfunctions"
      "service" = "cloudfunctions.googleapis.com"
    },
    {
      "name"    = "logging"
      "service" = "logging.googleapis.com"
    },
    {
      "name"    = "pubsub"
      "service" = "pubsub.googleapis.com"
    },
    {
      "name"    = "cloudrun"
      "service" = "run.googleapis.com"
    },
    {
      "name"    = "workflows"
      "service" = "workflows.googleapis.com"
    },
    {
      "name"    = "artifactregistry"
      "service" = "artifactregistry.googleapis.com"
    }
  ]
}


resource "google_project_service" "service" {
  for_each = { for svc in local.required_services : svc.name => svc }
  service  = each.value.service
}
