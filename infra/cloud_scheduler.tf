resource "google_cloud_scheduler_job" "season20232024_stageRegular_nightly_update" {
  name        = "20232024-regular-nightly-update"
  description = "Triggers seasonStageUpdateAll workflow with { season: '20232024', stage: 'regular' }"
  schedule    = "0 9 * * *" # 3:00 AM Central 
  time_zone   = "Etc/GMT"

  http_target {
    uri         = "https://workflowexecutions.googleapis.com/v1/${google_workflows_workflow.season_stage_update_all}/executions"
    http_method = "POST"
    body        = base64encode("")
    oauth_token {
      scope                 = "https://www.googleapis.com/auth/cloud-platform"
      service_account_email = var.service_account_email
    }
  }
}
