# Android 网络请求

- HttpURLConnection
- OkHttp
- Volley
- Retrofit
- HttpClient

## HttpURLConnection

```java
URL url = new URL("https://api.example.com/data");
HttpURLConnection conn = (HttpURLConnection) url.openConnection();
int responseCode = conn.getResponseCode();
if(responseCode == HttpURLConnection.HTTP_OK) {
  InputStream inputStream = conn.getInputStream();
  // ...
}
```

## OkHttp

- CommonRequest => 生成 Request 对象
- CommonOkHttpClient => 生成 GET POST 等方法
- CommonResponse
  - JsonResponse json 响应类型
  - FileResponse 下载

```java
OkHttpClient client = new OkHttpClient();
Request request = new Request.Builder()
  .url("https://api.example.com/data")
  .build();
// enqueue 异步
// execute 同步
client.newCall(request).enqueue(new Callback() {
  @Override
  public void onResponse(Call call, Response response) throws IOException {
    if(response.isSuccessful()){
      String responseData = response.body().string();
      //...
    }
  }
  @Override
  public void onFailure(Call call, IOException e){
    // 请求失败
  }
})
```

## Volley

```java
RequestQueue queue = Volley.newRequestQueue(context);
String url = "https://api.example.com/data";

StringRequest request = new StringRequest(Request.Method.GET, url,
        new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                // 处理响应数据
                // ...
            }
        },
        new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                // 处理请求失败
                // ...
            }
        });

queue.add(request);
```

## Retrofit

```java
// 定义一个接口描述 api
public interface ApiService {
  @GET("/data")
  Call<Data> getData();
}

// 使用Retrofit创建网络请求对象并发送请求
Retrofit retrofit = new Retrofit.Builder()
        .baseUrl("https://api.example.com")
        .build();

ApiService apiService = retrofit.create(ApiService.class);
Call<Data> call = apiService.getData();

call.enqueue(new Callback<Data>() {
  @Override
  public void onResponse(Call<Data> call, Response<Data> response) {
      if (response.isSuccessful()) {
          Data data = response.body();
          // 处理响应数据
          // ...
      }
  }

  @Override
  public void onFailure(Call<Data> call, Throwable t) {
      // 处理请求失败
      // ...
  }
});
```
