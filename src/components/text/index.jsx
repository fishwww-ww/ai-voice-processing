import React from "react";
import { Button, Flex, Input } from "antd";
const { TextArea } = Input;
const onChange = (e) => {
  console.log("Change:", e.target.value);
};
const Text = () => (
  <div className="w-[500px] h-[200px] ">
    <TextArea
      showCount
      maxLength={500}
      onChange={onChange}
      placeholder=" 请输入讲解内容"
      // style={{
      //   height: 120,
      //   resize: "none",
      // }}
      className="h-full w-full"
    />
    <div>语言</div>
    <div>声音</div>
    <div>···</div>
    <Button>讲解</Button>
  </div>
);
export default Text;
