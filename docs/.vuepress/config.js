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