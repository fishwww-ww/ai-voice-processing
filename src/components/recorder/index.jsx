import React, { useState, useRef } from "react";
import axios from "axios";

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
    <div>
      <h2>Audio Recorder</h2>
      <div>
        <button onClick={startRecording} disabled={isRecording}>
          Start Recording
        </button>
        <br></br>
        <button onClick={stopRecording} disabled={!isRecording}>
          Stop Recording
        </button>
      </div>
      {audioURL && (
        <div>
          <h3>Recorded Audio:</h3>
          <audio controls src={audioURL}></audio>
        </div>
      )}
      <div>
        <button onClick={uploadAudio} disabled={!audioBlob}>
          Upload Audio
        </button>
      </div>
    </div>
  );
};

export default Recorder;
