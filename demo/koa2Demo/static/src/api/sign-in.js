import Request from "./../utils/request";

const signInApi = async (userInfo) => {
  let result = await Request.post({
    url: "/api/user/signIn",
    data: userInfo,
  });
  return result;
};

const signInForm = (userInfo) => {
  userInfo.source = "form";
  Request.form({
    url: "/api/user/signIn",
    data: userInfo,
  });
};

export { signInApi, signInForm };
