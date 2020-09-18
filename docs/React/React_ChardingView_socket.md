# React_ChardingView_socket

中文文档地址 https://b.aitrade.ga/books/tradingview/

## 文件结构

```
src
  |- service
  |     |- socket.js    // 链接ws，ws监听 推送 取消订阅 更新最新ticker 等的方法
  |- root.component.js  // 引用socket
  |- pages
  |    |-kLine
  |        |-index.js   // socket 订阅历史
```

## 常见问题

```
// 设置图标价格精度
const e = chart.priceFormatter();
e.format = (v) => new bigNumber(v).toFixed(1, 1);
```

## 方法一： npm trader-view

```
import {TradingView, Datafeed } from "trader-view";
```

### TradingView 初始化图标

```
// params ={symbol, resolution, from, to, firstDataRequest}
// list为数组 ep: [ {time,close,high,low,open,volume} ... ]
   initDatafeed() {
    const { symbol } = this.props;

    this.datafeed = new Datafeed({
      history: (params) => {
        return this.getHistData(
          params.symbol,
          params.resolution,
          params.from,
          params.to,
          params.firstDataRequest
        );
      },
      time: () => new Promise((resolve) => resolve(1)),
      config: () =>
        new Promise((resolve) =>
          resolve({
            supports_search: true,
            supports_group_request: false,
            supported_resolutions: [
              ...new Set(periods.map((item) => item.interval)),
            ],
            supports_marks: false,
            supports_timescale_marks: false,
            supports_time: true,
          })
        ),
      symbols: () =>
        new Promise((resolve) => resolve(createSymbolInfo(symbol))),
    });

    this.datafeed.subscribeBars = (
      symbolInfo,
      resolution,
      onRealtimeCallback,
      subscribeUID,
      onResetCacheNeededCallback
    ) => {
      this.onRealtimeCallback = onRealtimeCallback;
      this.onResetCacheNeededCallback = onResetCacheNeededCallback;
    };
    /**
     * 解析商品信息
     */
    this.datafeed.resolveSymbol = (symbol, onResolve, onError) => {
      onResolve(createSymbolInfo(symbol));
    };
    this.datafeed.getBars = (
      symbolInfo,
      resolution,
      from,
      to,
      onHistoryCallback,
      onErrorCallback,
      firstDataRequest
    ) => {
      this.onHistoryCallback = onHistoryCallback;
      this.from = from;
      this.to = to;
      const { symbol, currentPeriod } = this.props;
      const { period, interval, count } = periods[currentPeriod];
      socket.subscribe("subHis", symbol, period, from);
      // this.initWebSocket().then((res) => {
      //   res.onopen = () => {
      //     const { symbol, currentPeriod } = this.props;
      //     const { period, interval, count } = periods[currentPeriod];
      //     if (res) {
      //       res.send(
      //         subscribe.subHis(
      //           symbol,
      //           period,
      //           from,
      //           Math.ceil((to - from) / 60 / count)
      //         )
      //       );
      //     }
      //   };
      // });
    };
  }
```

```
this.widget = new TradingView({
  // debug: true,
  // fullscreen: true,
  custom_css_url: host + "charting_library/static/chardingView.css", // 自定义tradingview样式
  symbol: "BTC", // 商品名
  interval: "D", // 周期  1s 1m 1h 1W 1M 1Y ....
  preset: "mobile",
  container_id: "tv_chart_container",
  // datafeed JavaScript对象的实现接口，以反馈数据显示在图表上 必须项
  datafeed: this.datafeed,
  height: "100%",
  width: "100%",
  library_path: host+"charting_library/",
  locale: "zh",
  loading_screen:{
    backgroundColor: "#fff",
    foregroundColor: "#fff",
  },
  // 禁用自带的一些功能
  disabled_features: [
    "left_toolbar",
    "volume_force_overlay",
    "create_volume_indicator_by_default",
    "create_volume_indicator_by_default_once",
    "format_button_in_legend",
    "hide_left_toolbar_by_default",
    "go_to_date",
    "use_localstorage_for_settings",
    "save_chart_properties_to_local_storage",
    "main_series_scale_menu",
    "show_logo_on_all_charts" // 在多图表布局的每个图表上显示微标
    "header_settings",
    "timeframes_toolbar",
    "chart_property_page_background",
    "compare_symbol",
    "go_to_date",
    "header_chart_type",
    "header_compare",
    "header_interval_dialog_button",
    "header_screenshot",
    "header_symbol_search", // 头部搜索
    "header_widget_dom_node", // 隐藏头部组件
    "source_selection_markers", // 禁用系列和指示器的选择标记
    "header_indicators", // 图标指标
    "adaptive_logo", // 移动端隐藏logo
    "header_undo_redo", // 撤销返回
    "show_hide_button_in_legend",
    "show_interval_dialog_on_key_press",
    "snapshot_trading_drawings",
    "symbol_info",
    "border_around_the_chart",
    "remove_library_container_border",
    "header_saveload",
    "header_resolutions",
  ],
  overrides: getOverrides("white"),
  studies_overrides: {
    "volume.volume.color.0": "#eb4d5c",
    "volume.valume.color.1": "#53b987",
    "volume.volume.transparency": 70,
    "volume.options.showStudyArguments": !1,
    "MA Cross.short:plot.color": "#6b3798",
    "MA Cross.long:plot.color": "#708957",
  },
  enabled_features: ["hide_last_na_study_output"],
  charts_storage_url: "http://saveload.tradingview.com",
  charts_storage_api_version:"1.1",
  client_id: "tradingview.com",
  user_id:"public_user_id",
  theme: "Light",
  timezone: "Asia/Shannghai"
});
this.widget.onChartReady(()=>{
  const chart = this.widget.chart();
  chart.setResolution(inte, ()=>{});
  chart.setChartType(chartType);
  // 每当十字线位置改变时，图标库将会调用回调函数
  chart.crossHairMoved(({time})=>{
    if(!time){
      return;
    }
  })
})
```

