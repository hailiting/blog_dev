# AnimationController 源码学习

```dart
// 实现了三个Mixin,分别是 Eager, local, localStatus
class AnimationController extends Animation<double> with AnimationEagerListenerMixin, AnimationLocalListenersMixin, AnimationLocalStatusListenersMixin {
  // value就是当前动画的值
  // duration 持续时间
  // debuglabel   识别该动画的一个标签
  // lowerBound 和 upperBound   动画的最大值和最小值
  // vsync  可以理解为提供玩这个动画的门票
}
```
