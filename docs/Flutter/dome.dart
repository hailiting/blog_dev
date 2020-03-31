import 'dart:math' show Random;
void main(){
  print(123);
  new Die(n:12).addFn();
}
class Die{
  int siders, value;
  static Random shaker = new Random();
  Die({int n:6}){
    if(n>=6){
      siders ++;
    }
  }
  int addFn(){
    return shaker.nextInt(siders);
  }
}