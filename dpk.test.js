const crypto = require("crypto");
const { deterministicPartitionKey } = require("./dpk.refactored");
jest.mock("crypto", () => {
  return {
    createHash: jest.fn(() => {
      return {
        update: jest.fn(() => {
          return {
            digest: jest.fn(() => {
              return "mockedHash";
            }),
          };
        }),
      };
    }),
  };
});

describe("deterministicPartitionKey", () => {
  //if (!event) 0 is string
  //Returns the literal 0 when given no input
  it("Returns the literal 0 when given no input", () => {
    const expectedReturn = deterministicPartitionKey();
    expect(expectedReturn).toBe("0");
  });
});
describe("deterministicPartitionKey", () => {
  //if (!event) event is null
  //returns 0 if event is falsy
  it("returns 0 if event is falsy", () => {
    expect(deterministicPartitionKey(null)).toBe("0");
  });

  it("returns event.partitionKey if it exists", () => {
    // partitionKey is string
    //event.partitionKey if it exists
    const event = { partitionKey: "partitionKey" };
    expect(deterministicPartitionKey(event)).toBe("partitionKey");
  });

  it("returns hashed string if event.partitionKey does not exist and stringified event length is greater than 256", () => {
    const event = { somePartKey: "a".repeat(300) };
    //event.length > MAX_PARTITION_KEY_LENGTH=256
    expect(deterministicPartitionKey(event)).toBe("mockedHash");
    expect(crypto.createHash).toHaveBeenCalledWith("sha3-512");
  });

  it("returns stringified event if event.partitionKey does not exist and stringified event length is less than or equal to 256", () => {
    const event = "a".repeat(300);
    //event.length > MAX_PARTITION_KEY_LENGTH=256
    expect(deterministicPartitionKey(event)).toBe("mockedHash");
    expect(crypto.createHash).toHaveBeenCalledWith("sha3-512");
  });
});
