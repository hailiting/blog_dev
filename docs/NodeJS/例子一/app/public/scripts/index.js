let val = 0;
const id = 2;
function getThumb() {
  // http://192.168.64.2/week02/php/?id=${id}
  fetch(`/index/update`, {
    method: 'GET',
  })
    .then((res) => {
      return res.json();
    })
    .then(myres => {
      const { data } = myres;
      console.log({ data })
      val = +data
      ThumbUpNumber.innerHTML = data;
    })
    .catch(error => {
      console.log({ error })
    })
}
window.onload = getThumb()
const BtnThumbUp = document.getElementById("BtnThumbUp");
const ThumbUpNumber = document.getElementById("ThumbUpNumber");
// 稀释
/**
 * var f='';
 * if(f){
 *  clearTimeout(f)
 * }
 * f=setTimeout(function(){}, 0);
 */
BtnThumbUp.addEventListener("click", () => {
  fetch("http://192.168.64.2/week02/php/", {
    method: 'PUT',
    body: JSON.stringify({
      id: id,
      val: add(val),
    })
  })
    .then((res) => {
      return res.json();
    })
    .then(myres => {
      getThumb()
    })
    .catch(error => {
      console.log({ error })
    })
})

function add(val) {
  return +val + 1
}