
import WebSocket from "ws";import { handleConnectionError } from "../../utils/websocketUtils";
import { ALLOWED_CLIENT_MESSAGES } from "../../constants/global";
import { ParsedMessage } from "../types/message";

/**
 * Validations
 * Primary Goal: Validate client message request
 */

export const validateMessageRequest = (message: WebSocket.RawData, ws: WebSocket) => {
  try {
    if (!message) {
      throw new Error("valid JSON required");
    }

    const parsedJson: ParsedMessage = JSON.parse(message.toString());

    if (!parsedJson.action || !parsedJson.data) {
      return handleConnectionError(
        ws,
        new Error("action and data are required")
      );
    } else if (!ALLOWED_CLIENT_MESSAGES.includes(parsedJson.action)) {
      return handleConnectionError(
        ws,
        new Error("action needs to be a valid message action")
      );
    } else if (
      typeof parsedJson.action !== "string" ||
      typeof parsedJson.data !== "string"
    ) {
      return handleConnectionError(
        ws,
        new Error("data and/or action needs to be type string")
      );
    }
  } catch (error) {
    return handleConnectionError(ws, new Error("valid JSON required"));
  }
  return true;
};
