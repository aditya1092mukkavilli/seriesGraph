var graph = angular.module('grapapp',[]);

graph.controller('generateGraph',['$scope','convertCsvToJson','drawchart', function($scope,convertCsvToJson,drawchart){
 
    /*converting CSV data to Json and giving that data to graph*/
    $scope.errorMessage = '';
    $scope.showGraph = false;
    $scope.showContent = function($fileContent)
    {
      $scope.showGraph = true;
         if($fileContent.length>0 && $fileContent.indexOf("SERIES") !== -1)
           {
             $scope.errorMessage = '' 
             let convertedValues = convertCsvToJson.convert($fileContent);
             drawchart.loadChart(convertedValues);        
           }
         else
         {
            $scope.errorMessage = 'Please Enter Valid CSV';
         }
    };
    
}]);

/*Created this directive to handle the upload file and to send data to the controller*/
graph.directive('onReadFile', function ($parse) {
	return {
		restrict: 'A',
		scope: false,
		link: function(scope, element, attrs) {
            var fn = $parse(attrs.onReadFile);
            
			element.on('change', function(onChangeEvent) {
				var reader = new FileReader();
                
				reader.onload = function(onLoadEvent) {
					scope.$apply(function() {
						fn(scope, {$fileContent:onLoadEvent.target.result});
					});
				};

				reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
			});
		}
	};
});