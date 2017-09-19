import provide from 'autotrack/lib/provide';
import {
  parseUrl
} from 'dom-utils';

class TrackThisOpenExternalInTab {
  constructor() {
    const links = document.querySelectorAll('a[href]');
    links.forEach((link) => {
      const linkUrl = parseUrl(link.getAttribute('href'));
      if (linkUrl.host !== location.host) {
        link.setAttribute('rel', 'external');
        link.setAttribute('target', '_blank');
      }
    });
  }
}

provide('trackThisOpenExternalInTab', TrackThisOpenExternalInTab);
