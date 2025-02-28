import React, { useState, useRef } from "react";
import axios from "axios";
import { Button, Space } from "antd";

const Recorder = () => {
  const [isRecording, setIsRecording] = useState(false); // 录音状态
  const [audioURL, setAudioURL] = useState(""); // 用于存储音频播放链接
  const [audioBlob, setAudioBlob] = useState(null); // 用于存储音频 Blob
  const mediaRecorderRef = useRef(null); // 用于存储 MediaRecorder 实例
  const audioChunksRef = useRef([]); // 用于存储音频片段

  // 启动录音
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      // 收集音频数据
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      // 录音结束时处理音频数据
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl); // 设置音频播放链接
        setAudioBlob(audioBlob); // 存储音频数据
        audioChunksRef.current = []; // 重置音频片段
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing the microphone:", error);
    }
  };

  // 停止录音
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // 上传音频
  const uploadAudio = async () => {
    if (!audioBlob) {
      alert("No audio recorded yet!");
      return;
    }

    const formData = new FormData();
    formData.append("file", audioBlob, "recording.wav");

    try {
      const response = await axios.post("https://recorder.com", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Upload successful:", response.data);
    } catch (error) {
      console.error("Error uploading audio:", error);
    }
  };

  return (
    <div className="p-4">
      <Space direction="vertical" size="middle" className="w-full">
        <Space>
          <Button
            type="primary"
            onClick={startRecording}
            disabled={isRecording}
          >
            Start Recording
          </Button>
          <Button
            type="primary"
            onClick={stopRecording}
            disabled={!isRecording}
            // loading={isRecording}
          >
            Stop Recording
          </Button>
        </Space>

        {audioURL && (
          <div className="border p-4 rounded-lg bg-gray-50">
            <h3 className="mb-2 text-lg font-medium">录音预览</h3>
            <audio controls src={audioURL} className="w-full"></audio>
            <Button
              type="primary"
              onClick={uploadAudio}
              disabled={!audioBlob}
              className="mt-4"
            >
              上传录音
            </Button>
          </div>
        )}
      </Space>
    </div>
  );
};

export default Recorder;
