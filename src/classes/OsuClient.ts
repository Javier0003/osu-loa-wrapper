import fetchWithUrl from '../utils/fetch-with-url'
import TokenManager from '../utils/token-manager'

export default class OsuClient {
  private readonly _clientId: number
  private readonly _clientSecret: string
  private token: string | null = null

  constructor(clientId: number, clientSecret: string) {
    this._clientSecret = clientSecret
    this._clientId = clientId
    TokenManager.init(clientId, clientSecret)
  }

  @TokenManager.TokenValidator
  public async getOsuMap(id: number): Promise<Beatmap> {
    const res = await fetchWithUrl<Beatmap>(`beatmaps/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
    })
    return res
  }

  @TokenManager.TokenValidator
  async getOsuRecent(user: number): Promise<Score[]> {
    const json = await fetchWithUrl<Score[]>(
      `users/${user}/scores/recent?include_fails=1&mode=osu&limit=5`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
      }
    )
    return json
  }

  @TokenManager.TokenValidator
  async userScores(mapId: number, osuId: number) {
    const res = await fetchWithUrl<UserScores>(
      `beatmaps/${mapId}/scores/users/${osuId}/all`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
      }
    )
    return res
  }

  @TokenManager.TokenValidator
  async GetMapById(mapId: number): Promise<Beatmap> {
    const data = await fetchWithUrl<Beatmap>(`beatmaps/${mapId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
    })
    return data
  }

  @TokenManager.TokenValidator
  async getUserData(value: number) {
    const res = await fetchWithUrl<UserData>(`users/${value}/osu`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
    })

    return res
  }

  @TokenManager.TokenValidator
  async checkDifficultyRating(id: number, selectedMods: mods[]) {
    const data = await fetchWithUrl<BeatmapAttributes>(`beatmaps/${id}/attributes`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify({
        ruleset: 'osu',
        mods: selectedMods,
      }),
    })

    return data
  }
}
