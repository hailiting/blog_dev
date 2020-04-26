# React_ChardingView指南
中文文档地址 https://b.aitrade.ga/books/tradingview/
## 方法一： npm trader-view
~~~
import {TradingView, Datafeed } from "trader-view";
~~~
### TradingView 初始化图标
~~~
// params ={symbol, resolution, from, to, firstDataRequest}
// list为数组 ep: [ {time,close,high,low,open,volume} ... ]
this.datafeed = new Datafeed({
  history: (params)=>{
    bars: list,
    meta: {
      noData: !list.length
    }
  }
  time: ()=>new Promise((resolve)=>resolve(1)),
  config: ()=>{
    return new Promise((resolve)=>resolve({
      supported_resolutions: [
        ...new Set(periods.map((item)=>item.interval)),
      ], // 支持的周期数组，如果是纯数字，默认为分 ep:  [1, 15, 240, "D", "6M"]
      supports_marks: false, // 布尔值来标识datafeed是否支持在k线上显示标记
      supports_timescale_marks: false, // 布尔值 标识datafeed是否支持时间刻度标记
      supports_time: true, // 为true时，datafeed提供服务器时间（unix时间），仅用于在价格刻度上显示倒计时
    }))
  },
  symbols: ()=>{
    new Promise((resolve)=>resolve(createSymbolInfo(symbol))),
  },
})
this.datafeed.subscribeBars = (
  symbolInfo, 
  resolution, 
  onRealtimeCallback,
  subscribeUID, 
  onResetCacheNeededCallback
  )=>{
    this.onRealtimeCallBack = onRealtimeCallback;
    this.onResetCacheNeededCallback = onResetCacheNeededCallback;
  }
~~~
~~~
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
~~~
#### 设置图表背景 
~~~
// chardingView.css
table.chart-markup-table {
  background-color: #fafafd;
  background: url("./images/logo.png") #fafafd no-repeat center center;
  background-size: 251px 51px;
}
~~~
~~~
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

~~~
~~~
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
~~~
~~~
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
~~~
### websocket链接获取数据
~~~
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
~~~
websock订阅的参数
~~~
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
~~~
#### 生命周期销毁的时候
~~~

~~~
### 更新tradingview
~~~
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
~~~

