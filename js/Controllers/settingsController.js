/**
 * Created by shashiHCS on 12/06/15.
 */
angular.module('myApp')
    .controller('SettingsCtrl', function($scope, UserService) {
        $scope.user = UserService.user;

        $scope.save = function() {
            UserService.save();
        };

        //$scope.cancel = function () {
        //    $modalInstance.dismiss('cancel');
        //};
    });