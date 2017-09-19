# trackThis.js

Simple tracking plugins for Google Analytics inspired by (googleanalytics/autotrack)[<https://github.com/googleanalytics/autotrack>]

trackThis.js assumes you're using universal analytics and have included it in your project as per Google's instructions

## Plugins

Plugin                       | Description                                                                   | Default
---------------------------- | ----------------------------------------------------------------------------- | -------------------------
`trackThisIntraPageLink`     | Automatically track links which change the current page hash                  |
`trackThisLinkProtocol`      | Track links matching the given protocol                                       | mailto, tel
`trackThisFileDownload`      | Track file download links                                                     | pdf, zip, 7zip, doc, docx
`trackThisOpenExternalInTab` | Helper function to open all links pointing to a different domain in a new tab

## Installation

You can simply include the `dist/trackThis.js` file in your page, after your Google Analytics code if you like.

### Webpack, Browserify, etc...

Install from npm (using the `[githubUsername]/[project]` format)

```batch
npm install --save-dev DashMedia/trackThis.js
```

```Javascript
import 'trackThis.js';

ga('require', 'trackThisIntraPageLink');
ga('require', 'trackThisLinkProtocol');
ga('require', 'trackThisFileDownload');
ga('require', 'trackThisOpenExternalInTab');
```

Or, just include the plugins you're interested in

```Javascript
import 'trackThis.js/src/plugins/TrackThisFileDownload';

ga('require', 'trackThisFileDownload');
```

## Setting Up

- Add universal analytics to your project
- Include trackThis.js
- Enable trackThis plugins via `ga('require', [pluginName])`
- Enjoy extra data directly to your analytics account


## Additional options

All examples provided below are the default values

### trackThisFileDownload

We can define which file extensions to track

```Javascript
import 'trackThis.js';

const options = {
  extensions: ['pdf', 'zip', '7zip', 'doc', 'docx']
};

ga('require', 'trackThisFileDownload', options);
```

### TrackThisLinkProtocol

Each protocol requires a `category` which is passed to Google Analytics as the `eventCategory`

```Javascript
import 'trackThis.js';

const options = {
  protocols: {
    'mailto:': {
      category: 'Mail send'
    },
    'tel:': {
      category: 'Phone number'
    }
  }
};

ga('require', 'trackThisLinkProtocol', options);
```
