module.exports = {
    title: 'yoho数据接口定义',
    version: '0.0.1',
    interfaces: [{
        module: 'guang',
        name: '接口1',
        id: 'user',
        type: 'get',
        params: {
            id: 1
        },
        url: 'http://127.0.0.1:8080',
        suburl: '/yohotest/user',
        err: '编号错误'
    }, {
        module: 'yohobuy',
        name: '接口2',
        id: 'orderlist',
        type: 'get',
        params: {
            id: 1
        },
        url: 'http://127.0.0.1:8080',
        suburl: '/yohotest/orderlist',
        err: '编号错误'
    }]
}