var _       = require('underscore');
var angular = require('angular');

module.exports = angular.module(chrome.i18n.getMessage('app_short_name') + 'EntryComponents', [require('./service-components')])
    .controller('EntryController', ['$scope', '$timeout', '$window', 'apiService', function($scope, $timeout, $window, apiService) {
        $scope.service = apiService;

        chrome.storage.sync.get('order', function(obj) {
            if (!obj.order) {
                obj.order = [];
            }
            var original_length = obj.order.length;
            obj.order = _.union(obj.order, ['reddit', 'twitter', 'imgur', 'instagram', 'soundcloud', 'youtube']);
            if (original_length !== obj.order.length) {
                chrome.storage.sync.set(obj);
            }
        });

        $scope.$watch('entry.selectedPerson.selectedAccount', function(selectedAccount, oldAccount) {
            if ($scope.view && $scope.view.fullscreen && oldAccount) {
                $scope.view.fullscreen = null;
            }
        });

        $window.addEventListener('message', function(event) {
            var request = event.data;
            // TODO Determine if this is our request and not someone else's
            switch(request.msg) {
                case 'load':
                    $scope.$apply(function() {
                        $scope.entry           = null;
                        $scope.data            = {};
                        $scope.view.fullscreen = false;
                    });
                    $timeout(function() {
                        var identity = request.identity;
                        $scope.entry = { type: identity.type, times: { start: _.now() } };
                        switch (identity.type) {
                            case 'content':
                                $scope.entry.content = identity;
                                break;
                            case 'discussion':
                                $scope.entry.discussions = {};
                                $scope.entry.discussions[identity.api] = identity;
                                $scope.entry.discussion_api = identity.api;
                                break;
                            case 'account':
                                $scope.entry.accounts = [identity];
                                break;
                            case 'url':
                                $scope.entry.url = identity.id;
                                $scope.entry.discussions = { reddit:  { api: 'reddit',  type: 'url', id: identity.id },
                                                             twitter: { api: 'twitter', type: 'url', id: identity.id } };
                                break;
                        }
                    }, 100);
                    break;
                case 'hide':
                    $scope.$apply(function() {
                        $scope.entry = null;
                    });
                    break;
                case 'sameload':
                    $scope.$apply(function() {
                        if (!$scope.entry) {
                            return;
                        }
                        $scope.entry.shake = ($scope.entry.shake || 0) + 1;
                    });
                    break;
            }
        }, false);
    }])
    .name;