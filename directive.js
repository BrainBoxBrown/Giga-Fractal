app.directive('myCanvas', function(){
    return {
        restrict:'E',
        scope: {
            frameWidth: '=frameWidth',
            frameHeight: '=',
            posX: '=',
            posY: '=',
            stop: '='
        },
        templateUrl:"myCanvas.html",

        link: function(scope, elem, attrs){
            function _render(){
                if (!scope.frameWidth) return;
                render(elem.find("canvas")[0],
                    scope.frameWidth,
                    scope.frameHeight,
                    scope.posX,
                    scope.posY,
                    scope.stop
                )
            }
                    
            scope.$watch('frameWidth',_render); 
            scope.$watch('frameHeight',_render);
            scope.$watch('posX',_render);
            scope.$watch('posY',_render);
            scope.$watch('stop',stopStart);
        }
    };
    

});
