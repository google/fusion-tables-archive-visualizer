## Eng Summary of the Geo Visualizations

20 Aug 2019


#### Summary

This code is part of the Fusion Tables Archive Tool.  The  **visualization code** in this GitHub repo allows you to embed maps in web pages based showing data from your archives. This document describes some of the less obvious implementation details of the map visualization or "geo viz" code.

"First party" or `1P` visualizations occur at the official `fusiontables-archive.withgoogle.com` site, when you preview your maps. Third party or `3P` visualizations occur when someone embeds the visualization code on their own website, say mywebsite.com.  (The 3P site can be reading the geoviz code from `fusiontables-archive.withgoogle.com `or from someone else hosting that code.)

The `viewer` or `user` is the person viewing the map visualization. The site `owner` is the person or group that manages the visualization and provides the API key.  

Again, the archive is typically a Sheet, and occasionally a CSV in Drive.


#### Access to read the archive

The code uses an API key **K.  **The 1P viewer also uses an OAuth Client ID, **OC**, to read the archive data.


<table>
  <tr>
   <td>
   </td>
   <td>API Key, K
   </td>
   <td>OAuth Client ID, OC
   </td>
  </tr>
  <tr>
   <td>1P (official website)
   </td>
   <td>Google Provided, <code>Kg</code>
   </td>
   <td>Google Provided, <code>OCg</code>
   </td>
  </tr>
  <tr>
   <td>3P (your website)
   </td>
   <td>Owner Provided, <code>Ku</code>
   </td>
   <td>Not supported.
   </td>
  </tr>
</table>


The code first tries to read the archive via the K. The read succeeds if and only if the archive is publicly readable. To the viewer, the use of key K is invisible. Using the key K also works for anonymous viewers who are not logged into a Google account, say via an Incognito or Private window.

At the official 1P website, if the read fails, the code then tries to read the archive via the OAuth Client, OC. The data read succeeds only if all of the following are true:



1.  There is a valid OAuth Client specified (which is true)
1.  The user  consents to allowing OC to have access to the viewer's Drive data.
1.  The user has read access to the archive.
1.  The archive was created by the Fusion Tables Archive Tool.

Getting a [verified OAuth Client](https://support.google.com/cloud/answer/9110914?hl=en) is a non-trivial process, so we do not support OAuth on 3P embeds.

In setting up API key K



1.  Restrict K to 3 APIs:  Maps JavaScript API, Google Sheets API and Google Drive API.
1.  Set the website restriction to the owners website.


#### URL parameters at the 1P site

If your Fusion Tables archive is a Google Sheet, the Sheet URL looks something like

    https://docs.google.com/spreadsheets/d/`123456789abcdefg_HIJK`/edit#gid=123456

The `archiveID` is the alphanumeric portion after the `/d/` and before the `/edit`…, which in this example is the made up `123456789abcdefg_HIJK.`

On the 1P site, the URL looks like 

https://fusiontables-archive.withgoogle.com/geoviz#file=<code>[archiveID&style=a-long-encoded-style-string…](https://fusiontables-archive.withgoogle.com/geoviz#file=archiveID&style=a-long-encoded-style-string…)</code>

The code in `lib/get-params-from-hash.ts` extracts the URL parameters. The "hash" here refers to the "#" in the URL, not a hash table.

The second parameter `style` is an base64-encoded Fusion Tables map style. This is not meant for user customization.
