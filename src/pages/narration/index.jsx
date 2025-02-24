import Nav from "@/components/nav";
import { Layout } from "antd";
import Player from "../../components/player";

Component.displayName = "Narration";

export default function Component() {
  return (
    <div className="flex">
      <Nav />
      <Layout className="flex-1 relative min-h-screen">
        <div className="">讲解页面</div>
        <div className="absolute bottom-0 left-0 right-0">
          <Player />
        </div>
      </Layout>
    </div>
  );
}
