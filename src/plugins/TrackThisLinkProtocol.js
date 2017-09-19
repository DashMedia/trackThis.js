import provide from 'autotrack/lib/provide';
import {
  assign
} from 'autotrack/lib/utilities';
import {
  delegate,
  parseUrl
} from 'dom-utils';

class TrackThisLinkProtocol {
  constructor(tracker, options = {}) {
    this.tracker = tracker;
    const defaultOptions = {
      protocols: {
        'mailto:': {
          category: 'Mail send'
        },
        'tel:': {
          category: 'Phone number'
        }
      }
    };
    this.options = assign({}, defaultOptions, options);
    this.handleLinkInteractions = this.handleLinkInteractions.bind(this);
    this.delegates = {};

    Object.keys(this.options.protocols).forEach((protocol) => {
      const selector = `a[href^="${protocol}"]`;
      console.log(selector);
      this.delegates[protocol] = delegate(document, 'click', selector, this.handleLinkInteractions, {
        composed: true,
        useCapture: true
      });
    });
  }

  handleLinkInteractions(event, link) {
    const linkUrl = parseUrl(link.getAttribute('href'));
    const eventOptions = {
      eventCategory: this.options.protocols[linkUrl.protocol].category,
      eventAction: 'click',
      eventLabel: linkUrl.href,
      transport: 'beacon'
    };
    this.tracker.send('event', eventOptions);
  }
}

provide('trackThisLinkProtocol', TrackThisLinkProtocol);
