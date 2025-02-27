import React from "react";
import { Upload, Button } from "@douyinfe/semi-ui";
import { IconUpload } from "@douyinfe/semi-icons";

function UploadAudio() {
  const url = "";

  return (
    <Upload action={url} accept="audio/*">
      <Button icon={<IconUpload />} theme="light">
        点击上传
      </Button>
    </Upload>
  );
}

export default UploadAudio;
