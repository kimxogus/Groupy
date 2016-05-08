/**
 * Created by Taehyun on 2016-05-05.
 */

var
    config  = require('../../config'),

    getGroupInfo    = require('./getGroupInfo'),
    insertGroup     = require('../../service/insertGroup');


/**
 * Test code: register 잉력시장
 */
test();
function test() {
    setTimeout(function () {
        registerGroup(515467085222538)
            .then(group=>console.log("DONE", group))
            .catch(err=>console.error(err));
    }, 1000);
}


function registerGroup(group_id){
    return getGroupInfo(group_id)
        .then(group=>insertGroup(group));
}

module.exports = registerGroup;