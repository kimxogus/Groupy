/**
 * Created by kimxogus on 2016-05-05.
 */
import angular from 'angular';
import $ from 'jquery';
import 'angular-route';
import 'angular-sanitize';
import routes from './routes'

let app = angular.module('app', ['ngRoute', 'ngSanitize']);

app.config(routes);

app.run(['$rootScope', '$window',
    function($rootScope, $window) {
        $rootScope.fbsdkLoaded = false;
        $window.fbAsyncInit = function() {
            FB.init({
                appId: '725048380929186',
                version: 'v2.6',
                status: true,
                cookie: true,
                xfbml: true
            });
            $rootScope.fbsdkLoaded = true;
            $("#fb-root").trigger("facebook:init");
        };
        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/ko_KR/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }]
);

global.angular = angular;
global.$ = $;
global.app = app;

module.exports = app;