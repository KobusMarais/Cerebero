angular.module('nodeTodo', [])
.controller('mainController', ($scope, $http) => {
  $scope.formData = {};
  $scope.todoData = {};
  // Get all todos
  $http.get('/api/v1/todos')
  .success((data) => {
    $scope.todoData = data;
    console.log(data);
  })
  .error((error) => {
    console.log('Error: ' + error);
  });

  // Create a new User
  $scope.createUser = () => {
    $http.post('/api/v1/todos', $scope.formData)
    .success((data) => {
      $scope.formData = {};
      $scope.todoData = data;
      console.log(data);
    })
    .error((error) => {
      console.log('Error: ' + error);
    });
  };
  
  // Delete a todo
  $scope.deleteTodo = (todoID) => {
    $http.delete('/api/v1/todos/' + todoID)
    .success((data) => {
      $scope.todoData = data;
      console.log(data);
    })
    .error((data) => {
      console.log('Error: ' + data);
    });
  };
});

// var myApp = angular.module('myApp', []);

// // directive on widget
// myApp.directive('passwordValidator', [function() {
//   return {
//     require: 'ngModel',
//     link: function(scope, elm, attr, ctrl) {
//       // must be on the second password, when linking first one, the second one is not registered yet
//       var pwdWidget = elm.inheritedData('$form')[attr.passwordValidator];

//       ctrl.parsers.push(function(value) {
//         if (value === pwdWidget.viewValue) {
//           ctrl.setValidity('MATCH', true);
//           return value;
//         }
//         ctrl.setValidity('MATCH', false);
//       });

//       pwdWidget.parsers.push(function(value) {
//         ctrl.setValidity('MATCH', value === second.viewValue);
//         return value;
//       });
//     }
//   };
// }]);

// // directive on form
// myApp.directive('formPwdValidator', [function() {
//   return {
//     require: 'form',
//     link: {
//       post: function(scope, elm, attr, form) {
//         var ids = attr.formPwdValidator.split(' '),
//             first = form[ids[0]],
//             second = form[ids[1]];

//         first.parsers.push(function(value) {
//           second.setValidity('MATCH', value === second.viewValue);
//           return value;
//         });

//         second.parsers.push(function(value) {
//           if (value === first.viewValue) {
//             second.setValidity('MATCH', true);
//             return value;
//           }
//           second.setValidity('MATCH', false);
//         });
//       }
//     }
//   }
// }]);
