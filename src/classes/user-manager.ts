import fetchWithUrl from '../utils/fetch-with-url'
import TokenManager from '../utils/token-manager'
import TokenizedClass from '../utils/tokenized-class'

export default class UserManager extends TokenizedClass {
  /**
   * @description Fetches the recent scores of a user.
   * @param {number} user - The ID of the user.
   * @returns {Promise<Score[]>} The recent scores of the user.
   */
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

  /**
   * @description Fetches the recent scores of a user in a specific mode.
   * @param {number} mapId - The ID of the map.
   * @param {number} osuId - The ID of the user.
   * @returns {Promise<UserScores>} The recent scores of the user in the specified mode.
   */
  @TokenManager.TokenValidator
  public async userScores(mapId: number, osuId: number): Promise<UserScores> {
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

  /**
   * @description Fetches the user data of a specific user.
   * @param {number} value - The ID of the user.
   * @returns {Promise<UserData>} The user data of the specified user.
   */
  @TokenManager.TokenValidator
  public async getUserData(value: number): Promise<UserData> {
    const res = await fetchWithUrl<UserData>(`users/${value}/osu`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
    })

    return res
  }

  /**
   * @description Fetches the recent activity of a user.
   * @param {number} id - The ID of the user.
   * @param {ActivityParams} params - The parameters for the activity request.
   * @returns {Promise<RecentUserActivity>} The recent activity of the specified user.
   */
  @TokenManager.TokenValidator
  async getUserRecentActivity(id: number, params?: ActivityParams): Promise<RecentUserActivity> {
    const res = await fetchWithUrl<RecentUserActivity>(`users/${id}/recent_activity`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      body: params ? JSON.stringify(params) : undefined,
    })

    return res
  }
}
