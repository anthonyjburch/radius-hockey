resource "google_artifact_registry_repository" "npm" {
  repository_id = "radius-hockey-npm"
  description   = "NPM package repository"
  format        = "npm"
}
