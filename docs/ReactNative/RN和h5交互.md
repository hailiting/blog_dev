# RN和h5交互
react-native-webview
~~~
yarn add react-native-webview
react-native link react-native-webview
~~~
## WebView的基本属性方法介绍和使用
### 主要属性介绍
* source: 在 WebView中载入一段静态的html代码或是传入一个url（可以附带一些header选项）；
* automaticallyAdjustContentInsets: 设置是否自动调整内容，默认值为true；
* contrntInset: 设置内容所占尺寸大小，格式：{top:number,left:number,bottom:number,right:number}；
* injectedJavaScript(string): 当网页加载之前注入一段js代码，其值为字符串形式；
* startInLoadingState: 是否开启页面加载的状态，值为true或false；
* bounces: 回弹特性。默认为true，如果设置为false，则内容拉到底部或头部都不回弹。
* scalesPageToFit: 设置网页是否缩放自适应到整个屏幕视图，以及用户是否可以改变缩放页面；
* scrollEnaled: 用于设置是否开启页面滚动；
* domStorageEnable: 用于控制是否开启DOM Storage(存储);
* javaScriptEnabled: 是否开启JavaScript,在ios中默认是开启的；
### 主要方法介绍
* onNavigationStateChange: 当导航状态变化的时候调用；
* onLoadStart: 当网页开始加载时调用；
* onError: 当网页加载失败时调用；
* onLoad: 当网页加载结束时调用；
* onLoadEnd: 当页面加载结束时调用，不管成功还是失败；
* renderLoading: WebView组件正在渲染页面时触发的函数，只有startInLoadingState为true时，函数才起作用；
* renderError: 监听渲染页面出错的函数；
* onShouldStartLoadWithRequest: 该方法容许拦截WebView加载的URL地址，进行自定义处理，该方法通过返回true或false来决定是否继续加载该拦截到的请求；
* onMessage: 在WebView内部网页中，调用window.postMessage可以触发此属性对应的函数， 通过event.nativeEvent.data获取接收到的数据，实现网页和RN之间的数据传递；
* injectJavaScript(function): 函数接受一个字符串，该字符串将传递给WebView，并立即 执行为JavaScript;
#### 通过url加载一个页面
~~~
render(){
	return(
		<View style={styles.container}>
			<WebView 
				ref={webView=>this.webView=webView}
				startInLoadingState={true}
				onNavigationStateChange={e=>this.onNavigationStateChange(e)}
				source={{uri:'https://github.com/xxx'}}
			/>			
		</View>
	)
}
~~~
#### 通过HTML加载一个页面
~~~
render(){
	return (
		<View>
			<WebView 
				ref={webView=>this.webView=webView}
				startInLoadingState={true}
				onNavigationStateChange={e=>this.onNavigationStateChange(e)}
				source={{html:'<h1>Dome</h1>'}}
			/>
		</View>
	)
}
~~~
## RN  WebView和H5之间的通信
### RN WebView 向H5页面注入JS
* 通过injectedJavaScript的方式注入JS，在H5页面加载后立即执行。（WebView主动触发H5的方法，从而实现通信）
#### RN向H5发送消息，h5监听
WebView绑定ref，通过html5新增的postMessage发送消息
~~~
onLoadEnd={()=>{
	this.refs.webView.postMessage('RN向H5发送消息');
}} // 页面加载结束调用
~~~
在H5中注册监听
~~~
window.onload = function(){
	document.addEventListener('message', function(msg){
		console.log(msg)
		message = msg.data
	})
}
~~~
#### h5向RN发消息，RN通过onMessage接收消息
~~~
onMessage={(event)=>{console.log(event.nativeEvent.data);}} // data只能是字符串

// h5 
window.postMessage('网页向RN发送消息');
~~~
#### webView js注入 h5
~~~
//  H5
<!-- 页面点击通信 -->
export const invokeMethod = (type='',params = {}, callback)=>{
	if(!window.APP) return false;
	return window.APP.invokeClientMethod(type, params, callback);
}
<!-- 页面加载通信 -->
window.initDataFromApp = function(data){
	// 访问到store
	// window.g_app._store
	// 访问到 dispatch
	window.g_app._store.dispatch({type:  'user/init',  data})
}
(兼容 浏览器cookie)
if(!window.navigator.userAgent.includes('App')){
	const token = cookie.load('JWT');
	if(token){
		window.initDataFromApp({token: token})
	}
}
//  WebView
function clientMethod(){
	var APP =  {
		__GLOVAL_FUNC_INDEX__: 0,
		invokeClientMethod: function(type,params, callback){
			var name;
			if(callback){
				if(typeof callback ===  'function'){
					name= APP.createGlobalFuncForCallback(callback);
				} else{
					name=callback;
				}
			}
			window.ReactNativeWebView.postMessage(JSON.stringify({type,params,callback:name}))
		},
		createGlobalFuncForCallback:  function(callback){
			if(callback){
				var callbackName = '__GLOBAL_CALLBACK__'+(ZGAPP.__GLOBAL_FUNC_INDEX__++);
				window[callbackName] =  callback;
				return callbackName;
			}
			return  null;
		},
		invokeWebMethod: function(callback, args){
			if(callback && typeof  callback==='string'){
				var func  = void 0;
				if((func == window[callback])&& typeof func === 'function'){
					setTimeout(function(){
						func.call(this, args);
					},0)
				}
			}
		}
	}
	window.APP = APP;
	window.webviewCallback = function(data){
		window.APP['invokeWebMethod'](data.callback, data.args);
	};
};
const patchPostMessageJsCode =  `(${String(clientMethod)})()`;
const data = {
	'token': token.jwt,
	'platform':  Platform.OS,
}
const injectedJavaScript = `
	${patchPostMessageJsCode}
	initDataFromApp && initDataFromApp(${JSON.stringify(data)});
`
onMessage=(event)=>{
	var  data =  JSON.parse(event.nativeEvent.data);
	if(!data){
		return;
	}
	const {type,params, callback} = data;
	switch(type){
		case 'xxx':
		...
		break;
		...
	}
}
...
<WebView
	onMessage =  {this.onMessage}
	ref={r=>(this.webref =  r)}
	injectedJavaScript =  {injectedJavaScript}
	source= {{...}}
/>
...
~~~

