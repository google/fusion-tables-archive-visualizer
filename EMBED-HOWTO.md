## Hosting Your Own Map Visualizations

July 30, 2019

#### Summary

The Fusion Tables Archive Tool visualization code in this open source repo
allows you to embed maps in web pages based on your archives.

This document describes how to (a) optionally modify the map visualization code
and (b) host the map embed code yourself.

We assume you have the necessary TypeScript/JavaScript skills if you want to
modify the code.

The main steps are:

1.  Download or clone the code from github
1.  (Optional) Modify the code locally
1.  Build the `embed.js` file
1.  Obtain a Google API key to enable (possibly non-free) use of the Google Maps
    API
1.  Host and serve your own `embed.js`.
1.  Modify the JS snippet so use your own `embed.js`.

#### Download, install, modify and build

Download the code from this GitHub repo: _[TODO: give the correct GH repo]_

The code is for a node.js server Install the code following the README.md from
the repo. In particular you need to run:

```shell
  % npm install
  % export GOOGLE_SIGNIN_CLIENT_ID="XXXXXXXXXXX.apps.googleusercontent.com"
  % (Optional) modify the code
  % npm run build
```

Running "`npm run build`" runs [parcel](https://parceljs.org) which gathers all
the code and packs it into a couple of large .js files in the
`./dist/`directory. The `main*` files are used at the official website and are
not of interest. However, the `embed.js` file is the one file of interest as it
is the file used for your own embeds.

FYI, At the tool's [official website](fusiontables-archive.withgoogle.com),
visualizations occur at `/geoviz/` so the build does

```shell
     parcel build --public-url /geoviz/ ./src/index.html ./src/embed.ts.
```

The /geoviz/ setting is ignored when building embed.js, so you can ignore it.

#### Obtain a Google Maps API key

Read
[these instructions](https://developers.google.com/maps/documentation/javascript/get-api-key)
to obtain a Google API key **K**.

Remember to
[restrict K to the Maps API](https://developers.google.com/maps/documentation/embed/get-api-key),
and possibly restrict K for use only on your domain.

#### Host the embed.js file

Note there are many ways to serve this file. For example, use your ISP, if you
have a domain that is yours, upload the embed.js there, and you are done.

Or see
[this result](https://cloud.google.com/storage/docs/hosting-static-website) in a
Google Search for
[[serve static files from Google Cloud Storage](https://www.google.com/search?q=serve+static+files+google+cloud+storage)]

#### Modify the JavaScript embed snippet

Update the following JavaScript snippet to use your embed code. There are 4
lines you need to modify:

1.  The line with <code>src=""https://your-domain.com/your-path/embed.js"
    </code>must be updated to use the URL of your embed.js
1.  The line with <code>apiKey</code> must be use your API key
1.  The lines with "<code>var fileId = ...</code>" and "<code>var style =
    …</code>" must be modified to use your archive and the styles chosen for
    that archive. See your <code>ft-index-archive</code> Sheet the values you
    want.

```javascript
<div id="fusiontable-map"></div>
<script src="https://fusiontables-archive.withgoogle.com/geoviz/embed.js"></script>
// Replace the following URL with your hosting URL
<script src="https://your-domain.com/your-path/embed.js"></script>
<style>
  #fusiontable-map {width: 100%; height: 100%}
  body.cursor-pointer .gm-style > div {cursor: pointer !important;}
</style>
<script>
  var containerSelector = '#fusiontable-map';
  // Replace with your Google Cloud API Key
  var apiKey = 'YOUR_API_KEY';
  // Replace fileId and style with values for the archive you want to show in the embed.
  var fileId = '1vSJpdtLGNgkPanA-raJKRiFTE0yTVU06EtFR8JjqAUc';
  var style = {marker:{icon:'small_red'},polyline:{strokeColor:{color:'#ff000080'},strokeWeight:{weight:2}},polygon:{fill:{color:'#ff000080'},strokeColor:{color:'#666666ff'},strokeWeight:{weight:1}}};

  fusiontablesArchiveEmbed(containerSelector, apiKey, fileId, style);
</script>
```
