<template>
  <div class="hello-bem hello-bem--init">
    <button class="hello-bem__btn">加1 +1</button>
    <button class="hello-bem__btn">减1 -1</button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data () {
    return {
      msg: "Welcome to Your Vue.js App"
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello-bem{
  width: 300px;
  margin: 0 auto;
  border: 1px solid rgb(99, 61, 61);
  border-radius: 20px;
}
.hello-bem__btn{
  background-color: #e89c0c;
  color: #fff;
  border: none;
  padding: 6px 20px;
  font-weight: bold;
  font-size: 14px;
  border-radius: 4px;
}
.hello-bem--init{
  padding: 1em;
}
</style>
