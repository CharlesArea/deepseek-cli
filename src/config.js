import Conf from "conf";

const config = new Conf({
  projectName: "deepseek-cli",
  defaults: {
    apiKey: "",
    model: "deepseek-chat",
    baseURL: "https://api.deepseek.com",
    temperature: 1.0,
    systemPrompt: "You are a helpful assistant.",
    maxTokens: 4000,
  },
});

export default config;
