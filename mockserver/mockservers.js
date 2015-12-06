/**
 * 提供模拟服务
 */
var interfaces = require('../interface/interfaces');
var nock = require('nock');
var mockserver = {};

exports.init = function() {
    interfaces.forEach(function(obj) {
        mockserver[obj.id] = nock(obj.url)
            .persist() //让模拟服务一直存在
            .defaultReplyHeaders({
                'Content-Type': 'application/json'
            })
            .get(obj.suburl)
            .delay(2000) 
            .reply(200, JSON.stringify(obj.rspdata));
    })
}