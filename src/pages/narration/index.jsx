import Nav from "@/components/nav";
import { Layout } from "antd";
import Player from "@/components/player";
import Text from "@/components/text";

Component.displayName = "Narration";

export default function Component() {
  const src = "@/assets/example.mp3";

  return (
    <div className="flex">
      <Nav />
      <Layout className="flex-1 relative min-h-screen">
        <div className="">讲解页面</div>
        <Text />
        <div className="absolute bottom-0 left-0 right-0">
          <Player src={src} />
        </div>
      </Layout>
    </div>
  );
}
