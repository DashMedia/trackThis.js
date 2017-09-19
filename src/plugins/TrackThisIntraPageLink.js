import provide from 'autotrack/lib/provide';

import {
  delegate,
  parseUrl
} from 'dom-utils';

class TrackThisIntraPageLink {
  constructor(tracker) {
    this.tracker = tracker;
    this.handleLinkInteractions = this.handleLinkInteractions.bind(this);
    this.delegates = delegate(document, 'click', 'a', this.handleLinkInteractions, {
      composed: true,
      useCapture: true
    });
  }

  handleLinkInteractions(event, link) {
    const linkUrl = parseUrl(link.getAttribute('href'));
    if (linkUrl.hostname === location.hostname && linkUrl.pathname === location.pathname && linkUrl.hash !== location.hash) {
      this.tracker.send('event', {
        eventCategory: 'Intra-Page Link',
        eventAction: 'click',
        eventLabel: linkUrl.href
      });
    }
  }
}

provide('trackThisIntraPageLink', TrackThisIntraPageLink);
