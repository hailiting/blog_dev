# React上拉加载和下拉刷新
### 工作遇到问题的解决方法
~~~js
// 1，数据组装
Hlist: {
  raw: [], // 一开始可以不声明， 方便判空
  limit: 10,
  pageNum: 1,
  pageSize: 10,
  totalCount: 0,
  totalPage: 2,
}
//  dispatch store里事件分发
  *getHistoryOrderListV1({ params, callback }, { call, put, select }) {
      const { Hlist } = yield select((state) => state.home);
      const { page = 1, currency = "", size = 10, status = 0, isNew = false } =
        params || {};
      const { data } = yield call(
        fetch.get,
        api.getHistoryOrderList +
        `?page=${page}&size=${size}&currency=${currency}&status=${status}`
      );
      let dataCope =
        page != 1
          ? [...(Hlist.rows || []), ...(data.data || [])]
          : [...(data.data || [])];
      if (callback) callback(true);
      yield put({
        type: "updateState",
        state: {
          Hlist: {
            limit: 10,
            pageNum: page,
            pageSize: 10,
            totalCount: data.count,
            totalPage: Math.ceil(data.count / 10),
            rows: dataCope,
          },
        },
      });
    },
// page里事件绑定

import React from "react";
import { connect } from "react-redux";
import { ListView, PullToRefresh, Icon, ActivityIndicator } from "antd-mobile";
import OrderItem from "@/components/orderItem/history";
import FooterLoading from "@/components/footerLoading";
import NoData from "@/components/noData";
import app from "@/app.config";

import "./index.scss";

@connect(
  ({ home: { Hlist }, loading: { effects } }) => {
    return { Hlist, loading: effects["home/getHistoryOrderListV1"] };
  },
  dispatch => ({
    getHistoryOrderList(params, callback) {
      dispatch({ type: "home/getHistoryOrderListV1", params, callback });
    },
    homeUpdateState(state) {
      dispatch({ type: "home/updateState", state });
    }
  })
)

class History extends React.Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: ds,
      list: [],
      currenct: '',
      upLoading: false,
      pullLoading: false
    }
  }
  componentDidMount() {
    const {
      getHistoryOrderList,
      Hlist: { rows }
    } = this.props;
    if (!rows) {
      getHistoryOrderList({ page: 1 });
    }
  }
  //上拉加载
  onEndReached = (page, lastPage) => {
    console.log({ page, lastPage })
    //当前页小于总页数继续请求下一页数据，否则停止请求数据
    const { getHistoryOrderList, currency } = this.props;
    if (Number(page) < Number(lastPage)) {
      // this.setState({ upLoading: true })
      //接口请求下一页数据,完成后将upLoading设为false
      getHistoryOrderList({ page: page + 1, currency }, (res) => {
        if (res) {
          this.setState({ upLoading: false })
        }
      })
    }
  }
  //下拉刷新
  onRefresh = (e) => {
    this.setState({ pullLoading: true })
    //接口请求第一页数据,完成后将pullLoading设为false
    const { getHistoryOrderList, currency } = this.props;
    getHistoryOrderList({ page: 1, currency }, (res) => {
      if (res) {
        this.setState({ pullLoading: false })
      }
    })
  }
  toDetail = (item) => {
    const { homeUpdateState } = this.props;
    homeUpdateState({
      hisDetail: item
    })
    window.location.href = `#/${app.name}/historyDetail/${item.id}`;
  };
  //获取item进行展示
  renderRow = (item, i) => {
    return (
      <div>
        <OrderItem
          toDetail={() => this.toDetail(item)}
          item={item} />
      </div>
    )
  }
  render() {
    const { dataSource, upLoading, pullLoading } = this.state;
    const { Hlist, loading } = this.props;
    if (loading && Hlist.pageNum == 1 && !Hlist.rows) {
      return <div className="loading">
        <ActivityIndicator text="正在加载" />
      </div>
    }
    return (
      <div className="goodsDetail">
        {
          Hlist && Hlist.rows && Hlist.rows.length ?
            <ListView
              dataSource={dataSource.cloneWithRows(Hlist.rows)}
              renderRow={(rowData, id1, i) => this.renderRow(rowData, i)}
              initialListSize={10}
              pageSize={10}
              renderFooter={() => (<div className="ListView-footer">
                {(Hlist.pageNum < Hlist.totalPage) && !upLoading ? <p>下拉刷新</p> : upLoading ? <Icon type="loading" /> : <p>已加载完毕</p>}
              </div>)}
              onEndReached={() => this.onEndReached(Hlist.pageNum, Hlist.totalPage)}
              onEndReachedThreshold={20}
              useBodyScroll={true}
              pullToRefresh={<PullToRefresh
                refreshing={pullLoading}
                onRefresh={(e) => this.onRefresh()}
              />}
            />
            :
            Hlist && Hlist.rows && !Hlist.rows.length ?
              <NoData /> : null
        }
      </div>
    )
  }
}
export default History;



