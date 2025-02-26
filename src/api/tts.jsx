import { post } from "./request";

export const tts = ({
  textName,
  nickName,
  language,
  engine,
  speakerId,
  speed,
  refinePrompt,
}) => {
  const requestData = {
    textName,
    nickName,
    language,
    engine,
    speakerId: Number(speakerId),
    speed: Number(speed),
    refinePrompt,
  };
  return post("/tts/v1/tts", requestData);
};

export const replaceVoice = ({ nickName, targetVoiceName }) => {
  const requestData = {
    nickName,
    targetVoiceName,
  };
  return post("/tts/v1/replace", requestData);
};
