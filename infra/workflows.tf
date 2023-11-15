resource "google_workflows_workflow" "update_skater_profiles" {
  name            = "updateSkaterProfiles"
  description     = "Call getSkaters function and then calls updateSkaterProfile for each skater returned. Requires [season] and [stage] arguments"
  service_account = var.service_account_email
  source_contents = templatefile("./workflows/updateSkaterProfiles.yml", {
    getSkatersUrl          = data.google_cloudfunctions2_function.get_skaters.url
    updateSkaterProfileUrl = data.google_cloudfunctions2_function.update_skater_profile.url
  })
}