```
export const getOverrides = (theme) => {
  const themes = {
    white: {
      up: "#1dc6ac",
      down: "#e8506c",
      bg: "rgba(255, 255, 255, 0)",
      grid: "#EDF1F7",
      cross: "#CAD1E7",
      border: "#EDF1F7",
      text: "#CAD1E7",
      areatop: "rgba(71, 78, 112, 0.1)",
      areadown: "rgba(71, 78, 112, 0.02)",
      line: "#EDF1F7",
    },
    black: {
      //url: "night.css",
      up: "#589065",
      down: "#ae4e54",
      bg: "#181B2A",
      grid: "#1f2943",
      cross: "#9194A3",
      border: "#4e5b85",
      text: "#61688A",
      areatop: "rgba(122, 152, 247, .1)",
      areadown: "rgba(122, 152, 247, .02)",
      line: "#737375",
    },
    mobile: {
      //url: "mobile.css",
      up: "#03C087",
      down: "#E76D42",
      bg: "#ffffff",
      grid: "#f7f8fa",
      cross: "#23283D",
      border: "#C5CFD5",
      text: "#8C9FAD",
      areatop: "rgba(71, 78, 112, 0.1)",
      areadown: "rgba(71, 78, 112, 0.02)",
      showLegend: !0,
    },
  };
  const t = themes[theme];
  return {
    volumePaneSize: "medium",
    "scalesProperties.lineColor": t.text,
    "scalesProperties.textColor": t.text,
    "paneProperties.background": t.bg,
    "paneProperties.vertGridProperties.color": t.grid,
    "paneProperties.horzGridProperties.color": t.grid,
    "paneProperties.crossHairProperties.color": t.cross,
    "paneProperties.legendProperties.showLegend": !!t.showLegend,
    "paneProperties.legendProperties.showStudyArguments": !0,
    "paneProperties.legendProperties.showStudyTitles": !0,
    "paneProperties.legendProperties.showStudyValues": !0,
    "paneProperties.legendProperties.showSeriesTitle": !0,
    "paneProperties.legendProperties.showSeriesOHLC": !0,
    "mainSeriesProperties.candleStyle.upColor": t.up,
    "mainSeriesProperties.candleStyle.downColor": t.down,
    "mainSeriesProperties.candleStyle.drawWick": !0,
    "mainSeriesProperties.candleStyle.drawBorder": !0,
    "mainSeriesProperties.candleStyle.borderColor": t.border,
    "mainSeriesProperties.candleStyle.borderUpColor": t.up,
    "mainSeriesProperties.candleStyle.borderDownColor": t.down,
    "mainSeriesProperties.candleStyle.wickUpColor": t.up,
    "mainSeriesProperties.candleStyle.wickDownColor": t.down,
    "mainSeriesProperties.candleStyle.barColorsOnPrevClose": !1,
    "mainSeriesProperties.hollowCandleStyle.upColor": t.up,
    "mainSeriesProperties.hollowCandleStyle.downColor": t.down,
    "mainSeriesProperties.hollowCandleStyle.drawWick": !0,
    "mainSeriesProperties.hollowCandleStyle.drawBorder": !0,
    "mainSeriesProperties.hollowCandleStyle.borderColor": t.border,
    "mainSeriesProperties.hollowCandleStyle.borderUpColor": t.up,
    "mainSeriesProperties.hollowCandleStyle.borderDownColor": t.down,
    "mainSeriesProperties.hollowCandleStyle.wickColor": t.line,
    "mainSeriesProperties.haStyle.upColor": t.up,
    "mainSeriesProperties.haStyle.downColor": t.down,
    "mainSeriesProperties.haStyle.drawWick": !0,
    "mainSeriesProperties.haStyle.drawBorder": !0,
    "mainSeriesProperties.haStyle.borderColor": t.border,
    "mainSeriesProperties.haStyle.borderUpColor": t.up,
    "mainSeriesProperties.haStyle.borderDownColor": t.down,
    "mainSeriesProperties.haStyle.wickColor": t.border,
    "mainSeriesProperties.haStyle.barColorsOnPrevClose": !1,
    "mainSeriesProperties.barStyle.upColor": t.up,
    "mainSeriesProperties.barStyle.downColor": t.down,
    "mainSeriesProperties.barStyle.barColorsOnPrevClose": !1,
    "mainSeriesProperties.barStyle.dontDrawOpen": !1,
    "mainSeriesProperties.lineStyle.color": t.border,
    "mainSeriesProperties.lineStyle.linewidth": 1,
    "mainSeriesProperties.lineStyle.priceSource": "close",
    "mainSeriesProperties.areaStyle.color1": t.areatop,
    "mainSeriesProperties.areaStyle.color2": t.areadown,
    "mainSeriesProperties.areaStyle.linecolor": t.border,
    "mainSeriesProperties.areaStyle.linewidth": 1,
    "mainSeriesProperties.areaStyle.priceSource": "close",
  };
};
```

#### 设置图表背景

```
// chardingView.css
table.chart-markup-table {
  background-color: #fafafd;
  background: url("./images/logo.png") #fafafd no-repeat center center;
  background-size: 251px 51px;
}
```

```
export const resolveSymbol = ({
  Sec: t,
  PrzClose: c,
  PrzHigh: h,
  PrzLow: l,
  PrzOpen: o,
  Volume: v,
}) => ({
  time: t * 1000,
  close: toNumber(c),
  high: toNumber(h),
  low: toNumber(l),
  open: toNumber(o),
  volume: toNumber(v),
});

```

```
export const createSymbolInfo =(symbol)=>({
  name: symbol,
  full_name: symbol,
  description: symbol,
  ticker: symbol,
  session: "24x7",
  exchange: "",
  listed_exchange: "",
  timezone: "Asia/Shanghai",
  format: "price",
  pricescale: 100,
  minmov: 1,
  minmov2: 2,
  has_intraday: true,
  has_no_valume: false,
  has_daily: true,
  has_weekly_and_monthly: true,
  has_empty_bars: true,
  supported_resolutions: periods.map((item)=> item.interval),
  intraday_multipliers: periods.map((item)=> item.interval),
})
```

