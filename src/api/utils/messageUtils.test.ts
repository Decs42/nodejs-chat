import assert from "node:assert";
import { describe, it, mock } from "node:test";
import { fetchAllChats } from "./messageUtils";
import {
  createMessage,
  deleteMessage,
  getMessageHistory,
} from "../controllers/messageController";
import { Message } from "../models/types/message";

const messageUtilsTestService = {
  fetchAllChats: fetchAllChats,
  getMessageHistory: getMessageHistory,
  createMessage: createMessage,
  deleteMessage: deleteMessage
};

/**
 * Message Utils Tests
 * Primary Goal: tests fetching of all chats
 */

describe("fetchAllChats", () => {
  it("fetch all chats", async () => {
    const mockResponse = [
      {
        id: "test-id",
        message: "hello world",
        sender: "test-id",
        createdAt: "2024-03-08T11:35:35.875Z",
        updatedAt: "2024-03-08T11:35:35.875Z",
        username: "test",
      },
    ];

    mock.method(
      messageUtilsTestService,
      "getMessageHistory",
      async () => mockResponse
    );

    const result = await messageUtilsTestService.getMessageHistory();

    assert.equal(result, mockResponse);
  });
});

/**
 * Message Utils Tests
 * Primary Goal: tests creating chat message
 */

describe("createChatMessage", () => {
  it("create chat message", async () => {
    const mockPayload: Message = {
      username: "test",
      sender: "test-id",
      message: "hello world",
    };
    const mockResponse = {
      deltedCount: 0,
    };

    mock.method(
      messageUtilsTestService,
      "createMessage",
      async () => mockResponse
    );

    const result = await messageUtilsTestService.createMessage(mockPayload);

    assert.equal(result, mockResponse);
  });
});

/**
 * Message Utils Tests
 * Primary Goal: tests deletion of chat message
 */

describe("deleteChatMessage", () => {
  it("delete chat message", async () => {
    const mockPayload: string = 'test-id';

    const mockResponse = {deletedCount: 0}

    mock.method(messageUtilsTestService, "deleteMessage", async () => mockResponse);

    const result = await messageUtilsTestService.deleteMessage(mockPayload);

    assert.equal(result, mockResponse);
  });
});
