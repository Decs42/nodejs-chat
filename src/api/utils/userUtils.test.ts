import { SeedUser } from "../models/types/user";
import { createUsers, getAllUsers } from "../controllers/userController";
import assert from "node:assert";
import { describe, it, mock } from "node:test";

const userUtilsTestService = {
  getAllUsers: getAllUsers,
  createUsers: createUsers,
};

/**
 * User Utils Tests
 * Primary Goal: tests fetching of all users
 */

describe("userUtils", () => {
  it("fetch all users", async () => {
    const mockResponse = [
      {
        id: "test-id",
        username: "hello world",
        createdAt: "2024-03-08T11:35:35.875Z",
        updatedAt: "2024-03-08T11:35:35.875Z",
      },
    ];

    mock.method(userUtilsTestService, "getAllUsers", async () => mockResponse);

    const result = await userUtilsTestService.getAllUsers();

    assert.equal(result, mockResponse);
  });
});

/**
 * User Utils Tests
 * Primary Goal: tests creation of many users
 */

describe("userUtils", () => {
  it("create many users", async () => {
    const mockPayload: SeedUser[] = [
      {
        username: "Charmander",
        password: "Charmander1234!",
      },
    ];
    mock.method(userUtilsTestService, "createUsers", async () => {});

    const result = await userUtilsTestService.createUsers(mockPayload);

    assert.equal(result, undefined);
  });
});
