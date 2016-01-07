angular.module('DashboardCtrl', [])
.controller('DashboardController', ['$scope', '$http', 'filterFilter', '$filter', 'ngTableParams','GithubCollection', function ($scope, $http, filterFilter, $filter, ngTableParams,GithubCollection) {
    $scope.formData = {};
    $scope.loading = true;
    console.log("DashboardController")

    var currentDate = new Date();


$scope.hourlyCollection =  [];
$scope.sevenCollection = []
$scope.greaterCollection = []
//By default page to be populated with shippable logs
$scope.inputObj = {"user":"Shippable","repo":"support"}
$scope.gitFectch = false;

$scope.getGitIssues = function(){
    GithubCollection.get($scope.inputObj)
    .then(function(data){
        console.log("gitdata",data)

      $scope.calculatesIssues(data.data);
      $scope.gitFectch = true;

        
    },function(error){
        console.log("error",error)
        $scope.calculatesIssues();
        $scope.gitFectch = false;
    });
}
$scope.getGitIssues();

$scope.calculatesIssues = function(data){
    $scope.hourlyCollection =  [];
    $scope.sevenCollection = [];
    $scope.greaterCollection = [];
    if(data)
    {
      for(var i=0;i<data.length;i++){
            if(data[i].created_at && data[i].state =="open"){
                if((currentDate - new Date(data[i].created_at)) > 0){
                    var datediff =Math.ceil((currentDate - new Date(data[i].created_at))/ (1000 * 3600 * 24));
                        if(datediff < 2){
                            $scope.hourlyCollection.push(data[i])
                        }
                        else if(datediff <=7){
                            $scope.sevenCollection.push(data[i])
                        }
                        else{
                            $scope.greaterCollection.push(data[i])
                        }
                }
            }
           
        }
    }
    $scope.renderHourlyCollection($scope.hourlyCollection);
    $scope.renderSevenCollection($scope.sevenCollection);
    $scope.renderGreaterCollection($scope.greaterCollection);
}

$scope.renderHourlyCollection = function(data){
     $scope.todos = data;
         $scope.loading = false;
         $scope.entryLimit = 10;
         $scope.currentPage = 1; //current page
         $scope.maxSize = 5; //pagination max size
         $scope.noOfPages = Math.ceil($scope.todos.length / $scope.entryLimit);
         $scope.$watch('search', function (term) {
             // Create $scope.filtered and then calculat $scope.noOfPages, no racing!
             $scope.todoFiltered = filterFilter($scope.todos, term);
             $scope.noOfPages = Math.ceil($scope.todoFiltered.length / $scope.entryLimit);
         });

}
$scope.renderSevenCollection = function(data){
      $scope.uptoSevenCollection = data;
         $scope.loading = false;
         $scope.entryLimitSeven = 10;
         $scope.currentPageSeven = 1; //current page
         $scope.maxSizeSeven = 5; //pagination max size
         $scope.noOfPagesSeven = Math.ceil($scope.uptoSevenCollection.length / $scope.entryLimitSeven);
         $scope.$watch('search', function (term) {
             // Create $scope.filtered and then calculat $scope.noOfPages, no racing!
             $scope.uptoSevenCollectionFiltered = filterFilter($scope.uptoSevenCollection, term);
             $scope.noOfPagesSeven = Math.ceil($scope.uptoSevenCollectionFiltered.length / $scope.entryLimitSeven);
         });
    
}
$scope.renderGreaterCollection = function(data){
         $scope.gretaerCollection = data;
         $scope.loading = false;
         $scope.entryLimitGt = 10;
         $scope.currentPageGt = 1; //current page
         $scope.maxSizeGt = 5; //pagination max size
         $scope.noOfPagesGt = Math.ceil($scope.gretaerCollection.length / $scope.entryLimitGt);
         $scope.$watch('search', function (term) {
             // Create $scope.filtered and then calculat $scope.noOfPages, no racing!
             $scope.gretaerCollectionFiltered = filterFilter($scope.gretaerCollection, term);
             $scope.noOfPagesGt = Math.ceil($scope.gretaerCollectionFiltered.length / $scope.entryLimitGt);
         });
}
}]);