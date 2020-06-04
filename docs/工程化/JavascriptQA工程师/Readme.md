### 测试模块

#### 技术栈  Karma+Webpack+Mocha+Chai+Sion+istanbul-instrumenter-loader
jest无法和karma兼容
~~~
																									-	test/[存放测试用例] - index.test.ts[测试用例]
				|-src/[被测代码与测试代码] - example[单独模块] -|
				|																					- index.js[被测模块]
				|								| - lib/[测试用到的一些库]												
单元测试-| tests/[测试相关] -|- testResult/[生成测试结果]
				|								| - setup.js[测试入口文件]
				|-karma.conf.js[karma相关配置]
~~~
