var MarkdownIt = require('markdown-it');
var md = new MarkdownIt();
md.use(require('markdown-it-anchor'));
md.use(require('markdown-it-table-of-contents'));
module.exports = {
    title: 'hailiting Blog',
    description: 'hailiting Blog',
    base: '/hai_blog/',
    themeConfig: {
        // 添加导航栏
        // nav:[
        //  {
        //    text:'主页',link:'/',
        //  },
        //  {
        //    text:'note',
        //    items:[
        //        {text:'one',link:'/notes/one'},
        //    {text:'two',link:'/notes/two'}
        //    ]
        //  }
        // ],
        sidebar: [
            '/',
            {
                title: 'JavaScript',
                collapsable: true,
                children:[
                    '/JavaScript/one',
                    '/JavaScript/two'
                ]
            },
            {
                title: 'notes',
                collapsable: true,
                children: [
                    '/notes/one',
                    '/notes/two',
                ]
            }
        ]

    }
}