/**
 * Created by shashiHCS on 11/06/15.
 */
angular.module('myApp', ['ngRoute', 'ngAnimate'])
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

    .config(function($routeProvider, WeatherProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'templates/home.html',
                controller: 'MainCtrl'
            })
            .otherwise({redirectTo: '/'});

        WeatherProvider.setApiKey('97f36f3f4b9babc1');
    })

    .factory('UserService', function() {
        var defaults = {
            location: 'New Delhi'
        };
        var service = {
            user: {},
            save: function() {
                sessionStorage.presently =
                    angular.toJson(service.user);
            },
            restore: function() {  // Pull from sessionStorage
                service.user =
                    angular.fromJson(sessionStorage.presently) || defaults
                return service.user;
            }
        };
        // Immediately call restore from the session storage
        // so we have our user data available immediately
        service.restore();

        return service;
    })