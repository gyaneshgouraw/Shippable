angular.module('todoService', [])

        .factory('GithubCollection', ['$http', function ($http) {
            return {
                get: function (data) {
                    return $http.get('https://api.github.com/repos/'+data.user+'/'+data.repo+'/issues');
                }         
            }
        }])
    .filter('interpolate', ['version', function (version) {
        return function (text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        }
    }])
    .filter('startFrom', function() {
        return function(input, start) {
            if(input && input.length) {
                start = +start; //parse to int
                return input.slice(start);
            }
            return [];
        }
    });


	