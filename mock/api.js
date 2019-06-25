// 用mockjs模拟生成数据
var Mock = require('mockjs');

module.exports = () => {
    // 使用 Mock
    var data = Mock.mock({
        'course|227': [
            {
                // 属性 id 是一个自增数，起始值为 1，每次增 1
                'id|+1': 1000,
                courseName: '@ctitle(5,10)',
                autor: '@cname',
                college: '@ctitle(6)',
                'categoryId|1-6': 1
            }
        ],
        'courseCategory|6': [
            {
                "id|+1": 1,
                "pid": -1,
                cName: '@ctitle(4)'
            }
        ],
        // BaseRespoonse
        "base":{
            "code": "0",
            "message": "success",
            "data": {}
        },
        // 权限列表
        "role":{
            "code": "0",
            "message": "success",
            "data": {
                "page": 1,
                "pageSize": 20,
                "totalCount|1-30": 10,
                "result|10-50": [{
                    "id|+1": 1,
                    "roleName": "admin",
                    "createTime": "@datetime('yyyy-MM-dd HH:mm:ss')",
                    "state|0-2": 1,
                    "authorizeTime": "@datetime('yyyy-MM-dd HH:mm:ss')",
                    "authorizeUserName": "@cname"
                }]
            }
        },
        //用户列表
        "user":{
            "code": "0",
            "message": "success",
            "data": {
                "page": 1,
                "pageSize": 20,
                "totalCount|1-30": 10,
                "result|10-50": [{
                    "id|+1": 1,
                    "username": "@cname",
                    "mobile|1300000000-13099999999": 0,
                    "email": "@email",
                    "sex|1-2": 1,
                    "state|0-5": 1,
                    "interest|1-8": 1,
                    "isMarried|0-2": 1,
                    "birthday": "@datetime('yyyy-MM-dd HH:mm:ss')",
                    "address": "@city",
                    "time": "@datetime('yyyy-MM-dd HH:mm:ss')",
                }]
            }
        },
        // 查询订单列表
        "order":{
            "code": "0",
            "message": "success",
            "data": {
                "page": 1,
                "pageSize": 20,
                "totalCount|1-30": 10,
                "result|10-50": [{
                    "id|+1": 1,
                    "orderSn|+1": 1,
                    "bikeSn|+1": 1,
                    "userName": "@cname",
                    "mobile|10000-99999": 10000,
                    "distance|1-100": 1,
                    "totalTime|1-200": 1,
                    "status|1-2": 1,
                    "startTime": "@datetime('yyyy-MM-dd HH:mm:ss')",
                    "endTime": "@datetime('yyyy-MM-dd HH:mm:ss')",
                    "totalFee|0-10": 1,
                    "userPay|0-10": 1,
                    "time": "@now"
                }]
            }
        },
        //查询订单详情
        "orderDetail":{
            "code": "0",
            "message": "success",
            "data": {
                "id|1-10000": 1,
                "mode|1-2": 1,
                "orderSn|1-10000": 1,
                "bikeSn|1-10000": 1,
                "userName": "@cname",
                "mobile|10000-99999": 10000,
                "startLocation": "start",
                "endLocation": "end",
                "distance|1-100000": 1,
                "totalTime|1-200": 1,
                "status|1-2": 1,
                "startTime": "@datetime('yyyy-MM-dd HH:mm:ss')",
                "endTime": "@datetime('yyyy-MM-dd HH:mm:ss')",
                "totalFee|0-10": 1,
                "userPay|0-10": 1,
                "time": "@now"
            }
        },
        //结束订单确认
        "orderFinishorder":{
            "code": "0",
            "message": "success",
            "data": {
                "id|+1": 1,
                "orderSn|+1": 1,
                "bikeSn|+1": 1,
                "time": "@now"
            }
        },
        //结束订单
        "orderStop":{
            "code": "0",
            "message": "success",
            "data": {
                "id|+1": 1,
                "orderSn|+1": 1,
                "bikeSn|+1": 1,
                "userName": "@cname",
                "mobile": 83680,
                "distance|0-100": 73,
                "totalTime|0-100": 87,
                "status|1-2": 1,
                "startTime": "@datetime('yyyy-MM-dd HH:mm:ss')",
                "endTime": "@datetime('yyyy-MM-dd HH:mm:ss')",
                "totalFee|1-100": 4,
                "userPay|1-10": 6,
                "battery|1-10": 0,
                "location|1-100": 1,
                "time": "@now"
            }
        },
        //城市管理:列表
        "city":{
            "code": "0",
            "message": "success",
            "data": {
                "page": 1,
                "pageSize": 20,
                "totalCount|1-30": 10,
                "result|10-50": [{
                    "id|+1": 1,
                    "name": "@city",
                    "mode|1-2": 1,
                    "opMode|1-3": 1,
                    "franchiseeName": "@cname",
                    "cityAdmins|1-3": [{
                        "userName": "@cname"
                    }],
                    "openTime": "@datetime('yyyy-MM-dd HH:mm:ss')",
                    "updateTime": "@datetime('yyyy-MM-dd HH:mm:ss')",
                    "sysUserName": "@cname",
                    "time": "@now"
                }]
            }
        },
        //获取用户列表
        "table":{
            "code": '0',
            "message": 'success',
            "data": {
                "page": 1,
                "pageSize": 20,
                "totalCount|50-100": 10,
                "result|50-100": [{
                    "id|+1": 1,
                    "userName": '@cname',
                    "sex|1-3": 1,
                    "state|1-6": 1,
                    "interest|1-9": 1,
                    "birthday": "@date(yyyy-MM-dd)",
                    "address": "@county(true)",
                    "time": "@datetime",
                }]
            }
        }
    });
    // 返回的data会作为json-server的数据
    return data;
};