```
export const getOverrides = (theme) => {
  const themes = {
    white: {
      //url: "day.css",
      up: "#03c087",
      down: "#ef5555",
      bg: "rgba(0, 0, 0, 0)",
      grid: "#EDF1F7",
      cross: "#CAD1E7",
      border: "#EDF1F7",
      text: "#CAD1E7",
      areatop: "rgba(71, 78, 112, 0.1)",
      areadown: "rgba(71, 78, 112, 0.02)",
      line: "#EDF1F7",
    },
    black: {
      //url: "night.css",
      up: "#589065",
      down: "#ae4e54",
      bg: "#181B2A",
      grid: "#1f2943",
      cross: "#9194A3",
      border: "#4e5b85",
      text: "#61688A",
      areatop: "rgba(122, 152, 247, .1)",
      areadown: "rgba(122, 152, 247, .02)",
      line: "#737375",
    },
    mobile: {
      //url: "mobile.css",
      up: "#03C087",
      down: "#E76D42",
      bg: "#ffffff",
      grid: "#f7f8fa",
      cross: "#23283D",
      border: "#C5CFD5",
      text: "#8C9FAD",
      areatop: "rgba(71, 78, 112, 0.1)",
      areadown: "rgba(71, 78, 112, 0.02)",
      showLegend: !0,
    },
  };
  const t = themes[theme];
  return {
    volumePaneSize: "medium",
    "scalesProperties.lineColor": t.text,
    "scalesProperties.textColor": t.text,
    "paneProperties.background": t.bg,
    "paneProperties.vertGridProperties.color": t.grid,
    "paneProperties.horzGridProperties.color": t.grid,
    "paneProperties.crossHairProperties.color": t.cross,
    "paneProperties.legendProperties.showLegend": !!t.showLegend,
    "paneProperties.legendProperties.showStudyArguments": !0,
    "paneProperties.legendProperties.showStudyTitles": !0,
    "paneProperties.legendProperties.showStudyValues": !0,
    "paneProperties.legendProperties.showSeriesTitle": !0,
    "paneProperties.legendProperties.showSeriesOHLC": !0,
    "mainSeriesProperties.candleStyle.upColor": t.up,
    "mainSeriesProperties.candleStyle.downColor": t.down,
    "mainSeriesProperties.candleStyle.drawWick": !0,
    "mainSeriesProperties.candleStyle.drawBorder": !0,
    "mainSeriesProperties.candleStyle.borderColor": t.border,
    "mainSeriesProperties.candleStyle.borderUpColor": t.up,
    "mainSeriesProperties.candleStyle.borderDownColor": t.down,
    "mainSeriesProperties.candleStyle.wickUpColor": t.up,
    "mainSeriesProperties.candleStyle.wickDownColor": t.down,
    "mainSeriesProperties.candleStyle.barColorsOnPrevClose": !1,
    "mainSeriesProperties.hollowCandleStyle.upColor": t.up,
    "mainSeriesProperties.hollowCandleStyle.downColor": t.down,
    "mainSeriesProperties.hollowCandleStyle.drawWick": !0,
    "mainSeriesProperties.hollowCandleStyle.drawBorder": !0,
    "mainSeriesProperties.hollowCandleStyle.borderColor": t.border,
    "mainSeriesProperties.hollowCandleStyle.borderUpColor": t.up,
    "mainSeriesProperties.hollowCandleStyle.borderDownColor": t.down,
    "mainSeriesProperties.hollowCandleStyle.wickColor": t.line,
    "mainSeriesProperties.haStyle.upColor": t.up,
    "mainSeriesProperties.haStyle.downColor": t.down,
    "mainSeriesProperties.haStyle.drawWick": !0,
    "mainSeriesProperties.haStyle.drawBorder": !0,
    "mainSeriesProperties.haStyle.borderColor": t.border,
    "mainSeriesProperties.haStyle.borderUpColor": t.up,
    "mainSeriesProperties.haStyle.borderDownColor": t.down,
    "mainSeriesProperties.haStyle.wickColor": t.border,
    "mainSeriesProperties.haStyle.barColorsOnPrevClose": !1,
    "mainSeriesProperties.barStyle.upColor": t.up,
    "mainSeriesProperties.barStyle.downColor": t.down,
    "mainSeriesProperties.barStyle.barColorsOnPrevClose": !1,
    "mainSeriesProperties.barStyle.dontDrawOpen": !1,
    "mainSeriesProperties.lineStyle.color": t.border,
    "mainSeriesProperties.lineStyle.linewidth": 1,
    "mainSeriesProperties.lineStyle.priceSource": "close",
    "mainSeriesProperties.areaStyle.color1": t.areatop,
    "mainSeriesProperties.areaStyle.color2": t.areadown,
    "mainSeriesProperties.areaStyle.linecolor": t.border,
    "mainSeriesProperties.areaStyle.linewidth": 1,
    "mainSeriesProperties.areaStyle.priceSource": "close",
  };
};
```

### websocket 链接获取数据

```
let _cache = {}; // 暂存所有交易对信息
initWebSocket(isFirst = false){
  this.socket = new WebSocket("wss://ss....");
  // 最基础的需要订阅k线数据，最新ticker
  this.socket.onmessage=(e)=>{
    this.onSocketMessage(e.data);
  }
}
onSocketMessage(data){
  try{
    if(!data){
      return;
    }
    if(data === "PONG"){
      return;
    }
    const _data = JSON.parse(data);
    if(_data.subj==="index"){
      if(this.onRealtimeCallback){
        const bars = Object.entries(_cache).sort((a,b)=>a[0]-b[0]);
        // 最后一条数据用最新数据
        const item = bars[bars.length-1];
        if(item){
          const bar = item[1];
          bar.close = _data.data.Prz;
          bar.time = item[0]/1;
          this.onRealtimeCallback(bar);
        }
      }
    } else if(_data.subj === "kline"){
      const bars = resolveSymbol(_data.data);
      _cache[bar.time] = bar;
      _lastBar = {...bar};
      if(this.onRealtimeCallback){
        setTimeout(()=>{
          this.onRealtimeCallback(bar);
        }, 100);
      }
    } else if(_data.data.Count){
      if(this.onHistoryCallback){
        const {
          Sec, PrzOpen, PrzClose, PrzHigh, PrzLow, Volume, Count
        } = _data.data;
        const {symbol, currentPeriod} = this.props;
        const {period, interval} = periods[currentPeriod];
        const list = [];
        for(let i=0;i<Count; i++){
          const bar = {
            time: Sec[i]*1000,
            close: toNumber(PrzClose[i]),
            high: toNumber(PrzHigh[i]),
            low: toNumber(PrzLow[i]),
            open: toNumber(PrzOpen[i]),
            volume: toNumber(Volume[i]),
          }
          list.push(bar);
          _cache[bar.time] = bar;
          if(i===Count-1){
            _lastBar = {...bar};
            console.log("last", bar.time);
          }
        }
        this.onHistoryCallback(list, {
          noData: !list.length,
          nextTime: Sec[Sec.length -1]*1000,
        });
        if(this.socket){
          this.socket.send(subscribe.sub(symbol, period));
        }
      }
    }
  }
}
```

