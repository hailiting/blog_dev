function test(argument) {
  this.a = 1;
}
test.prototype.mathod_name = function(first_argument) {
  console.log(this.a);
};
