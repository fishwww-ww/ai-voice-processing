import { createBrowserRouter } from "react-router-dom";
import VoiceBase from "@/pages/voicebase";
import Narration from "@/pages/narration";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <VoiceBase />,
  },
  {
    path: "/narration",
    element: <Narration />,
  },
]);
