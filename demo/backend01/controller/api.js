const axios = require("axios");

module.exports = app => {
  const { articleModel, logModel } = app.model;
  const { response, redisTool, getDate } = app.helper;
  const { isService } = app.app_config;
  const ONE_DAY = 1000 * 60 * 60 * 24;
  const TEN_MINUTES = 1000 * 60 * 10;
  const TOTAL_VIEW_COUNT = "total_view_count";
  return {
    async newVisitor(req, res) {
      const visitRecent = req.cookies["visit"];
      const viewCount = visitRecent ? await redisTool.get(TOTAL_VIEW_COUNT) : await redisTool.incr(TOTAL_VIEW_COUNT);
      res.cookie("visit", 1, { maxAge: TEN_MINUTES });
      return res.json(response(0, viewCount, ""))
    },
    async analyzeBlogDate(req, res) {
      const doc = await articleModel.find({ "author": "Calabash" }, { blogDate: 1, _id: 0 });
      if (!doc) return res.json(response(1, "", "暂无数据"));
      const blogDateArr = doc.map(({ blogDate }) => blogDate.slice(8, 10));
      const timeMap = {};
      for (let date of blogDateArr) {
        timeMap[date] ? timeMap[date]++ : timeMap[date] = 1;
      }
      const data = Object.keys(timeMap).reduce((acc, key) => {
        acc.push({ value: timeMap[key], name: `${key}点` });
        return acc
      }, [])
      return res.json(response(0, data, ""))
    },
    async getPvLog(req, res) {
      const date = new Date().getTime();
      const list = [];
      const data = [];
      for (let i = 0; i < 10; i++) {
        const time = new Date(date - i * ONE_DAY);
        list.push(getDate(time));
      }
      const allPvLogs = await Promise.all(list.map(date => redisTool.getIpLog(date)));
      for (let eachDayLogs of allPvLogs) {
        const ipList = eachDayLogs.map(item => item.split("-")[0]);
        data.push([...new Set(ipList)].length);
      }
      return res.json(response(0, data.reverse(), ""));
    },
    async insertLog(obj) {
      const shouldRecord = shouldRecordApi(obj.url, obj.method);
      if (shouldRecord) {
        obj.url = obj.url.split("?")[0];
        await logModel.create(obj)
      }
    },
    async getIP(req, res) {
      const date = req.query.date;
      const IPLogs = await redisTool.getIpLog(date);
      const result = [];
      // result数据为"ip-time-path"
      // 1. 取出所有ip并去重
      const ipList = [...new Set(IPLogs.reduce((acc, record) => {
        acc.push(record.split("-")[0])
        return acc
      }, []))]
      // 2. 通过第三方接口获取这些ip地址
      const locationList = await Promise.all(
        ipList.map(ip => {
          return axios.get(`${ipService.path}?ip=${ip}`, {
            headers: {
              Authorization: ipService.token
            }
          })
        })
      )
      locationList.map(({ data }, index) => {
        const address = data.status === "1" ? `${data.province}-${data.city}` : `海外-某地`;
        result.push({ ip: ipList[index], address, list: [] })
      })
      // 3. 分离出所有请求
      IPLogs.forEach(item => {
        const [ip, date, path] = item.split("-");
        const source = result.find(item => item.ip === ip);
        if (source) {
          source.list.push({ data, path })
        }
      })
      return res.json(response(0, result, ""))
    },
    async getLogByUrl(req, res) {
      let { url } = req.body;
      if (url === "/api/v1/idea") url = /\/api\/v1\/ideas\/\d{14}/
      const list = await logModel.find({ url }, { _id: 0, _v: 0 });
      return res.json(response(0, list.slice(-50), ''))
    }
  }
}
/**
 * 是否需要记录该IP地址
 * @param {string} url 请求地址
 * @param {string} method 请求方法
 * @return {boolean} 是否应当记录
 */
function shouldRecordApi(url, method) {
  if (!/^\/api/.test(url)) return false

  const row = [url.split('?')[0], method].join('-')
  const extraRule = /\/api\/v1\/ideas\/\d{14}-GET/
  const rules = [
    '/api/v1/login-POST',
    '/api/v1/checkStatus-POST',
    '/api/v1/userinfo-GET',
    '/api/v1/ideas-GET',
    '/api/v1/comment-POST',
    '/api/v1/like-POST',
  ]

  return rules.includes(row) || extraRule.test(row)
}
