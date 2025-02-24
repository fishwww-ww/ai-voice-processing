import React, { useState, useEffect } from "react";

function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);

  // 请求麦克风权限并获取音频流
  const startRecording = async () => {
    try {
      // 请求麦克风权限
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      // 存储音频数据
      recorder.ondataavailable = (event) => {
        setAudioChunks((prev) => [...prev, event.data]);
      };

      // 当录音结束时生成音频文件
      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
        setAudioChunks([]); // 清空音频数据
      };

      recorder.start();
      setIsRecording(true);
      setMediaRecorder(recorder); // 保存录音器实例
    } catch (error) {
      console.error("录音权限获取失败:", error);
      alert("无法访问麦克风");
    }
  };

  // 停止录音
  const stopRecording = () => {
    mediaRecorder.stop(); // 停止录音
    setIsRecording(false);
  };

  useEffect(() => {
    // 清理资源
    return () => {
      if (mediaRecorder && mediaRecorder.state !== "inactive") {
        mediaRecorder.stop();
      }
    };
  }, [mediaRecorder]);

  useEffect(() => {
    console.log("audioChunks", audioChunks);
  }, []);

  return (
    <div className="mr-2">
      <h1>音频录制</h1>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? "停止录音" : "开始录音"}
      </button>
      {audioUrl && (
        <div>
          <h2>录音播放</h2>
          <audio controls src={audioUrl}></audio>
        </div>
      )}
    </div>
  );
}

export default AudioRecorder;
