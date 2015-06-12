/**
 * Created by shashiHCS on 12/06/15.
 */
angular.module('myApp')
    .controller('MainCtrl', function ($scope, $timeout, Weather, UserService) {
        $scope.date = {};
        $scope.weather = {};
        $scope.loaded = false;
        $scope.user = UserService.user;
        $scope.isOpened = false;
        var updateTime = function () {
            $scope.date.raw = new Date();
            $timeout(updateTime, 1000);
        };

        function loadWeather() {
            Weather.getWeatherForecast($scope.user.location).then(function (data) {
                $scope.weather.forecast = data;
                console.log($scope.weather.forecast);
                $scope.loaded = true;
            }, function (error) {

            });
        }

        loadWeather();

        $scope.getHighTemp = function (day) {
            return day.high['celsius'];
        };

        $scope.getDay = function (day) {
            return day.date.weekday;
        };

        $scope.save = function() {
            UserService.save();
            $scope.user = UserService.user;
            loadWeather();
            $scope.isOpened = false;
        };

        $scope.openSettingsPage = function () {
            $scope.isOpened = true;
        };

        $scope.closeSettingsPage = function() {
            $scope.isOpened = false;
        }

        updateTime();
    });