const fs = require("fs");
const axios = require("axios");

async function uploadFile(signedUrl, filePath) {
  try {
    // 创建读取流
    const fileStream = fs.createReadStream(filePath);

    // 发送PUT请求上传文件
    const response = await axios.put(signedUrl, fileStream, {
      headers: {
        "Content-Type": "application/octet-stream", // 根据实际情况调整Content-Type
      },
    });

    console.log(`返回上传状态码：${response.status}`);
    if (response.status === 200) {
      console.log("使用网络库上传成功");
    }
    console.log(response.data);
  } catch (error) {
    console.error(`发生错误：${error.message}`);
  }
}

// 主函数
(async () => {
  // 将<signedUrl>替换为授权URL。
  const signedUrl = "<signedUrl>";

  // 填写本地文件的完整路径。如果未指定本地路径，则默认从示例程序所属项目对应本地路径中上传文件。
  const filePath = "C:\\Users\\demo.txt";

  await uploadFile(signedUrl, filePath);
})();
