import "./add.css";
const add = {
  init() {
    console.log("🍎init");
    xtag.create(
      "x-add",
      class extends XTagElement {
        constructor() {
          super();
        }
        "::template(true)"() {
          return `<form>
          <div class="form-group">
            <label for="exampleInputNewsTitle">newsTitle</label>
            <input type="text" class="form-control" id="exampleInputNewsTitle" />
          </div>
          <div class="form-group">
            <label for="exampleInputNewsImg">newsImg</label>
            <input type="text" class="form-control" id="exampleInputNewsImg" />
          </div>
          <div class="form-group">
            <label for="exampleInputNewsContent">newsContent</label>
            <input type="text" class="form-control" id="exampleInputNewsContent" />
          </div>
          <button id="add-btn" class="btn btn-default">
            提交
          </button>
        </form>;
        `;
        }
        start() {
          this.update();
          this._interval = setInterval(() => this.update(), 1000);
        }
        update() {
          this.textContent = new Date().toLocaleTimeString();
        }
        "click::event"(e) {
          if (e.target.id === "add-btn") {
            alert("请求数据");
          }
        }
      }
    );
  },
};
export default add;
