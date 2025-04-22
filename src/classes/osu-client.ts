import TokenManager from '../utils/token-manager'
import TokenizedClass from '../utils/tokenized-class'
import BeatmapsManager from './beatmaps-manager'
import UserManager from './user-manager'

export default class OsuClient extends TokenizedClass {
  private readonly beatmapManager: BeatmapsManager
  private readonly userManager: UserManager

  get beatmap() {
    return this.beatmapManager
  }

  get user() {
    return this.userManager
  }

  constructor(clientId: number, clientSecret: string) {
    super()
    TokenManager.init(clientId, clientSecret)
    this.beatmapManager = new BeatmapsManager()
    this.userManager = new UserManager()
  }
}
