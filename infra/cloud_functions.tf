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

data "google_cloudfunctions2_function" "update_skater_skating_speed" {
  name     = "updateSkaterSkatingSpeed"
  location = data.google_client_config.config.region
}

data "google_cloudfunctions2_function" "update_skater_skating_distance" {
  name     = "updateSkaterSkatingDistance"
  location = data.google_client_config.config.region
}
