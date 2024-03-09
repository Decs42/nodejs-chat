import { describe, it, mock } from "node:test";
import { generateAccessToken, hashPassword, verifyToken } from "./authUtils";
import assert from "node:assert";
import { fetchAllusers } from "./userUtils";

const authUtilsTestService = {
  hashPassword: hashPassword,
  fetchAllUsers: fetchAllusers,
  generateUserToken: generateAccessToken,
  verifyToken: verifyToken,
};

/**
 * Auth Utils Tests
 * Primary Goal: tests hash a passowrd
 */

describe("hashPassword", () => {
  it("hash a password", () => {
    const mockPayload: string = "password";
    const mockResponse: string = "hashedPassword";

    mock.method(authUtilsTestService, "hashPassword", () => mockResponse);

    const result = authUtilsTestService.hashPassword(mockPayload);
    console.log(result);

    assert.equal(result, mockResponse);
  });
});

/**
 * Auth Utils Tests
 * Primary Goal: tests seeding db with users
 */

describe("seedUsers", () => {
  it("first gets all users", async () => {
    const mockResponse = [
      {
        id: "test-id",
        createdAt: "2024-03-08T11:35:35.875Z",
        updatedAt: "2024-03-08T11:35:35.875Z",
        username: "test",
      },
    ];

    mock.method(
      authUtilsTestService,
      "fetchAllUsers",
      async () => mockResponse
    );

    const result = await authUtilsTestService.fetchAllUsers();

    assert.equal(result, mockResponse);
  });
});

/**
 * Auth Utils Tests
 * Primary Goal: tests generation of user token
 */

describe("generateAccessToken", () => {
  it("generate a user token", () => {
    const mockPayloadOne: string = "test-id";
    const mockPayloadTwo: string = "test-username";
    const mockResponse: string = "token";

    mock.method(authUtilsTestService, "generateUserToken", () => mockResponse);

    const result = authUtilsTestService.generateUserToken(
      mockPayloadOne,
      mockPayloadTwo
    );

    assert.equal(result, mockResponse);
  });
});

/**
 * Auth Utils Tests
 * Primary Goal: tests verification of user token
 */

describe("verifyToken", () => {
  it("verify a user token", () => {
    const mockPayload: string = "token";
    const mockResponse = { userId: "test-id", userName: "test-username" };

    mock.method(authUtilsTestService, "verifyToken", () => mockResponse);

    const result = authUtilsTestService.verifyToken(mockPayload);

    assert.equal(result, mockResponse);
  });
});
