import Nav from "@/components/nav";
import { Layout } from "antd";
import AudioRecorder from "../../components/ar";
import Recorder from "../../components/recorder";

Component.displayName = "VoiceBase";

export default function Component() {
  return (
    <div className="flex">
      <Nav />
      <Layout>
        <div className="min-h-screen">样本库页面</div>
        <AudioRecorder />
        <Recorder />
      </Layout>
    </div>
  );
}
