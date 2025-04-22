import fetchWithUrl from '../utils/fetch-with-url'
import TokenManager from '../utils/token-manager'
import TokenizedClass from '../utils/tokenized-class'

export default class BeatmapsManager extends TokenizedClass{
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
  async checkDifficultyRating(id: number, selectedMods: mods[], ruleset: Ruleset): Promise<BeatmapAttributes> {
    const data = await fetchWithUrl<BeatmapAttributes>(
      `beatmaps/${id}/attributes`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify({
          ruleset: ruleset,
          mods: selectedMods,
        }),
      }
    )

    return data
  }
}
