module.exports = app => {
  const { chatModel } = app.model;
  const { getUserProp, response } = app.helper;
  const { alioss } = app.plugin;
  const { ossPath, upload } = app.app_config;
  return {
    async addChatObj(req, res) {
      const { user } = req.body;
      const userAvatar = await getUserProp(user, "avatar");
      return res.json(response(0, { to: user, avatar: userAvatar }, ""));
    },
    async getChatList(req, res) {
      const { user } = req.query;
      const reg = new RegExp(user);
      // 正则匹配所有包含当前用户名的chatid
      const doc = await chatModel.find({ chatid: reg }, { _id: 0, chatid: 1 });
      // 获取去重后的chatId数组
      const chatidList = [...new Set(doc.map(item => item.chatid))];
      // 分离chatid，获取聊天对象的用户名数组
      const userList = chatidList.reduce((acc, chatId) => {
        const [from, to] = chatId.split("_");
        const another = from === user ? to : from;
        if (!acc.includes(another) && another) acc.push(anther);
        return acc;
      }, [])
      // 获得聊天对象的头像数组
      const avatarList = await Promise.all(userList.map(user => getUserProp(user, "avatar")));
      const data = avatarList.reduce((acc, avatar, index) => {
        acc.push({
          to: userList[index],
          avatar,
        })
      }, [])
      return res.json(response(0, data, ""));
    },
    async getChatData(req, res) {
      const { chatid } = req.query;
      const doc = await chatModel.find({ chatid }, { _id: 0, __v: 0 });
      return res.json(response(0, doc.slice(-50), ""));
    },
    async uploadPic(req, res) {
      const path = `${ossPath.host}/${ossPath.filePath}/${req.file.filename}`;
      const uploadOss = await alioss.put(`${ossPath.filePath}/${req.file.filename}`, `${upload.img}/${req.file.filename}`);
      if (uploadOss.res.status !== 200) return res.json(response(1, "", "上传失败"));
      return res.json(response(0, path, ""));
    },
    async uploadVoice(req, res) {
      const path = `${ossPath.host}/${ossPath.audioPath}/${req.file.filename}`;
      const uploadOss = await alioss.put(`${ossPath.audioPath}/${req.file.filename}`, `${upload.audio}/${req.filename}`);
      if (uploadOss.res.status !== 200) return res.json(response(1, "", "上传失败"));
      return res.json(response(0, path, ""));
    }
  }
}