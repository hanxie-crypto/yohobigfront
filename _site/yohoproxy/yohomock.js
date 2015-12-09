var nock = require('nock');
var mockconfig = require('../config/global_config').mockconfig;
var mokdatamap = require('../mockdata');

function YoHoMock(interfaceMap) {
    this._mockServerMap = {};
    this._initMockserver(interfaceMap);

}
YoHoMock.prototype = {
    _addMockServer: function(nock, obj) {
        var that = this;
        if (obj.mockconfig.params) {
            if (obj.type === 'get') {
                nock.get(obj.suburl)
                    .query(obj.mockconfig.params)
                    .delay(obj.mockconfig.timeout)
                    .reply(200, JSON.stringify({
                        code: 200,
                        data: that._getMockData(obj.id),
                        message: 'oo'
                    }));
            }
            if (obj.type === 'post') {
                nock.post(obj.suburl, obj.mockconfig.params)
                    .delay(obj.mockconfig.timeout)
                    .reply(200, JSON.stringify({
                        code: 200,
                        data: that._getMockData(obj.id),
                        message: 'oo'
                    }));
            }
        } else {
            nock[obj.type](obj.suburl)
                .delay(obj.mockconfig.timeout)
                .reply(200, JSON.stringify({
                    code: 200,
                    data: that._getMockData(obj.id),
                    message: 'oo'
                }));
        }

        return nock;
    },
    _getMockData: function(path) {
        return mokdatamap[path];
    },
    _initMockserver: function(interfaceMap) {
        if (interfaceMap) {
            for (var k in interfaceMap) {
                var prof = interfaceMap[k];
                var defaultNock = nock(prof.url)
                    .persist() //让模拟服务一直存在
                    .defaultReplyHeaders({
                        'Content-Type': mockconfig.contenttype
                    });
                this._mockServerMap[k] = this._addMockServer(defaultNock, prof);
            }
        }
    }
}

module.exports = YoHoMock;