class PraiseButton {
  constructor(num) {
    this.num = num
  }
  Like() {
    return +this.num + 1;
  }
}


const myThumb = document.getElementById("myThumb");
const myLikeVal = document.getElementById("myLikeVal");


myThumb.addEventListener("click", function () {
  const val = myLikeVal.innerHTML;
  const myThumbBtn = new PraiseButton(val);
  myLikeVal.innerHTML = myThumbBtn.Like();
})