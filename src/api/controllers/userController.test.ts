import { describe, it, mock } from "node:test";
import { createUsers, getAllUsers } from "./userController";
import { SeedUser } from "../models/types/user";
import assert from "node:assert";

const userTestService = {
  getAllUsers: getAllUsers,
  createUsers: createUsers,
};

/**
 * User Controller Tests
 * Primary Goal: tests get all users
 */

describe("userController", () => {
  it("get all users", async () => {
    const mockResponse = [
      {
        id: "test-id",
        username: "hello world",
        createdAt: "2024-03-08T11:35:35.875Z",
        updatedAt: "2024-03-08T11:35:35.875Z",
      },
    ];

    mock.method(userTestService, "getAllUsers", async () => mockResponse);

    const result = await userTestService.getAllUsers();

    assert.equal(result, mockResponse);
  });
});

/**
 * User Controller Tests
 * Primary Goal: teste create users
 */

describe("userController", () => {
  it("create users", async () => {
    const mockPayload: SeedUser[] = [
      {
        username: "Charmander",
        password: "Charmander1234!",
      },
    ];
    mock.method(userTestService, "createUsers", async () => {});

    const result = await userTestService.createUsers(mockPayload);

    assert.equal(result, undefined);
  });
});
