// User Login
angular.module('nodeLogin', [])
.controller('mainController', ($scope, $http, $window) => {
    $scope.loginUser = () => {
        $http.post('/api/login', $scope.formData)
            .success((data) => {
                console.log("api login working");
                $scope.formData = {};
                $scope.userData = data;
                if(data.access_token != -1)
                {
                    $window.localStorage.setItem('accessToken',String(data.access_token));
                    $window.location.href = '/loadGame';
                }
                console.log("access_token before Unity: " + $window.localStorage.getItem('accessToken'));
            })
            .error((error) => {
                console.log('Error: ' + error);
            }, function (error) {
        });
    };

    $scope.redirect = function(){
        window.location = "/register";
    }
});

 // User Registration
 angular.module('nodeRegistration', [])
 .controller('mainController', ($scope, $http, $window) => {
     $scope.formData = {};
     $scope.userData = {};

     // Create a new user
     $scope.createUser = () => {
         $http.post('/api/register', $scope.formData)
             .success((data) => {
                 $scope.formData = {};
                 //$scope.userData = data;
                 if(data.access_token != -1)
                 {
                     $window.localStorage.setItem('accessToken',String(data.access_token));
                     $window.location.href = '/loadGame';
                 }
             })
             .error((error) => {
                 console.log('Error: ' + error);
             }, function (error) {
         });
     };

     $scope.redirect = function(){
         window.location = "/login";
     }
 });
