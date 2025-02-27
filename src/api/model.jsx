import { get, post } from "./request";

export const getModelList = get("/tts/v1/model");

export const createModel = ({ nickName, voiceNames }) => {
  const requestData = {
    nickName,
    voiceNames: Array.isArray(voiceNames) ? voiceNames : [],
  };
  return post("/tts/v1/model", requestData);
};
