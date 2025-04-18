declare type osuToken = {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token: string
}

declare interface UserScores {
  scores: ScoreBest[]
}

declare interface ScoreBest {
  accuracy: number
  best_id: number
  created_at: Date
  id: number
  max_combo: number
  mode: string
  mode_int: number
  mods: mods[]
  passed: boolean
  perfect: boolean
  pp: number
  rank: string
  replay: boolean
  score: number
  statistics: Statistics
  type: string
  user_id: number
  current_user_attributes: CurrentUserAttributes
}

declare interface CurrentUserAttributes {
  pin: null
}

declare interface Statistics {
  count_100: number
  count_300: number
  count_50: number
  count_geki: null
  count_katu: null
  count_miss: number
}

declare interface UserData {
  avatar_url: string
  country_code: string
  default_group: string
  id: number
  is_active: boolean
  is_bot: boolean
  is_deleted: boolean
  is_online: boolean
  is_supporter: boolean
  last_visit: Date
  pm_friends_only: boolean
  profile_colour: null
  username: string
  cover_url: string
  discord: null
  has_supported: boolean
  interests: string
  join_date: Date
  location: null
  max_blocks: number
  max_friends: number
  occupation: null
  playmode: string
  playstyle: string[]
  post_count: number
  profile_hue: null
  profile_order: string[]
  title: null
  title_url: null
  twitter: null
  website: null
  country: Country
  cover: Cover
  kudosu: Kudosu
  account_history: any[]
  active_tournament_banner: null
  active_tournament_banners: any[]
  badges: any[]
  beatmap_playcounts_count: number
  comments_count: number
  current_season_stats: null
  daily_challenge_user_stats: DailyChallengeUserStats
  favourite_beatmapset_count: number
  follower_count: number
  graveyard_beatmapset_count: number
  groups: any[]
  guest_beatmapset_count: number
  loved_beatmapset_count: number
  mapping_follower_count: number
  monthly_playcounts: Count[]
  nominated_beatmapset_count: number
  page: Page
  pending_beatmapset_count: number
  previous_usernames: string[]
  rank_highest: RankHighest
  ranked_beatmapset_count: number
  replays_watched_counts: Count[]
  scores_best_count: number
  scores_first_count: number
  scores_pinned_count: number
  scores_recent_count: number
  statistics: UserStatistics
  support_level: number
  team: null
  user_achievements: UserAchievement[]
  rank_history: RankHistory
  rankHistory: RankHistory
  ranked_and_approved_beatmapset_count: number
  unranked_beatmapset_count: number
}

interface Country {
  code: string
  name: string
}

interface Cover {
  custom_url: string
  url: string
  id: null
}

interface DailyChallengeUserStats {
  daily_streak_best: number
  daily_streak_current: number
  last_update: Date
  last_weekly_streak: Date
  playcount: number
  top_10p_placements: number
  top_50p_placements: number
  user_id: number
  weekly_streak_best: number
  weekly_streak_current: number
}

interface Kudosu {
  available: number
  total: number
}

interface Count {
  start_date: Date
  count: number
}

interface Page {
  html: string
  raw: string
}

interface RankHistory {
  mode: string
  data: number[]
}

interface RankHighest {
  rank: number
  updated_at: Date
}

interface UserStatistics {
  count_100: number
  count_300: number
  count_50: number
  count_miss: number
  level: Level
  global_rank: number
  global_rank_exp: null
  pp: number
  pp_exp: number
  ranked_score: number
  hit_accuracy: number
  play_count: number
  play_time: number
  total_score: number
  total_hits: number
  maximum_combo: number
  replays_watched_by_others: number
  is_ranked: boolean
  grade_counts: GradeCounts
  country_rank: number
  rank: Rank
}

interface GradeCounts {
  ss: number
  ssh: number
  s: number
  sh: number
  a: number
}

interface Level {
  current: number
  progress: number
}

interface Rank {
  country: number
}

interface UserAchievement {
  achieved_at: Date
  achievement_id: number
}
