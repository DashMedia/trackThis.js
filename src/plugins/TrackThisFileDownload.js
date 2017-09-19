import provide from 'autotrack/lib/provide';
import {
  assign
} from 'autotrack/lib/utilities';
import {
  delegate,
  parseUrl
} from 'dom-utils';

class TrackThisFileDownload {
  constructor(tracker, options = {}) {
    this.tracker = tracker;
    const defaultOptions = {
      extensions: ['pdf', 'zip', '7zip', 'doc', 'docx']
    };
    this.options = assign({}, defaultOptions, options);
    this.handleLinkInteractions = this.handleLinkInteractions.bind(this);
    this.delegates = {};

    this.options.extensions.forEach((extension) => {
      const selector = `a[href$=".${extension}"]`;
      this.delegates[extension] = delegate(document, 'click', selector, this.handleLinkInteractions, {
        composed: true,
        useCapture: true
      });
    });
  }

  handleLinkInteractions(event, link) {
    const linkUrl = parseUrl(link.getAttribute('href'));
    const eventOptions = {
      eventCategory: 'File download',
      eventAction: 'click',
      eventLabel: linkUrl.href,
      transport: 'beacon'
    };
    this.tracker.send('event', eventOptions);
  }
}

provide('trackThisFileDownload', TrackThisFileDownload);
