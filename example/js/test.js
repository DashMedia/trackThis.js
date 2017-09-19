import 'autotrack';
import 'autotrack/lib/plugins/outbound-link-tracker';
import 'autotrack/lib/plugins/outbound-form-tracker';
import 'autotrack/lib/plugins/max-scroll-tracker';
import '../../dist/TrackThis.js';

ga('require', 'outboundLinkTracker');
ga('require', 'outboundFormTracker');
ga('require', 'maxScrollTracker');
ga('require', 'trackThisIntraPageLink');
ga('require', 'trackThisLinkProtocol');
ga('require', 'trackThisFileDownload');
ga('require', 'trackThisOpenExternalInTab');
