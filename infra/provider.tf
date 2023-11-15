terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "5.5.0"
    }
  }

  cloud {
    organization = "anthonyjburch"
    workspaces {
      name = "radius-hockey"
    }
  }
}

provider "google" {
  project = "radius-hockey"
  region  = "us-east4"
}
