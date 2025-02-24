import axios from "axios";

const baseURL = "";

export const getModelList = axios.get("get(baseURL+'/tts/v1/model')");

export const createModel = axios.post(
  "get(baseURL+'/tts/v1/model')"
  //   {
  //     model_name: "test",
  //     lang: "en",
  //   },
  //   {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }
);

export const tts = axios.post(
  "get(baseURL+'/tts/v1/tts')"
  //   {
  //     model_name: "test",
  //     lang: "en",
  //   },
  //   {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }
);

export const replaceVoice = axios.post(
  "get(baseURL+'/tts/v1/replace')"
  //   {
  //     model_name: "test",
  //     lang: "en",
  //   },
  //   {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }
);
