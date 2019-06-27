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
                    '/计算机服务基础/express'
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
                    '/ECMAScript/two'
                ]
            },
            {
                title: 'TypeScript',
                collapsable: true,
                children:[
                    '/TypeScript/express',
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
                    '/算法与数据结构/one'
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
                title: '前端框架',
                collapsable: true,
                children: [
                    '/前端框架/express',
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
                    '/Flutter/express'
                ]
            },
            {
                title: 'ReactNative',
                collapsable: true,
                children: [
                    '/ReactNative/express'
                ]
            },
            
        ]

    }
}