~~~
## 回到顶部
~~~js
class Home extends Component{
  consrcutor(props){
    super(props);
    this.state = {
      showScroll:  false,
    }
  }
  componentDidMount(){
    window.addEventListener("scroll", this.props.toggleTopShow);
  }
  componentWillUnmount(){
    window.removeEventListener("scroll", this.props.toggleTopShow);
  }
  toggleTopShow = ()=>{
    let showScroll='';
    if(document.documentElement.scrollTop>100){
      showScroll = true;
    } else {
      showScroll = false;
    }
    this.setState({
      showScroll
    })
  }
  handleScrollTop=()=>{
    window.scrollTo(0,0);
  }
  render(){
    return (
      <div>
        {this.state.showScroll?
        <BackTop onClick={this.handleScrollTop}>
          <i className="iconfont ic-backtop">&#xe66a;</i>
        </BackTop>:null}
      </div>
    )
  }
}
~~~
## 上拉加载下一页
页面结构为 banner + nav + content + footer，除content可以滚动，其他都固定，所有scroll绑定到content上
~~~js
class Pool extends PureComponent{
  construstor(props){
    super(props);
    this.state =  {
      PullLoadingTip: "",
    }
    this.isLock=true;
    this.PoolCon = React.createRef();
    this.scrollToBottom =this.scrollToBottom.bind(this);
  }
  componentDidMount(){
    this.ParentCon.current.addEventListener("scroll", this.scrollToBottom);
  }
  componentWillUnmount(){
    this.ParentCon.current.removeEventListener("scroll", this.scrollToBottom)
  }
  scrollToBottom(event){
    event.stopPropagation();
    const parent = event.target;
    let scrolltop = parent.scrollTop; //  content上部滚动出高度
    let height = Zepto(parent).height();  // content的固定高度
    let scrollheight  = this.PoolCon.current.scrollheight;  // content内部高度
    if(scrollheight <=  scrolltop +  height){
      console.log("到低了");
      if(Math.ceil(this.TOTAL/LIMIT)>=this.PAGE+1){
        // 有下一页才 执行可以加载
        this.setState({
          isShowPullLoading: true,
        },()=>{
          if(this.isLock){
            // 请求下一页过程中不在发送请求
            this.getData();
          }
        })
      }
    }
  }
  getData(flag){
    // 发送请求获取下一页数据，成功后isLock为true
    this.isLock = false
  }
  render(){
    return (
      <article 
      onScroll={this.scrollToBottom}
      className="content">
        <section ref={this.PoolCon}>
        /** content列表内容 */
        {
          this.state.isShowPullLoading?<p className="pull-loading">正在加载...</p>:null
        }
        </section>
      </article>
    )
  }
}
~~~
## 移动端上实现上拉加载下一页
插件: iscroll, better-scroll等
移动端一般监听的是touch事件，而不是scroll
* touchstart: 当手触摸屏幕时触发，即使已经有一个手指放在屏幕上也会触发
* touchmove: 当手指在屏幕上滑动的时候连续触发，在这个事件发生期间调用preventDefault()事件可以阻止滚动
* touchend: 当手指从屏幕上离开的时候触发
* touchcancel: 当系统停止跟踪触摸的时候触发
直接在componentDidMount中将touch相关的事件绑定到content
~~~js
// this.PoolCon = React.createRef(); 
// <article className="content" ref={this.ParentCon}>...</article>
componentMount(){
  this.ParentCon.current.addEventListener("touchmove", ()=>this.scrollToBottom(event, 1),{passive: false});
  this.ParentCon.current.addEventListener("touchend", ()=>this.scrollToButtom(event, 2));
}
componentWillUnmount(){
  this.ParentCon.current.removeEventLister("touchmove", ()=>this.scrollToBottom(event, 1));
  this.ParentCon.current.removeEventLister("touchend", ()=> this.scrollToBottom(event, 2));
}

scrollToBottom(event, type) {
  event.stopPropagation();

  const parent = this.ParentCon.current; //event.target;
  let scrolltop = parent.scrollTop;
  let height = Zepto(parent).height();
  let scrollheight = this.PoolCon.current.scrollHeight;

  if (scrollheight <= scrolltop + height) {
    if (Math.ceil(this.TOTAL / LIMIT) >= this.PAGE + 1) {
      if (1 === type) {
        this.setState({
          PullLoadingTip: "释放立即加载..."
        });
      } else if (2 === type) {
        this.setState(
          {
            PullLoadingTip: "正在加载..."
          },
          () => {
            if (this.isLock) {
              this.getData();
            }
          }
        );
      }
    }
  }
}
~~~