require('dotenv').config();

const {CLIENT_ID, CLIENT_SECRET} = process.env

describe("ENV", () => {
  it("client secret not undefined", () => {
    expect(CLIENT_SECRET).not.toBeUndefined()
    expect(CLIENT_SECRET).not.toBeNull()
    expect(CLIENT_SECRET).not.toBe("")
  })

  it("client id not undefined", () => {
    expect(CLIENT_ID).not.toBeUndefined()
    expect(CLIENT_ID).not.toBeNull()
    expect(CLIENT_ID).not.toBe("")
  })
})