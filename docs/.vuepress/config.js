var MarkdownIt = require('markdown-it');
var md = new MarkdownIt();
md.use(require('markdown-it-anchor'));
md.use(require('markdown-it-table-of-contents'));
module.exports = {
    title: 'hailiting Blog',
    description: 'hailiting Blog',
    base: '/hai_blog/',
    themeConfig: {
        sidebar: [
            '/',
            {
                title: '计算机服务基础',
                collapsable: true,
                children: [
                    '/计算机服务基础/nginx下载_安装_部署'
                ]
            },
            {
                title: 'HTML',
                collapsable: true,
                children: [
                    '/HTML/express'
                ]
            },
            {
                title: 'CSS',
                collapsable: true,
                children: [
                    '/CSS/express'
                ]
            },
            {
                title: 'ECMAScript',
                collapsable: true,
                children: [
                    '/ECMAScript/JS从原型到原型链',
                    '/ECMAScript/JS理论基础（1）',
                    '/ECMAScript/JS_api(一)',
                    '/ECMAScript/JS基础',
                    '/ECMAScript/Generator',
                    '/ECMAScript/Array对象方法',
                    '/ECMAScript/JS_AES加密',
                    '/ECMAScript/JS图片压缩'
                ]
            },
            {
                title: 'TypeScript',
                collapsable: true,
                children: [
                    '/TypeScript/TypeScript基础',
                    '/TypeScript/枚举Enum',
                    '/TypeScript/JavaScriptCookie不同子域名之间的共享',
                    
                ]
            },
            {
                title: 'NodeJS',
                collapsable: true,
                children: [
                    '/NodeJS/nodejs',
                    '/NodeJS/express',
                ]
            },
            {
                title: '算法与数据结构',
                collapsable: true,
                children: [
                    '/算法与数据结构/one',
                    '/算法与数据结构/js基础算法题'
                ]
            },
            {
                title: '浏览器',
                collapsable: true,
                children: [
                    '/浏览器/express'
                ]
            },
            {
                title: 'React',
                collapsable: true,
                children: [
                    '/React/UmiJS_路由',
                    '/React/React_Hooks使用详解'
                ]
            },
            {
                title: '小程序',
                collapsable: true,
                children: [
                    '/Wechat/express'
                ]
            },
            {
                title: '微信公众号',
                collapsable: true,
                children: [
                    '/微信公众号/express'
                ]
            },
            {
                title: '工程化',
                collapsable: true,
                children: [
                    '/工程化/Mac中git_ssh配置'
                ]
            },
            {
                title: 'Flutter',
                collapsable: true,
                children: [
                    '/Flutter/Flutter基础知识十讲',
                    '/Flutter/开发环境搭建',
                    '/Flutter/Dart基础_基本数据类型',
                    '/Flutter/Dart基础_泛型',
                    '/Flutter/Dart基础_Mixin',
                    '/Flutter/Dart基础_变量',
                    '/Flutter/Dart基础_最佳实践',
                    '/Flutter/Dart类Class_继承_多态(一)',
                    '/Flutter/Dart类Class_继承_多态(二)',
                    '/Flutter/Dart基础_抽象类和抽象方法_接口',
                    '/Flutter/Flutter基础_生命周期',
                    '/Flutter/Flutter基础_GestureDestector',
                    '/Flutter/Flutter加载本地图片',
                    '/Flutter/Dart基础_异常处理',
                ]
            },
            {
                title: 'ReactNative',
                collapsable: true,
                children: [
                    '/ReactNative/ke01',
                    '/ReactNative/常见问题',
                    '/ReactNative/RN和h5交互',
                    '/ReactNative/键盘挡住输入框问题',
                ]
            },

        ]

    }
}