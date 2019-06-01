const menuList = [
    {
        title: '首页',
        key: '/home',
        icon: 'home',
    },
    {
        title: 'UI',
        key: '/ui',
        icon: 'home',
        children: [
            {
                title: '按钮',
                key: '/ui/buttons',
            },
            {
                title: '弹框',
                key: '/ui/modals',
            },
            {
                title: 'Loading',
                key: '/ui/loadings',
            },
            {
                title: '通知提醒',
                key: '/ui/notification',
            },
            {
                title: '全局Message',
                key: '/ui/messages',
            },
            {
                title: 'Tab页签',
                key: '/ui/tabs',
            },
            {
                title: '图片画廊',
                key: '/ui/gallery',
            },
            {
                title: '轮播图',
                key: '/ui/carousel',
            }
        ]
    },
    {
        title: '表单',
        key: '/form',
        icon: 'form',
        children: [
            {
                title: '登录',
                key: '/form/login',
                icon: 'form',
            },
            {
                title: '注册',
                key: '/form/reg',
                icon: 'home',
            }
        ]
    },
    {
        title: '表格',
        key: '/table',
        icon: 'table',
        children: [
            {
                title: '基础表格',
                key: '/table/basic',
            },
            {
                title: '高级表格',
                key: '/table/high',
            }
        ]
    },
    {
        title: '富文本',
        key: '/rich',
        icon: 'file-markdown',
    },
    {
        title: '城市管理',
        key: '/city',
        icon: 'file-markdown',
    },
    {
        title: '订单管理',
        key: '/order',
        icon: 'fire',
        btnList: [
            {
                title: '订单详情',
                key: 'detail'
            },
            {
                title: '结束订单',
                key: 'finish'
            }
        ]
    },
    {
        title: '员工管理',
        key: '/user',
        icon: 'user'
    },
    {
        title: '车辆地图',
        key: '/bikeMap',
        icon: 'fire',
    },
    {
        title: '图标',
        key: '/charts',
        icon: 'instagram',
        children: [
            {
                title: '柱形图',
                key: '/charts/bar'
            },
            {
                title: '饼图',
                key: '/charts/pie'
            },
            {
                title: '折线图',
                key: '/charts/line'
            },
        ]
    },
    {
        title: '权限设置',
        key: '/permission',
        icon: 'team',
    },
];
export default menuList;