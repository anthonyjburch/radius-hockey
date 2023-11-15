data "google_client_config" "config" {
}

data "google_cloudfunctions2_function" "get_skaters" {
  name     = "getSkaters"
  location = data.google_client_config.config.region
}

data "google_cloudfunctions2_function" "update_skater_profile" {
  name     = "updateSkaterProfile"
  location = data.google_client_config.config.region
}
