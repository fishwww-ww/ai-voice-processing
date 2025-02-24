const fileURL =
  "https://examplebucket.oss-cn-hangzhou.aliyuncs.com/exampleobject.txt?x-oss-date=20241112T092756Z&x-oss-expires=3599&x-oss-signature-version=OSS4-HMAC-SHA256&x-oss-credential=LTAI5************/20241112/cn-hangzhou/oss/aliyun_v4_request&x-oss-signature=ed5a939feb8d79a389572719f7e2939939936d0**********";
const savePath = "C:/downloads/myfile.txt"; // 文件将在下载时使用的文件名

fetch(fileURL)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Server replied HTTP code: ${response.status}`);
    }
    return response.blob(); // 将响应转换为 blob
  })
  .then((blob) => {
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = savePath; // 设置下载文件的名字
    document.body.appendChild(link); // 此步骤确保链接存在于文档中
    link.click(); // 模拟点击下载链接
    link.remove(); // 完成后移除链接
    console.log("Download completed!");
  })
  .catch((error) => {
    console.error("Error during download:", error);
  });
