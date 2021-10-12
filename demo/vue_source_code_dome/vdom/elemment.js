class Element {
  constructor(tagName, attrs, children) {
    this.tagName = tagName;
    this.attrs = attrs;
    this.children = children || [];
  }
  render() {
    const parant = document.createElement(this.tagName);
    for (let attr in this.attrs) {
      if (attr === "class") {
        parant.className = this.attrs[attr];
      }
    }
    this.children.forEach((child) => {
      let childEle =
        child instanceof Element
          ? child.render()
          : document.createTextNode(child);
      for (let attr in child.attrs) {
        if (attr === "class") {
          parant.className = child.attrs[attr];
        }
      }
      parant.appendChild(childEle);
    });
    return parant;
  }
}
function createElement(tagName, attrs, children) {
  return new Element(tagName, attrs, children);
}
