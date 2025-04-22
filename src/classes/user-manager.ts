import fetchWithUrl from '../utils/fetch-with-url'
import TokenManager from '../utils/token-manager'
import TokenizedClass from '../utils/tokenized-class'

export default class UserManager extends TokenizedClass {
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