websock 订阅的参数

```
let hisPage = "1";
const subscribe = {
  sub: (symbol, period) =>{
    ++hisPage;
    return JSON.stringify({
      req: "Sub",
      rid: `${hisPage}`,
      args: [
        `kline_${period}_GMEX_CI_${symbol}`,
        `index_GMEX_CI_${symbol}`,
        '__slow__',
      ],
      expires: +new Date(),
    })
  },
  unsub: (symbol, period, all=true){
    ++hisPage;
    return JSON.stringify({
      req: "Unsub",
      rid: `${hisPage}`,
      args: all ? [
          `index_GMEX_CI_${symbol}`,
          `kline_${period}_GMEX_CI_${symbol}`,
          `GMEX_CI_${symbol}`,
        ]
        : [`GMEX_CI_${symbol}`],
      expires: +new Date(),
    });
  },
  subHis: (symbol, period, Sec, Count) => {
    ++hisPage;
    return JSON.stringify({
      req: "GetHistKLine",
      rid: `${hisPage}`,
      args: {
        Sym: `GMEX_CI_${symbol}`,
        Typ: period,
        Sec,
        Offset: 0,
        Count,
      },
      expires: +new Date(),
    });
  },
}
```

#### 生命周期销毁的时候

```

```

### 更新 tradingview

```
componentWillUpdate(nextProps) {
  const { currentPeriod, symbol } = nextProps;
  const { currentPeriod: c, symbol: s } = this.props;
  const period = periods[currentPeriod];
  if (!this.widget) {
    return;
  }

  if (c !== currentPeriod) {
    this.widget.chart().setResolution(period.interval, () => { });
    this.widget.chart().setChartType(period.chartType);
    // this.onResetCacheNeededCallback && this.onResetCacheNeededCallback();
    // this.widget.chart().resetData();
    _cache = {};
    this.socket.send(subscribe.unsub(s, periods[c].period));
    // this.initSub(nextProps);
  }
}
```

