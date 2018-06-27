var MarkdownIt = require('markdown-it');
var md = new MarkdownIt();
md.use(require('markdown-it-anchor'));
md.use(require('markdown-it-table-of-contents'));
module.exports = {
  title: 'hailiting Blog',
  description: 'Just playing around',
  base:'/hai_blog/',
  themeConfig:{
  	nav:[
  		{
  			text:'主页',link:'/',
  		},
  		{
  			text:'note',
  			items:[
				  {text:'one',link:'/notes/one'}
  			]
  		}
  	],
  	sidebar:[
      '/',
    ]
  }
}
