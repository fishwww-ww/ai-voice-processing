import Nav from "@/components/nav";
import { Button, Layout } from "antd";
import AudioRecorder from "../../components/ar";
import Recorder from "../../components/recorder";

Component.displayName = "VoiceBase";

export default function Component() {
  return (
    <div className="flex">
      <Nav />
      <Layout className="flex-1 relative min-h-screen">
        <div className="">样本库页面</div>
        <div>
          <Button type="primary">录制</Button>
          <Recorder />
        </div>
      </Layout>
    </div>
  );
}
