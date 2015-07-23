app.controller('Controller', ['$scope', function($scope){
    $scope.stopped=false;
    $scope.coord = {
        x:-0.5,
        y:0
    };
    $scope.frame = {
        width:500,
        height:500
    };
}]);
