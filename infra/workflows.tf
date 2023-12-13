resource "google_workflows_workflow" "update_skater_profiles" {
  name            = "updateSkaterProfiles"
  description     = "Call getSkaters function and then calls updateSkaterProfile for each skater returned. Requires [season] and [stage] arguments"
  service_account = var.service_account_email
  source_contents = templatefile("./workflows/updateSkaterProfiles.yml", {
    getSkatersUrl          = data.google_cloudfunctions2_function.get_skaters.url
    updateSkaterProfileUrl = data.google_cloudfunctions2_function.update_skater_profile.url
  })
}

resource "google_workflows_workflow" "update_skater_skating_speeds" {
  name            = "updateSkaterSkatingSpeeds"
  description     = "Call getSkaters function and then calls updateSkaterSkatingSpeed for each skater returned. Requires [season] and [stage] arguments"
  service_account = var.service_account_email
  source_contents = templatefile("./workflows/updateSkaterSkatingSpeeds.yml", {
    getSkatersUrl               = data.google_cloudfunctions2_function.get_skaters.url
    updateSkaterSkatingSpeedUrl = data.google_cloudfunctions2_function.update_skater_skating_speed.url
  })
}

resource "google_workflows_workflow" "update_skater_skating_distances" {
  name            = "updateSkaterSkatingDistances"
  description     = "Call getSkaters function and then calls updateSkaterSkatingDistance for each skater returned. Requires [season], [stage], and [manpower] arguments"
  service_account = var.service_account_email
  source_contents = templatefile("./workflows/updateSkaterSkatingDistances.yml", {
    getSkatersUrl                  = data.google_cloudfunctions2_function.get_skaters.url
    updateSkaterSkatingDistanceUrl = data.google_cloudfunctions2_function.update_skater_skating_distance.url
  })
}

resource "google_workflows_workflow" "update_skater_shot_speeds" {
  name            = "updateSkaterShotSpeeds"
  description     = "Call getSkaters function and then calls updateSkaterShotSpeed for each skater returned. Requires [season] and [stage] arguments"
  service_account = var.service_account_email
  source_contents = templatefile("./workflows/updateSkaterShotSpeeds.yml", {
    getSkatersUrl               = data.google_cloudfunctions2_function.get_skaters.url
    updateSkaterShotpeedUrl = data.google_cloudfunctions2_function.update_skater_shot_speed.url
  })
}

resource "google_workflows_workflow" "season_stage_update_all" {
  name            = "seasonStageUpdateAll"
  description     = "Calls all update worksflows for given season and stage. Requires [season] and [stage] arguments"
  service_account = var.service_account_email
  source_contents = templatefile("./workflows/seasonStageUpdateAll.yml", {
    updateSkaterProfilesWorkflowId         = google_workflows_workflow.update_skater_profiles.name
    updateSkaterSkatingSpeedsWorkflowId    = google_workflows_workflow.update_skater_skating_speeds.name
    updateSkaterSkatingDistancesWorkflowId = google_workflows_workflow.update_skater_skating_distances.name
    updateSkaterShotSpeedsWorkflowId       = google_workflows_workflow.update_skater_shot_speeds.name
  })
}
