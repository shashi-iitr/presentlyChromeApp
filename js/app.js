/**
 * Created by shashiHCS on 11/06/15.
 */
angular.module('myApp',['ngRoute'])
    .provider('Weather', function() {
        var apiKey = "";

        this.setApiKey = function(key) {
            if (angular.isDefined(key)) {
                this.apiKey = key
            }
        }

        this.getUrl = function(type, ext) {
            return "http://api.wunderground.com/api/" + this.apiKey + "/" + type + "/q/" + ext + '.json';
        };

        this.$get = function($q, $http) {
            var self = this;
            return {
                getWeatherForecast: function(city) {
                    var d = $q.defer();
                    $http({
                        method: 'GET',
                        url: self.getUrl("forecast", city),
                        cache: true
                    }).success(function(data) {
                        d.resolve(data.forecast.simpleforecast.forecastday);
                    }).error(function(err) {
                        d.reject(err);
                    });
                    return d.promise;
                }
            }
        }
    })

    .config(function(WeatherProvider) {
        WeatherProvider.setApiKey('97f36f3f4b9babc1');
    })

    .controller('PresentlyCtrl', function($scope, $timeout, Weather) {
        $scope.date = {};
        $scope.weather = {};
        var updateTime = function () {
            $scope.date.raw = new Date();
            $timeout(updateTime, 1000);
        }

        Weather.getWeatherForecast("New Delhi").then(function(data) {
            $scope.weather.forecast = data;
            console.log($scope.weather.forecast);
        }, function(error) {

        });

        $scope.getHighTemp = function(day) {
            return day.high['celsius'];
        }

        $scope.getDay = function(day) {
            return day.date.weekday;
        }

        updateTime();
    });