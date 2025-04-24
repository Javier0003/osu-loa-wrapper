import fetchWithUrl from '../utils/fetch-with-url'
import TokenManager from '../utils/token-manager'
import TokenizedClass from '../utils/tokenized-class'


export default class BeatmapsManager extends TokenizedClass{

  /**
   * @description Fetches a beatmap by its ID.
   * @param {number} id - The ID of the beatmap.
   * @returns {Promise<Beatmap>} The beatmap data.
   */
  @TokenManager.TokenValidator
  public async GetMapById(id: number): Promise<Beatmap> {
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

  /**
   * @description Fetches the attributes of a beatmap.
   * @param {number} id - The ID of the beatmap.
   * @param {mods[]} selectedMods - The selected mods.
   * @param {Ruleset} ruleset - The ruleset to use.
   * @returns {Promise<BeatmapAttributes>} The beatmap attributes.
   */
  @TokenManager.TokenValidator
  public async checkDifficultyRating(id: number, selectedMods: mods[], ruleset: Ruleset): Promise<BeatmapAttributes> {
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
