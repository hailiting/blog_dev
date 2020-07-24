module.exports = app => {
  const { userModel } = app.model;
  return {
    getUserProp: async (userName, key) => {
      const doc = await userModel.findOne({ userName }, { [key]: 1, id: 0 })
      return doc && doc[key] ? doc[key] : "";
    },
    response: (errno = 0, data = "", msg = "") => ({ errno, data, msg }),
    // 获取YYYY-MM-DD
    getDate: date => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
    // 获取HH:MM:SS
    getTime: date => `${date.getHours()}-${date.getMinutes() + 1}-${date.getSeconds()}`,
  }
}