```
// kLine/index.js
import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import { Scoped } from "kremling";
import { TradingView, Datafeed } from "trader-view";
import {
  periods,
  studys,
  resolveSymbol,
  createSymbolInfo,
  toNumber,
  getOverrides,
} from "@/utils/tradingviewHelper";
import socket from "@/service/socket";
import Text from "@/components/text";
import styles from "./index.krem.scss";

// http://localhost:9001
const host = process.env.NODE_ENV === "development" ? "/" : "/micro/contract/";

// 暂存所以交易对信息
let _cache = {};
let _lastBar = null;
let _selectTime = "";
@connect(({ allSymbolsContract: { currentPeriod, symbol } }) => {
  return {
    currentPeriod,
    symbol,
  };
})
export default class Kline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      minTime: 0, // 不在此范围内，弹层将被隐藏
      maxTime: 0, // 不在此范围内，弹层将被隐藏
      bar: {}, // 当前选中的bar
      prevBar: {}, // 当前选中bar的前一个bar
    };
  }
  /**
   * 初始订阅
   */
  async initSub({ symbol, currentPeriod }) {
    const { period, interval, count } = periods[currentPeriod];
    await socket.subscribe("subHis", symbol, period, this.from);
  }

  /**
   * 监听WebSocket响应
   * @param msg string
   */
  onSocketMessage = (data) => {
    if (data.subj === "index") {
      // 更新最后一条数据
      if (this.onRealtimeCallback) {
        const bars = Object.entries(_cache).sort((a, b) => a[0] - b[0]); //;
        const item = bars[bars.length - 1];
        if (item) {
          const bar = item[1];
          bar.close = data.data.Prz;
          bar.time = item[0] / 1;
          this.onRealtimeCallback(bar);
        }
      }
    } else if (data.subj === "kline") {
      const bar = resolveSymbol(data.data);
      // 存入缓存
      _cache[bar.time] = bar;
      _lastBar = { ...bar };
      // console.log("kline", _lastBar);
      console.log("put", bar.time);
      if (this.onRealtimeCallback) {
        setTimeout(() => {
          this.onRealtimeCallback(bar);
        }, 100);
      }
    } else if (data.data.Count) {
      if (this.onHistoryCallback) {
        const {
          Sec,
          PrzOpen,
          PrzClose,
          PrzHigh,
          PrzLow,
          Volume,
          Count,
        } = data.data;

        const { symbol, currentPeriod } = this.props;
        const { period, interval } = periods[currentPeriod];
        const list = [];

        for (let i = 0; i < Count; i++) {
          const bar = {
            time: Sec[i] * 1000,
            close: toNumber(PrzClose[i]),
            high: toNumber(PrzHigh[i]),
            low: toNumber(PrzLow[i]),
            open: toNumber(PrzOpen[i]),
            volume: toNumber(Volume[i]),
          };
          list.push(bar);
          // 存入缓存
          _cache[bar.time] = bar;
          if (i === Count - 1) {
            _lastBar = { ...bar };
            console.log("last", bar.time);
          }
        }

        this.onHistoryCallback(list, {
          noData: !list.length,
          nextTime: Sec[Sec.length - 1] * 1000,
        });

        socket.subscribe("sub", symbol, period);
      }
    }
  };

  /**
   * 初始化 JS API
   */
  initDatafeed() {
    const { symbol } = this.props;

    this.datafeed = new Datafeed({
      history: (params) => {
        return this.getHistData(
          params.symbol,
          params.resolution,
          params.from,
          params.to,
          params.firstDataRequest
        );
      },
      time: () => new Promise((resolve) => resolve(1)),
      config: () =>
        new Promise((resolve) =>
          resolve({
            supports_search: true,
            supports_group_request: false,
            supported_resolutions: [
              ...new Set(periods.map((item) => item.interval)),
            ],
            supports_marks: false,
            supports_timescale_marks: false,
            supports_time: true,
          })
        ),
      symbols: () =>
        new Promise((resolve) => resolve(createSymbolInfo(symbol))),
    });

    this.datafeed.subscribeBars = (
      symbolInfo,
      resolution,
      onRealtimeCallback,
      subscribeUID,
      onResetCacheNeededCallback
    ) => {
      this.onRealtimeCallback = onRealtimeCallback;
      this.onResetCacheNeededCallback = onResetCacheNeededCallback;
    };
    /**
     * 解析商品信息
     */
    this.datafeed.resolveSymbol = (symbol, onResolve, onError) => {
      onResolve(createSymbolInfo(symbol));
    };
    this.datafeed.getBars = (
      symbolInfo,
      resolution,
      from,
      to,
      onHistoryCallback,
      onErrorCallback,
      firstDataRequest
    ) => {
      this.onHistoryCallback = onHistoryCallback;
      this.from = from;
      this.to = to;
      const { symbol, currentPeriod } = this.props;
      const { period, interval, count } = periods[currentPeriod];
      socket.subscribe("subHis", symbol, period, from);
      // this.initWebSocket().then((res) => {
      //   res.onopen = () => {
      //     const { symbol, currentPeriod } = this.props;
      //     const { period, interval, count } = periods[currentPeriod];
      //     if (res) {
      //       res.send(
      //         subscribe.subHis(
      //           symbol,
      //           period,
      //           from,
      //           Math.ceil((to - from) / 60 / count)
      //         )
      //       );
      //     }
      //   };
      // });
    };
  }
  async getHistData() {
    const list = await new Promise();
    return {
      bars: [],
      meta: { noData: false },
    };
  }
  /**
   * 初始化图表
   */
  initTradingView = () => {
    if (!this.datafeed) {
      return;
    }
    const { currentPeriod, symbol } = this.props;
    const { time: interval, chartType, interval: inte } = periods[
      currentPeriod
    ];
    const localeMap = {
      "zh-CN": "zh",
      "ko-KR": "ko",
      "en-US": "en",
    };
    this.widget = new TradingView({
      // debug: true, // uncomment this line to see Library errors and warnings in the console
      // fullscreen: true,
      custom_css_url: host + "charting_library/static/style.css",
      symbol,
      interval,
      preset: "mobile",
      container_id: "tv_chart_container",
      datafeed: this.datafeed,
      height: "100%",
      width: "100%",
      library_path: host + "charting_library/",
      locale: "zh",
      loading_screen: {
        // backgroundColor: "#fff",
        // foregroundColor: "#fff"
      },
      disabled_features: [
        "left_toolbar",
        "volume_force_overlay",
        "create_volume_indicator_by_default",
        "create_volume_indicator_by_default_once",
        "format_button_in_legend",
        "hide_left_toolbar_by_default",
        "go_to_date",
        "use_localstorage_for_settings",
        "save_chart_properties_to_local_storage",
        "main_series_scale_menu",
        "show_logo_on_all_charts",
        "header_settings",
        "timeframes_toolbar",
        "chart_property_page_background",
        "timeframes_toolbar",
        "compare_symbol",
        "go_to_date",
        "header_chart_type", // k线样式
        "header_compare",
        "header_interval_dialog_button",
        "header_screenshot", // 截图
        "header_symbol_search",
        "header_undo_redo",
        "show_hide_button_in_legend",
        "show_interval_dialog_on_key_press",
        "snapshot_trading_drawings",
        "symbol_info",
        "border_around_the_chart",
        "remove_library_container_border",
        "header_saveload",
        "header_resolutions",
      ],
      overrides: getOverrides("white"),
      studies_overrides: {
        "volume.volume.color.0": "#eb4d5c",
        "volume.volume.color.1": "#53b987",
        "volume.volume.transparency": 70,
        "volume.options.showStudyArguments": !1,
        "MA Cross.short:plot.color": "#6B3798",
        "MA Cross.long:plot.color": "#708957",
      },
      enabled_features: ["hide_last_na_study_output"],
      charts_storage_url: "http://saveload.tradingview.com",
      charts_storage_api_version: "1.1",
      client_id: "tradingview.com",
      user_id: "public_user_id",
      theme: "Light",
      timezone: "Asia/Shanghai",
    });

    this.widget.onChartReady(() => {
      // 辅助线
      const chart = this.widget.chart();
      chart.setResolution(inte, () => {});
      chart.setChartType(chartType);

      // 每当十字线位置改变时，图表库将会调用回调函数。
      chart.crossHairMoved(({ time }) => {
        if (!time) {
          return;
        }
        const bars = Object.entries(_cache).sort((a, b) => a[0] - b[0]); //;
        const index = bars.findIndex((item) => item[1].time === time * 1000);
        const bar = bars[index]?.[1];
        // console.log("111", time, bar, _cache);
        if (bar) {
          const { minTime, maxTime } = this.state;
          let show = true;
          if (minTime && maxTime) {
            show = bar.time <= maxTime && bar.time >= minTime;
          }
          this.setState(
            {
              show,
              bar: bar,
              prevBar: bars[index - 1]?.[1] || {},
              minTime: show ? bars[index - 2]?.[1]?.time || 0 : 0,
              maxTime: show ? bars[index + 2]?.[1]?.time || 0 : 0,
            },
            () => {
              _selectTime = time;
            }
          );
        } else {
          this.setState({
            show: false,
          });
        }
      });

      for (let i = 0, l = studys.length; i < l; i++) {
        chart.createStudy(...studys[i]);
      }
    });
  };
  componentWillUnmount() {
    const { currentPeriod, symbol } = this.props;
    socket.unsubscribe(symbol, currentPeriod);
  }
  componentWillReceiveProps(nextProps) {
    const { currentPeriod, symbol } = nextProps;
    const { currentPeriod: c, symbol: s } = this.props;
    const period = periods[currentPeriod];
    if (!this.widget) {
      return;
    }

    if (c !== currentPeriod) {
      this.widget.chart().setResolution(period.interval, () => {});
      this.widget.chart().setChartType(period.chartType);
      _cache = {};
      socket.unsubscribe(s, periods[c].period);
    }
  }

  async componentDidMount() {
    // onmessage事件
    socket.onMessage(this.onSocketMessage);
    this.initDatafeed();
    // this.initWebSocket();
    this.initTradingView();
  }

  render() {
    const {
      show,
      prevBar,
      bar: { time, close, high, low, open, volume },
    } = this.state;
    const pClose = prevBar.close || 0;
    const num = close - pClose;
    const percent = ((close - pClose) / close) * 100;
    return (
      <Scoped css={styles}>
        <div className="contract-home-kline">
          {show ? (
            <ul className="float-panle">
              <li>
                <Text type="date" format="YYYY-MM-DD HH:mm">
                  {time}
                </Text>
              </li>
              <li>
                <div>开:</div>
                <Text type="number">{open}</Text>
              </li>
              <li>
                <div>高:</div>
                <Text type="number">{high}</Text>
              </li>
              <li>
                <div>低:</div>
                <Text type="number">{low}</Text>
              </li>
              <li>
                <div>收:</div>
                <Text type="number">{close}</Text>
              </li>
              <li>
                <div>涨跌额: </div>
                <span className={num >= 0 ? "green" : "red"}>
                  {num >= 0 ? "+" : ""}
                  <Text type="number">{num}</Text>
                </span>
              </li>
              <li>
                <div>涨跌幅: </div>
                <span className={percent >= 0 ? "green" : "red"}>
                  {percent >= 0 ? "+" : ""}
                  <Text type="number">{percent}</Text>%
                </span>
              </li>
            </ul>
          ) : null}
          <div
            className="kline-percentage"
            ref={(ref) => (this.percentage = ref)}
          >
            111%
          </div>
          <div id="tv_chart_container"></div>
        </div>
      </Scoped>
    );
  }
}
import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import { Scoped } from "kremling";
import { TradingView, Datafeed } from "trader-view";
import {
  periods,
  studys,
  resolveSymbol,
  createSymbolInfo,
  toNumber,
  getOverrides,
} from "@/utils/tradingviewHelper";
import socket from "@/service/socket";
import Text from "@/components/text";
import styles from "./index.krem.scss";

// http://localhost:9001
const host = process.env.NODE_ENV === "development" ? "/" : "/micro/contract/";

// 暂存所以交易对信息
let _cache = {};
let _lastBar = null;
let _selectTime = "";
@connect(({ allSymbolsContract: { currentPeriod, symbol } }) => {
  return {
    currentPeriod,
    symbol,
  };
})
export default class Kline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      minTime: 0, // 不在此范围内，弹层将被隐藏
      maxTime: 0, // 不在此范围内，弹层将被隐藏
      bar: {}, // 当前选中的bar
      prevBar: {}, // 当前选中bar的前一个bar
    };
  }
  /**
   * 初始订阅
   */
  async initSub({ symbol, currentPeriod }) {
    const { period, interval, count } = periods[currentPeriod];
    await socket.subscribe("subHis", symbol, period, this.from);
  }

  /**
   * 监听WebSocket响应
   * @param msg string
   */
  onSocketMessage = (data) => {
    if (data.subj === "index") {
      // 更新最后一条数据
      if (this.onRealtimeCallback) {
        const bars = Object.entries(_cache).sort((a, b) => a[0] - b[0]); //;
        const item = bars[bars.length - 1];
        if (item) {
          const bar = item[1];
          bar.close = data.data.Prz;
          bar.time = item[0] / 1;
          this.onRealtimeCallback(bar);
        }
      }
    } else if (data.subj === "kline") {
      const bar = resolveSymbol(data.data);
      // 存入缓存
      _cache[bar.time] = bar;
      _lastBar = { ...bar };
      // console.log("kline", _lastBar);
      console.log("put", bar.time);
      if (this.onRealtimeCallback) {
        setTimeout(() => {
          this.onRealtimeCallback(bar);
        }, 100);
      }
    } else if (data.data.Count) {
      if (this.onHistoryCallback) {
        const {
          Sec,
          PrzOpen,
          PrzClose,
          PrzHigh,
          PrzLow,
          Volume,
          Count,
        } = data.data;

        const { symbol, currentPeriod } = this.props;
        const { period, interval } = periods[currentPeriod];
        const list = [];

        for (let i = 0; i < Count; i++) {
          const bar = {
            time: Sec[i] * 1000,
            close: toNumber(PrzClose[i]),
            high: toNumber(PrzHigh[i]),
            low: toNumber(PrzLow[i]),
            open: toNumber(PrzOpen[i]),
            volume: toNumber(Volume[i]),
          };
          list.push(bar);
          // 存入缓存
          _cache[bar.time] = bar;
          if (i === Count - 1) {
            _lastBar = { ...bar };
            console.log("last", bar.time);
          }
        }

        this.onHistoryCallback(list, {
          noData: !list.length,
          nextTime: Sec[Sec.length - 1] * 1000,
        });

        socket.subscribe("sub", symbol, period);
      }
    }
  };

  /**
   * 初始化 JS API
   */
  initDatafeed() {
    const { symbol } = this.props;

    this.datafeed = new Datafeed({
      history: (params) => {
        return this.getHistData(
          params.symbol,
          params.resolution,
          params.from,
          params.to,
          params.firstDataRequest
        );
      },
      time: () => new Promise((resolve) => resolve(1)),
      config: () =>
        new Promise((resolve) =>
          resolve({
            supports_search: true,
            supports_group_request: false,
            supported_resolutions: [
              ...new Set(periods.map((item) => item.interval)),
            ],
            supports_marks: false,
            supports_timescale_marks: false,
            supports_time: true,
          })
        ),
      symbols: () =>
        new Promise((resolve) => resolve(createSymbolInfo(symbol))),
    });

    this.datafeed.subscribeBars = (
      symbolInfo,
      resolution,
      onRealtimeCallback,
      subscribeUID,
      onResetCacheNeededCallback
    ) => {
      this.onRealtimeCallback = onRealtimeCallback;
      this.onResetCacheNeededCallback = onResetCacheNeededCallback;
    };
    /**
     * 解析商品信息
     */
    this.datafeed.resolveSymbol = (symbol, onResolve, onError) => {
      onResolve(createSymbolInfo(symbol));
    };
    this.datafeed.getBars = (
      symbolInfo,
      resolution,
      from,
      to,
      onHistoryCallback,
      onErrorCallback,
      firstDataRequest
    ) => {
      this.onHistoryCallback = onHistoryCallback;
      this.from = from;
      this.to = to;
      const { symbol, currentPeriod } = this.props;
      const { period, interval, count } = periods[currentPeriod];
      socket.subscribe("subHis", symbol, period, from);
      // this.initWebSocket().then((res) => {
      //   res.onopen = () => {
      //     const { symbol, currentPeriod } = this.props;
      //     const { period, interval, count } = periods[currentPeriod];
      //     if (res) {
      //       res.send(
      //         subscribe.subHis(
      //           symbol,
      //           period,
      //           from,
      //           Math.ceil((to - from) / 60 / count)
      //         )
      //       );
      //     }
      //   };
      // });
    };
  }
  async getHistData() {
    const list = await new Promise();
    return {
      bars: [],
      meta: { noData: false },
    };
  }
  /**
   * 初始化图表
   */
  initTradingView = () => {
    if (!this.datafeed) {
      return;
    }
    const { currentPeriod, symbol } = this.props;
    const { time: interval, chartType, interval: inte } = periods[
      currentPeriod
    ];
    const localeMap = {
      "zh-CN": "zh",
      "ko-KR": "ko",
      "en-US": "en",
    };
    this.widget = new TradingView({
      // debug: true, // uncomment this line to see Library errors and warnings in the console
      // fullscreen: true,
      custom_css_url: host + "charting_library/static/style.css",
      symbol,
      interval,
      preset: "mobile",
      container_id: "tv_chart_container",
      datafeed: this.datafeed,
      height: "100%",
      width: "100%",
      library_path: host + "charting_library/",
      locale: "zh",
      loading_screen: {
        // backgroundColor: "#fff",
        // foregroundColor: "#fff"
      },
      disabled_features: [
        "header_fullscreen_button", // 全屏
        "property_pages",  // 禁用所有属性页
        "left_toolbar",
        "volume_force_overlay",  // 防止重叠
        "create_volume_indicator_by_default",
        "create_volume_indicator_by_default_once",
        "format_button_in_legend",
        "hide_left_toolbar_by_default",
        "go_to_date",
        "use_localstorage_for_settings",
        "save_chart_properties_to_local_storage",
        "main_series_scale_menu",
        "show_logo_on_all_charts",
        "header_settings",  // 设置
        "timeframes_toolbar", // 下面的时间
        "chart_property_page_background",
        "compare_symbol",
        "go_to_date",
        "header_chart_type",
        "header_compare", // 图标对比
        "header_interval_dialog_button",
        "header_screenshot",
        "header_symbol_search",
        "header_undo_redo",
        "show_hide_button_in_legend",
        "show_interval_dialog_on_key_press",
        "snapshot_trading_drawings",
        "symbol_info",
        "border_around_the_chart",
        "remove_library_container_border",
        "header_saveload",
        "header_resolutions", // 头部时间s
      ],
      overrides: getOverrides("white"),
      studies_overrides: {
        "volume.volume.color.0": "#eb4d5c",
        "volume.volume.color.1": "#53b987",
        "volume.volume.transparency": 70,
        "volume.options.showStudyArguments": !1,
        "MA Cross.short:plot.color": "#6B3798",
        "MA Cross.long:plot.color": "#708957",
      },
      enabled_features: ["hide_last_na_study_output"],
      charts_storage_url: "http://saveload.tradingview.com",
      charts_storage_api_version: "1.1",
      client_id: "tradingview.com",
      user_id: "public_user_id",
      theme: "Light",
      timezone: "Asia/Shanghai",
    });

    this.widget.onChartReady(() => {
      // 辅助线
      const chart = this.widget.chart();
      chart.setResolution(inte, () => {});
      chart.setChartType(chartType);

      // 每当十字线位置改变时，图表库将会调用回调函数。
      chart.crossHairMoved(({ time }) => {
        if (!time) {
          return;
        }
        const bars = Object.entries(_cache).sort((a, b) => a[0] - b[0]); //;
        const index = bars.findIndex((item) => item[1].time === time * 1000);
        const bar = bars[index]?.[1];
        // console.log("111", time, bar, _cache);
        if (bar) {
          const { minTime, maxTime } = this.state;
          let show = true;
          if (minTime && maxTime) {
            show = bar.time <= maxTime && bar.time >= minTime;
          }
          this.setState(
            {
              show,
              bar: bar,
              prevBar: bars[index - 1]?.[1] || {},
              minTime: show ? bars[index - 2]?.[1]?.time || 0 : 0,
              maxTime: show ? bars[index + 2]?.[1]?.time || 0 : 0,
            },
            () => {
              _selectTime = time;
            }
          );
        } else {
          this.setState({
            show: false,
          });
        }
      });

      for (let i = 0, l = studys.length; i < l; i++) {
        chart.createStudy(...studys[i]);
      }
    });
  };
  componentWillUnmount() {
    const { currentPeriod, symbol } = this.props;
    socket.unsubscribe(symbol, currentPeriod);
  }
  componentWillReceiveProps(nextProps) {
    const { currentPeriod, symbol } = nextProps;
    const { currentPeriod: c, symbol: s } = this.props;
    const period = periods[currentPeriod];
    if (!this.widget) {
      return;
    }

    if (c !== currentPeriod) {
      this.widget.chart().setResolution(period.interval, () => {});
      this.widget.chart().setChartType(period.chartType);
      _cache = {};
      socket.unsubscribe(s, periods[c].period);
    }
  }

  async componentDidMount() {
    // onmessage事件
    socket.onMessage(this.onSocketMessage);
    this.initDatafeed();
    // this.initWebSocket();
    this.initTradingView();
  }

  render() {
    const {
      show,
      prevBar,
      bar: { time, close, high, low, open, volume },
    } = this.state;
    const pClose = prevBar.close || 0;
    const num = close - pClose;
    const percent = ((close - pClose) / close) * 100;
    return (
      <Scoped css={styles}>
          <div
            className="kline-percentage"
            ref={(ref) => (this.percentage = ref)}
          >
            111%
          </div>
          <div id="tv_chart_container"></div>
        </div>
      </Scoped>
    );
  }
}
```

