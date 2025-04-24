import BeatmapsManager from '../classes/beatmaps-manager'
import OsuClient from "../classes/osu-client"
import UserManager from '../classes/user-manager'

require('dotenv').config()

const { CLIENT_ID: OSU_CLIENT_ID, CLIENT_SECRET: OSU_CLIENT_SECRET } = process.env

describe("osu-client", () => {
  const client = new OsuClient(Number(OSU_CLIENT_ID), OSU_CLIENT_SECRET!)

  it("proper instanciation", () => {
    expect(client).toBeInstanceOf(OsuClient)
    expect(client.beatmap).toBeDefined()
    expect(client.user).toBeDefined()
    expect(client.beatmap).toBeInstanceOf(BeatmapsManager)
    expect(client.user).toBeInstanceOf(UserManager)
  })

  it("should return the requested map", async () => {
    const requestedMap = 4942323
    const map = await client.beatmap.GetMapById(requestedMap)
    expect(map).toHaveProperty("id")
    expect(map.id).toBe(requestedMap)
  })

  it("shouldn't contain token even after request", () => {
    // @ts-ignore
    expect(client.token).toBeNull()
  })

  it("should return the requested map attributes", async () => {
    const requestedMap = 4942323
    const map = await client.beatmap.checkDifficultyRating(requestedMap, ["DT"], "osu")
    expect(map).toHaveProperty("attributes")
  })
})