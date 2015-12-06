var mockdata = require('../mockdata/data');
module.exports = [{
    name: '接口1',
    id: 'interface1',
    url: 'http://127.0.0.1:8080',
    suburl:'/yohotest/user',
    rspdata: {
        data: mockdata.interface1,
        code: 200,
        message: 'ok'
    }
}, {
    name: '接口2',
    id: 'interface2',
    url: 'http://127.0.0.1:8080',
    suburl: '/yohotest/orderlist',
    rspdata: {
        data: mockdata.interface2,
        code: 200,
        message: 'ok'
    }
}]