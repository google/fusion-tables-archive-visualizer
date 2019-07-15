# Fusion Tables Archive Visualizer

## Description

Visualize archived Fusion Tables from Google Drive.

### Links

* Live: https://geoviz.fusiontables-archive.withgoogle.com/

## Development

### Prerequisites
Make sure you have the following tools installed:

* git
* node
* npm

### Installation

After cloning the repository, install all dependencies:

```sh
npm install # install dependencies
```

Install the [Google Cloud SDK](https://cloud.google.com/sdk/) and initialize it by running:

```sh
gcloud init
```

### Configuration

Setup the gcloud to your project ID like this:

```sh
gcloud config set project my-project-id
```

Set your Google Maps API key in an environment variable called `GOOGLE_MAPS_API_KEY` like this:

```sh
export GOOGLE_MAPS_API_KEY="my-key"
```

To help with environment variable handling on a project level, check out [direnv](https://direnv.net/).

### Develop

Run the following command to start the visualizer on localhost:

```sh
npm start # start the visualizer
```

### Deploy

Run the following command to deploy the application:

```sh
npm run deploy
```

## Hosting

The project is hosted at [AppEngine](https://console.cloud.google.com/appengine/start)
