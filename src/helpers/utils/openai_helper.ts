import {
  AzureKeyCredential,
  ChatRequestMessage,
  GetChatCompletionsOptions,
  OpenAIClient,
} from "@azure/openai";
import config from "../../configs/global_config";

let client: OpenAIClient;

const initializeClient = () => {
  try {
    const newClient = new OpenAIClient(
      config.get("/llm/endpoint"),
      new AzureKeyCredential(config.get("/llm/apikey"))
    );
    client = newClient;

    console.log("^^^ OPENAI initialized successfully ^^^");
  } catch (error) {
    console.error(error);
  }
};

const getCurrentClient = () => {
  return client;
};

const getChatCompletions = async (
  prompts: ChatRequestMessage[],
  options?: GetChatCompletionsOptions
) => {
  const deploymentName = config.get("/llm/deploymentName");

  try {
    const result = await client.getChatCompletions(
      deploymentName,
      prompts,
      options
    );

    // const choice = result.choices[0];
    // const responseMessage = choice.message;

    // console.log(responseMessage);

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default {
  initializeClient,
  getCurrentClient,
  getChatCompletions,
};
