module.exports = {
    title: 'yoho数据接口定义',
    version: '0.0.1',
    interfaces: [{
        module: 'guang',
        name: '接口1',
        id: 'user',
        type: 'get',
        url: 'http://127.0.0.1:8080',
        suburl: '/yohotest/user',
        mockconfig: {
            timeout: 1000,
            params: {
                id: 1
            }
        }
    }, {
        module: 'yohobuy',
        name: '接口2',
        id: 'orderlist',
        type: 'get',
        url: 'http://127.0.0.1:8080',
        suburl: '/yohotest/orderlist',
        mockconfig: {
            timeout: 3000,
            params: {
                id: 1
            }
        }
    }, {
        module: 'yohohome',
        name: '接口3',
        id: 'headernav',
        type: 'get',
        url: 'http://127.0.0.1:8080',
        suburl: '/yohotest/headernav',
        mockconfig: {
            timeout: 0,
            params: {
                id: 1
            }
        }
    }, {
        module: 'yohohome',
        name: '接口4',
        id: 'myyoho',
        type: 'get',
        url: 'http://127.0.0.1:8080',
        suburl: '/yohotest/myyoho',
        mockconfig: {
            timeout: 0,
            params: {
                id: 1
            }
        }
    }, {
        module: 'yohohome',
        name: '接口5',
        id: 'gobuy',
        type: 'get',
        url: 'http://127.0.0.1:8080',
        suburl: '/yohotest/gobuy',
        mockconfig: {
            timeout: 0,
            params: {
                id: 1
            }
        }
    }, {
        module: 'yohoboy',
        name: '接口6',
        id: 'adbanner',
        type: 'get',
        url: 'http://127.0.0.1:8080',
        suburl: '/yohotest/adbanner',
        mockconfig: {
            timeout: 0
        }
    }, {
        module: 'yohoboy',
        name: '接口7',
        id: 'newarrivls',
        type: 'get',
        url: 'http://127.0.0.1:8080',
        suburl: '/yohotest/newarrivls',
        mockconfig: {
            timeout: 0
        }
    }, {
        module: 'yohoboy',
        name: '接口8',
        id: 'newreport',
        type: 'get',
        url: 'http://127.0.0.1:8080',
        suburl: '/yohotest/newreport',
        mockconfig: {
            timeout: 0
        }
    }, {
        module: 'yohoboy',
        name: '接口9',
        id: 'preferencebrands',
        type: 'get',
        url: 'http://127.0.0.1:8080',
        suburl: '/yohotest/preferencebrands',
        mockconfig: {
            timeout: 0
        }
    }, {
        module: 'yohoboy',
        name: '接口10',
        id: 'recommend',
        type: 'get',
        url: 'http://127.0.0.1:8080',
        suburl: '/yohotest/recommend',
        mockconfig: {
            timeout: 0
        }
    }, {
        module: 'yohoboy',
        name: '接口11',
        id: 'singlehot',
        type: 'get',
        url: 'http://127.0.0.1:8080',
        suburl: '/yohotest/singlehot',
        mockconfig: {
            timeout: 0
        }
    }, {
        module: 'yohoboy',
        name: '接口12',
        id: 'slidepage',
        type: 'get',
        url: 'http://127.0.0.1:8080',
        suburl: '/yohotest/page',
        mockconfig: {
            timeout: 0
        }
    }]
}