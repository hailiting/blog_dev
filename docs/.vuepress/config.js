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
                children:[
                    '/ECMAScript/one',
                    '/ECMAScript/two',
                    '/ECMAScript/JS基础',
                    '/ECMAScript/Generator',
                    '/ECMAScript/Array对象方法',
                    '/ECMAScript/JS_AES加密',
                ]
            },
            {
                title: 'TypeScript',
                collapsable: true,
                children:[
                    '/TypeScript/TypeScript基础',
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
                    '/工程化/express'
                ]
            },
            {
                title: 'Flutter',
                collapsable: true,
                children: [
                    '/Flutter/开发环境搭建',
                    '/Flutter/Dart基本数据类型',
                    '/Flutter/Dart类Class_继承_多态',
                ]
            },
            {
                title: 'ReactNative',
                collapsable: true,
                children: [
                    '/ReactNative/ke01',
                    '/ReactNative/常见问题',
                    '/ReactNative/RN和h5交互'
                ]
            },
            
        ]

    }
}