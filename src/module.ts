/// <reference path="../typings/index.d.ts" />
(function () {

    var module = angular.module('dotjem.angular.events', []);

    module.directive('dxMouseWheel', ['$parse', function ($parse) {
        let events = 'mousewheel DOMMouseScroll MozMousePixelScroll';
        return {
            restrict: 'A',
            compile: function ($element, attr) {
                var fn = $parse(attr.dxMouseWheel, null, true);
                return function (scope, element) {
                    element.bind(events, (event) => {
                        scope.$apply(()=>fn(scope, {$event: event}));
                    });
                    scope.$on('$destroy', () => element.unbind(events));
                };
            }
        }
    }]);

    module.directive('dxImageReady', ['$parse', '$timeout', function ($parse, $timeout, $rootScope) {
        return {
            restrict: 'A',
            compile: function ($element, attr) {
                var fn = $parse(attr.dxImageReady, null, true);
                return function (scope, $element) {
                    var raw = $element[0];
                    function run() {
                        if (raw.complete) {
                            if (raw.naturalHeight > 0) {
                                scope.$apply(() => fn(scope, {$event: {element: $element}}));
                            } else {
                                $rootScope.$broadcast('$onImageReadyFailed', {element: $element})
                            }
                        } else {
                            //TODO: This should be able to be replaced by a load event.
                            $timeout(run, 100);
                        }
                    }
                    run();
                };
            }
        }
    }]);
})();

