# scwang Refresh

```java
// init
mSwipeRefreshLayout = rootView.findViewById(R.id.refresh_layout);
mSwipeRefreshLayout.setRefreshHeader(new ClassicsHeader(mContext));
mSwipeRefreshLayout.setRefreshFooter(new ClassicsFooter(mContext));
mSwipeRefreshLayout.setOnRefreshListener(new OnRefreshListener() {
    @Override
    public void onRefresh(@NonNull RefreshLayout refreshLayout) {
        refreshLayout.finishRefresh(2000/*,false*/); // 传入false表示刷新失败
    }
});
mSwipeRefreshLayout.setOnLoadMoreListener(new OnLoadMoreListener() {
    @Override
    public void onLoadMore(@NonNull RefreshLayout refreshLayout) {
        refreshLayout.finishLoadMore(2000/*, false*/); // 传入false表示加载上班
    }
});
// 在此处设置刷新状态为正在刷新
mSwipeRefreshLayout.autoRefresh();
// 在刷新完成后调用此方法，结束刷新状态
mSwipeRefreshLayout.finishRefresh();
```
