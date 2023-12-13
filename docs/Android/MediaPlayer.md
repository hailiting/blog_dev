# MediaPlayer

当涉及到 Android 应用程序中播放音频和视频时，MediaPlayer 类是一个常用的工具类。
他提供了一组方法来管理媒体资源的播放、暂停、停止、跳转等操作。

## 创建和初始化

- 创建 MediaPlayer 对象：可以使用`new MediaPlayer()`语句创建一个新的 MediaPlayer 对象
- 设置数据源：使用 `setDataSource()`方法指定要播放的音频或视频文件路径或 URL
- 准备媒体资源：调用`prepare()`或`prepareAsync()`方法来准备媒体资源。`prepare()`是同步方法，在准备完成前会阻塞线程，而`prepareAsync()`是异步方法，可以在准备过程中继续执行其他操作

## 播放控制

- 开始播放：`start()`
- 暂停和继续：使用`pause()`暂停，使用`start()`恢复播放
- 停止播放：使用`stop()`停止播放，并将 MediaPlayer 重置到初始状态

## 监听器

- 设置准备监听器： `setOnPreparedListener()`,在媒体资源准备完成后执行相关操作
- 设置错误监听器：`setOnErrorListener()`, 以捕获和处理播放过程中的错误和异常
- 设置完成监听器：`setOnCompletionListener()`，在媒体播放完成时执行响应操作

## 跳转和进度控制

- 跳转到指定位置：`seekTo()`将播放器跳转到指定的时间位置
- 获取当前播放位置：`getCurrentPosition()`获取当前播放时间位置
- 获取媒体总时长: `getDuration()`获取媒体资源的总时长

## 释放资源

- 使用`release()`释放 MediaPlayer 对象所占用的资源，包括音频或视频和相关的系统资源

**如果需要复杂的需求，如流媒体播放、音频焦点管理等，可能需要更高级的媒体框架，如 ExoPlayer**
