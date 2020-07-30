const utils = {
  genSidebar: function (title, children = [''], collapsable = true, sidebarDepth = 2) {
    console.log({ children })
    const obj = {
      title: title,
      children: children.map(v => `/${title}/${v}`),
      collapsable: collapsable,
      sidebarDepth: sidebarDepth
    }
    return obj;
  }
};

module.exports = utils;