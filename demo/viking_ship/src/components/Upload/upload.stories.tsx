import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Upload, UploadFile } from "./upload";
//import Button from '../Button/button'
import Icon from "../Icon/icon";

const defaultFileList: UploadFile[] = [
  {
    uid: "123",
    size: 1234,
    name: "hello.md",
    status: "uploading",
    percent: 30,
  },
  { uid: "122", size: 1234, name: "xyz.md", status: "success", percent: 30 },
  { uid: "121", size: 1234, name: "eyiha.md", status: "error", percent: 30 },
];
// const checkFileSize = (file: File) => {
//   // 50k
//   if (Math.round(file.size / 1024) > 50) {
//     alert("file too big");
//     return false;
//   }
//   return true;
// };
// 重命名文件name
// const filePromise = (file: File) => {
//   const newFile = new File([file], "new_name.docx", { type: file.type });
//   return Promise.resolve(newFile);
// };
const SimpleUpload = () => {
  return (
    <Upload
      defaultFileList={defaultFileList}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      onChange={action("changed")}
      onRemove={action("removed")}
      // beforeUpload={filePromise}
      name="fileName"
      multiple
      drag
    >
      <Icon icon="upload" size="5x" theme="secondary" />
      <br />
      <p>Drag file over to upload</p>
    </Upload>
  );
};

storiesOf("Upload component", module)
  .addParameters({ jest: ["upload.test.tsx"] })
  .add("Upload", SimpleUpload);