```
// service/socket.js
import { tickerSymbol, periods } from "@/utils/tradingviewHelper";
let ws = "wss://XXX/market";
let index = 1;
let socket = null;
let onMessageFn = null;
let dispatch = null;
let state = null;
let timer = null;
let subQueue = []; // 订阅队列

export const subscribeTypeMap = {
  sub: (symbol, period) =>
    JSON.stringify({
      req: "Sub",
      rid: `${++index}`,
      args: [`kline_${period}_GMEX_CI_${symbol}`],
      expires: +new Date(),
    }),
  unSub: (symbol, period, all = true) =>
    JSON.stringify({
      req: "UnSub",
      rid: `${++index}`,
      args: all
        ? [`kline_${period}_GMEX_CI_${symbol}`, `GMEX_CI_${symbol}`]
        : [`GMEX_CI_${symbol}`],
      expires: +new Date(),
    }),
  subHis: (symbol, period, Sec) =>
    JSON.stringify({
      req: "GetHistKLine",
      rid: `${++index}`,
      args: {
        Sym: `GMEX_CI_${symbol}`,
        Typ: period,
        Sec: Sec,
        Offset: 0,
        Count: 10000000,
      },
      expires: +new Date(),
    }),
};

const throwErr = () => {
  throw "先执行service/socket.js的run方法";
};
/**
 * 提供给外界使用
 * @param {*} fn
 */
export const onMessage = (fn) => {
  if (socket) {
    onMessageFn = fn;
  } else {
    throwErr();
  }
};

/**
 * 启动，初始化
 */
export const run = (d, s) =>
  new Promise(function (resolve, reject) {
    if (socket) {
      const { readyState, OPEN, CLOSED, CLOSING } = socket;
      if (readyState === OPEN) {
        resolve(socket);
      } else if (readyState === CLOSING || readyState === CLOSED) {
        socket = new WebSocket(ws);
      }
    } else {
      socket = new WebSocket(ws);
    }
    // 给重连时使用
    dispatch = d;
    state = s;
    // 进入正常逻辑
    const {
      allSymbolsContract: { currentPeriod, symbol },
    } = state;
    const { period } = periods[currentPeriod];

    socket.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        // 对外提供onmessage方法
        if (onMessageFn) {
          onMessageFn(data);
        }
        // 存储数据
        if (data.subj === "index") {
          dispatch({
            type: "global/updateState",
            state: {
              kline: tickerSymbol(data.data),
            },
          });
        }
      } catch (err) {
        console.error(err);
      }
    };

    /**
     * 链接出错
     */
    socket.onerror = (e) => {
      reject(e);
    };
    /**
     * 订阅k线
     */
    socket.onopen = () => {
      // 链接打开成功
      resolve(socket);
      /**
       * 大部分页面都会使用，所以全局开启订阅
       */
      socket.send(
        JSON.stringify({
          req: "Sub",
          rid: `${++index}`,
          expires: Date.now() + 500 + 30000,
          args: ["index_GMEX_CI_BTC", "__slow__"],
        })
      );
    };
  });

/**
 * 连接成功后，发送订阅队列
 * 调用之前必需保证连接成功
 */
const send = (resolve) => {
  for (let subString of subQueue) {
    socket.send(subString);
  }
  resolve(socket);
  // 订阅成功后清除对列
  subQueue = [];
};
export const subscribe = (sub, ...args) =>
  new Promise(function (resolve, reject) {
    // 订阅的字符串
    subQueue.push(subscribeTypeMap[sub] ? subscribeTypeMap[sub](...args) : sub);
    if (socket) {
      const { readyState, OPEN, CLOSED, CLOSING } = socket;

      // 连接成功
      if (readyState === OPEN) {
        send(resolve);
      } else if (readyState === CLOSED || readyState === CLOSING) {
        // 连接关闭
        if (dispatch && state) {
          run(dispatch, state)
            .then(() => {
              send(resolve);
            })
            .catch(reject);
        } else {
          throwErr();
        }
      } else {
        // 链接中
        timer = setInterval(() => {
          /**
           * 开启定时器检测状态
           * 连接成功后关闭定时器并订阅所有订阅
           */
          const { OPEN, readyState } = socket;
          if (OPEN === readyState) {
            clearInterval(timer);
            timer = null;
            send(resolve);
          }
        }, 100);
      }
    } else {
      throwErr();
    }
  });

/**
 * 取消订阅，在使用之前保证连接成功
 * @param {*} sub
 * @param  {...any} args
 */
export const unsubscribe = (...args) => {
  if (socket) {
    const subString = subscribeTypeMap.unSub(...args);
    socket.send(subString);
  } else {
    throwErr();
  }
};
export default { run, onMessage, subscribe, unsubscribe };
```

```
// root.component.js
async componentDidMount() {
  const { store } = this.props;
  await socket.run(store.dispatch, store.getState());
}
```
