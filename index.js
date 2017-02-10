var module = angular.module('myapp', []);

module.controller("TreeCtrl", function($scope,$http) {

    $http.get('https://raw.githubusercontent.com/SundarRajendiran-Q4/Angular-Application/master/tree.json').then(function(response) {
           $scope.treeFamily = response.data;
    });

});

module.directive("tree", function($compile) {
    return {
        restrict: "E",
        transclude: true,
        scope: {family: '='},
        template:
            '<ul>' +
                '<li ng-transclude></li>' +
                '<p>{{ family.id }}</p>' +
                '<p>{{ family.name }}</p>' +
                '<p>{{ family.type }}</p>' +
                '<li ng-repeat="child in family.children">' +
                    '<tree family="child"></tree>' +
                '</li>' +
            '</ul>',
        compile: function(tElement, tAttr, transclude) {
            var contents = tElement.contents().remove();
            var compiledContents;
            return function(scope, iElement, iAttr) {
                if(!compiledContents) {
                    compiledContents = $compile(contents, transclude);
                }
                compiledContents(scope, function(clone, scope) {
                         iElement.append(clone);
                });
            };
        }
    };
});
