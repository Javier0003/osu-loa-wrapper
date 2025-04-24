import TokenManager from '../utils/token-manager'
import TokenizedClass from '../utils/tokenized-class'
import BeatmapsManager from './beatmaps-manager'
import UserManager from './user-manager'

/**
 * @description The main class for interacting with the osu! API.
 * @class OsuClient
 * @extends TokenizedClass
 * @property {BeatmapsManager} beatmap - The BeatmapsManager instance.
 * @property {UserManager} user - The UserManager instance.
 */
export default class OsuClient extends TokenizedClass {
  private readonly beatmapManager: BeatmapsManager
  private readonly userManager: UserManager
  /**
   * @param clientId - The client ID of the osu! API application.
   * @param clientSecret - The client secret of the osu! API application.
   */
  constructor(clientId: number, clientSecret: string) {
    super()
    TokenManager.init(clientId, clientSecret)
    this.beatmapManager = new BeatmapsManager()
    this.userManager = new UserManager()
  }

  /**
   * @description Returns the BeatmapsManager instance.
   * @returns {BeatmapsManager} The BeatmapsManager instance.
   */
  get beatmap() {
    return this.beatmapManager
  }

  /**
   * @description Returns the UserManager instance.
   * @returns {UserManager} The UserManager instance.
   */
  get user() {
    return this.userManager
  }
}
