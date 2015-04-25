require('jquery');
var angular = require('angular');

var app = angular.module('app', [require('angular-animate'),
                                 require('angular-sanitize'),
                                 require('angular-inview/angular-inview') && 'angular-inview']);

app.directive('content',     require('./content-directive'));
app.directive('discussions', require('./discussions-directive'));
app.directive('entry',       require('./entry-directive'));
app.directive('error',       require('./error-directive'));
app.directive('moreContent', require('./more-content-directive'));
app.directive('people',      require('./people-directive'));

app.directive('readmore',                require('./readmore-directive'));
app.directive('sortable',                require('./sortable-directive'));
app.directive('youtubeChannelSubscribe', require('./youtube-channel-subscribe-directive'));

app.filter('copy',             require('./copy-filter'));
app.filter('htmlify',          require('./htmlify-filter'));
app.filter('numsmall',         require('./numsmall-filter'));
app.filter('trustresourceurl', require('./trust-resource-url-filter'));

app.animation('.slide-animation', require('./slide-animation'));

module.exports = app;
