# 枚举(Enum)
取值被限定到一定范围
~~~javascript
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};

console.log(Days["Sun"] === 0); // true
console.log(Days[2] === "Tue"); // true


// 会被编译为
var Days;
(function(Days){
    Days[Days["Sun"] = 0] = "Sun";
    Days[Days["Mon"] = 1] = "Mon";
    Days[Days["Tue"] = 3] = "Tue";
    ...
})(Days || (Days = {}))
~~~

用例
~~~javascript
enum apiList {
    'getCurrentUserInfo' = 'getCurrentUserInfo',
    'getSubscriptionSynthesize' = 'getSubscriptionSynthesize',
}
export type MyApi = {[key in apiList]:()=any};
const myApi: MyApi = {} as MyApi;
Object.keys(apiList).forEach((api)=>{
    myApi[api] = async ()=>{
        return request.get(`/my/${api}`);
    };
});
export default myApi;
~~~
