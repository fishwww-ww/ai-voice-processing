import axios from "axios";

// 使用Trae写的，未测试
export const Upload = async (filePath) => {
  try {
    // 获取上传策略
    const response = await axios.post("/base/policy/upload", {
      filePath: filePath,
    });

    if (response.status === 200 && response.data.signedUrl) {
      // 使用签名 URL 上传文件
      const fileStream = fs.createReadStream(filePath);
      const uploadResponse = await axios.put(
        response.data.signedUrl,
        fileStream,
        {
          headers: {
            "Content-Type": "application/octet-stream",
          },
        }
      );

      if (uploadResponse.status === 200) {
        console.log("文件上传成功");
        return uploadResponse.data;
      }
    }
  } catch (error) {
    console.error(`上传失败：${error.message}`);
    throw error;
  }
};

export const Download = async (filePath) => {
  try {
    // 获取下载策略
    const response = await axios.post("/base/policy/download", {
      filePath: filePath,
    });

    if (response.status === 200 && response.data.signedUrl) {
      // 使用签名URL下载文件
      const downloadResponse = await fetch(response.data.signedUrl);

      if (!downloadResponse.ok) {
        throw new Error(`下载失败: ${downloadResponse.status}`);
      }

      const blob = await downloadResponse.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = filePath.split("/").pop(); // 使用原文件名
      document.body.appendChild(link);
      link.click();
      link.remove();

      console.log("下载完成");
      return true;
    }
  } catch (error) {
    console.error(`下载失败：${error.message}`);
    throw error;
  }
};