~~~
import React from "react";
import { TradingView, Datafeed } from 'trader-view';
import {
  periods,
  studys,
  resolveSymbol,
  createSymbolInfo,
  toNumber,
  getOverrides,
} from "@/utils/tradingviewHelper";
let list = []
const socket = new WebSocket("wss://ss.abkjl.com/v1/market");
export default class KKline extends React.Component {
  componentDidMount() {
    let hisPage = 1
    socket.onopen = () => {
      // // 历史  不能再这请求，要到getbars里
      // socket.send(JSON.stringify({
      //   req: "GetHistKLine",
      //   rid: `${++hisPage}`,
      //   args: {
      //     Count: 1441,
      //     Offset: 0,
      //     Sec: 1587781451,
      //     Sym: "GMEX_CI_BTC",
      //     Typ: "1m",
      //   },
      //   expires: +new Date(),
      // }))
      // 最新
      socket.send(JSON.stringify({
        req: "Sub",
        rid: `${++hisPage}`,
        args: [
          `kline_1m_GMEX_CI_BTC`,
          `index_GMEX_CI_BTC`,
          "__slow__",
        ],
        expires: +new Date(),
      }))
      // 最新k线
      socket.send(JSON.stringify({
        req: "Sub",
        rid: `${++hisPage}`,
        args: [
          "kline_1m_GMEX_CI_BTC"
        ],
        expires: +new Date(),
      }))
    }
    let _cache = {}
    socket.onmessage = async (data) => {
      if (data.data) {
        const jsonp = JSON.parse(data.data);
        if (jsonp.subj === "index") {
          let bar = {
            ...list[list.length - 1],
            close: jsonp.data.Prz,
          };

          if (this.onRealtimeCallback) {
            this.onRealtimeCallback(bar);
          }
        } else if (jsonp.subj === "kline") {
          const {
            Sec,
            PrzClose,
            PrzHigh,
            PrzLow,
            PrzOpen,
            Volume,
          } = jsonp.data;
          const bar = {
            time: Sec * 1000,
            close: PrzClose,
            high: PrzHigh,
            low: PrzLow,
            open: PrzOpen,
            volume: Volume,
          };
          list.push(bar)
          if (this.onRealtimeCallback) {
            this.onRealtimeCallback(bar);
          }
        } else {
          const {
            Sec,
            PrzOpen,
            PrzClose,
            PrzHigh,
            PrzLow,
            Volume,
            Count,
          } = jsonp.data;
          if (Sec && Sec.length) {
            for (let i = 0; i < Count; i++) {
              const bar = {
                time: Sec[i] * 1000,
                close: PrzClose[i],
                high: PrzHigh[i],
                low: PrzLow[i],
                open: PrzOpen[i],
                volume: Volume[i],
              };
              // 存入缓存
              _cache[bar.time] = bar;
              list.push(bar);
            }
            if (this.onHistoryCallback) {
              this.onHistoryCallback(list, {
                noData: !list.length,
                nextTime: Sec[Sec.length - 1] * 1000,
              });
            }
          }
        }
      }
    }
    const datafeed = new Datafeed({
      history: (params) => {
        console.log({ list })
        return {
          bars: [],
          meta: { noData: !list.length }
        }
      },
      config: () => new Promise(resolve => resolve({
        supports_search: true,
        supports_group_request: false,
        supported_resolutions: ['1', '5', '15', '30', '60', '1440', '10080', '302400'],
        supports_marks: false,
        supports_timescale_marks: false,
        supports_time: false
      })),
      symbols: () => new Promise(resolve => resolve({
        name: 'BTC/USDT',
        full_name: 'BTC/USDT',
        description: 'BTC/USDT',
        type: 'btcusdt',
        session: '24x7',
        exchange: 'BTC',
        listed_exchange: 'BTC',
        timezone: 'Asia/Shanghai',
        format: 'price',
        pricescale: 100,
        minmov: 1,
        has_intraday: true,
        has_no_volume: false,
        has_daily: true,
        has_weekly_and_monthly: true,
        has_empty_bars: true,
        supported_resolutions: ['1', '5', '15', '30', '60', '1440', '10080', '302400'],
        intraday_multipliers: ['1', '5', '15', '30', '60', '1440', '10080', '302400']
      }))
    })

    datafeed.getBars = (
      symbolInfo,
      resolution,
      from,
      to,
      onHistoryCallback,
      onErrorCallback,
      firstDataRequest
    ) => {
      this.onHistoryCallback = onHistoryCallback;
      setTimeout(function () {
        socket.send(JSON.stringify({
          req: "GetHistKLine",
          rid: `${++hisPage}`,
          args: {
            Count: Math.ceil((to - from) / 60 / 1),
            Offset: 0,
            Sec: from,
            Sym: "GMEX_CI_BTC",
            Typ: "1m",
          },
          expires: +new Date(),
        }))
      }, 1000)
    };
    datafeed.subscribeBars = (
      symbolInfo,
      resolution,
      onRealtimeCallback,
      subscribeUID,
      onResetCacheNeededCallback
    ) => {
      this.onRealtimeCallback = onRealtimeCallback;
    };
    const widget = new TradingView({
      container_id: "Charding_View",
      height: "400",
      width: "100%",
      library_path: "/charting_library/",
      datafeed
    })
    widget.onChartReady(() => {
      // 辅助线
      const chart = widget.chart();
      chart.setResolution("1m", () => { });
      chart.setChartType(1);

      // 每当十字线位置改变时，图表库将会调用回调函数。
      chart.crossHairMoved(({ time }) => {
        if (!time) {
          return;
        }
        const bars = Object.entries(_cache).sort((a, b) => a[0] - b[0]); //;
        const index = bars.findIndex((item) => item[1].time === time * 1000);
        const bar = bars[index] ?.[1];
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
              minTime: show ? bars[index - 2] ?.[1] ?.time || 0 : 0,
              maxTime: show ? bars[index + 2] ?.[1] ?.time || 0 : 0,
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
      widget.subscribe("onTick", ({ time, close }) => {
      });
    });
  }
  render() {
    return <div>
      <div id="Charding_View"></div>
    </div>
  }
}
~~~