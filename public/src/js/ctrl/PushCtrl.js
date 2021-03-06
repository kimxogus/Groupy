/**
 * Created by l34p on 2016-06-07.
 */

import '../service/PushService';
import '../service/GroupService';

let app = global.app;


PushCtrl.$inject = ['$scope', '$route', '$routeParams', '$location', 'groupService', 'pushService'];

function PushCtrl($scope, $route, $routeParams, $location, groupService, pushService) {

    let uuid = $routeParams.uuid;
         
    groupService.getGroups()
        .then((groups)=>{
            $scope.groups = groups;
        });

    $('.ui.dropdown').dropdown();

    // TODO: if there is no device info, then insert new one
    pushService.getDeviceInfo(uuid)
        .then((info)=>{
            $scope.push_enabled = info.push_enabled;
        });

    pushService.getRegKeywords(uuid)
        .then((info)=>{
            $scope.pushInfos = info
        });

    $scope.setAlarm = function() {
        var keyword = $scope.alarm_keyword;
        var group_id = $('.ui.dropdown').dropdown('get value');
        pushService.setAlarm(uuid, keyword, group_id)
        pushService.getRegKeywords(uuid)
            .then((info)=>{
                $scope.pushInfos = info
            });
    };

    $scope.delAlarm = function(keyword, group_id) {
        pushService.delAlarm(uuid, keyword, group_id)
        pushService.getRegKeywords(uuid)
            .then((info)=>{
                $scope.pushInfos = info
            });
    };

    $scope.update = function() {
        pushService.update(uuid, $scope.push_enabled);
    }
     
}


app.controller('pushCtrl', PushCtrl);

module.exports = PushCtrl;
