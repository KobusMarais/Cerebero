//
angular.module('nodeWelcome', [])
    .controller('mainController', ($scope, $http, $window) => {
        $scope.formData = {};
        $scope.userData = {};

        $scope.redirectLogin = function(){
            window.location = "/login";
        }

        $scope.redirectRegistration = function(){
            window.location = "/register";
        }
    });

// User Login
angular.module('nodeLogin', [])
.controller('mainController', ($scope, $http, $window) => {
    $scope.loginUser = () => {
        $http.post('/api/login', $scope.formData)
            .success((data) => {
                $scope.formData = {};
                $scope.userData = data;
                if(data.access_token === -1){
                    $window.alert("Username or Password is incorrect");
                    $window.alert(data.access_token);
                }
                else {
                    $window.localStorage.setItem('accessToken', data.access_token);
                    $window.location.href = '/loadGame';
                }
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
                 $scope.userData = data;
                 if(data.success === 0){
                     $window.alert("Registration failed;");
                 }
                 else {
                     $window.localStorage.setItem('accessToken', data.access_token);
                     $window.location.href = '/login';
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
