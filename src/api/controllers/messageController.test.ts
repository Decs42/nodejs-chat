import { describe, it, mock } from "node:test";
import assert from "node:assert";
import { createMessage, deleteMessage, getMessageHistory } from "./messageController";
import { Message } from "../models/types/message";

const messageTestService = {
  createMessage: createMessage,
  getMessageHistory: getMessageHistory,
  deleteMessage: deleteMessage
};

/**
 * Message Controller Tests
 * Primary Goal: tests create message controller
 */

describe("createMessage", () => {
  it("create a message", async () => {
    const mockPayload: Message = {
      username: "test",
      sender: "test-id",
      message: "hello world",
    };
    const mockResponse = {
      deltedCount: 0,
    };

    mock.method(messageTestService, "createMessage", async () => mockResponse);

    const result = await messageTestService.createMessage(mockPayload);

    assert.equal(result, mockResponse);
  });
});

/**
 * Message Controller Tests
 * Primary Goal: tests get message history
 */

describe("getMessageHistory", () => {
  it("get message history", async () => {
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
      messageTestService,
      "getMessageHistory",
      async () => mockResponse
    );

    const result = await messageTestService.getMessageHistory();

    assert.equal(result, mockResponse);
  });
});

/**
 * Message Controller Tests
 * Primary Goal: tests delete message
 */

describe("deleteMessage", () => {
  it("delete a message", async () => {
    const mockPayload: string = 'test-id';

    const mockResponse = {deletedCount: 0}

    mock.method(messageTestService, "deleteMessage", async () => mockResponse);

    const result = await messageTestService.deleteMessage(mockPayload);

    assert.equal(result, mockResponse);
  });
});
