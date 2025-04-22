declare type Beatmap = {
  beatmapset_id: number
  difficulty_rating: number
  id: number
  mode: string
  status: string
  total_length: number
  user_id: number
  version: string
  accuracy: number
  ar: number
  bpm: number
  convert: boolean
  count_circles: number
  count_sliders: number
  count_spinners: number
  cs: number
  deleted_at: string | null
  drain: number
  hit_length: number
  is_scoreable: boolean
  last_updated: string
  mode_int: number
  passcount: number
  playcount: number
  ranked: number
  url: string
  checksum: string
  beatmapset: {
    artist: string
    artist_unicode: string
    covers: {
      cover: string
      'cover@2x': string
      card: string
      'card@2x': string
      list: string
      'list@2x': string
      slimcover: string
      'slimcover@2x': string
    }
    creator: string
    favourite_count: number
    hype: null | number
    id: number
    nsfw: boolean
    offset: number
    play_count: number
    preview_url: string
    source: string
    spotlight: boolean
    status: string
    title: string
    title_unicode: string
    track_id: number | null
    user_id: number
    video: boolean
    bpm: number
    can_be_hyped: boolean
    deleted_at: string | null
    discussion_enabled: boolean
    discussion_locked: boolean
    is_scoreable: boolean
    last_updated: string
    legacy_thread_url: string
    nominations_summary: {
      current: number
      eligible_main_rulesets: unknown[] // Replace with appropriate type if known
      required_meta: { [key: string]: unknown } // Replace with appropriate type if known
    }
    ranked: number
    ranked_date: string | null
    storyboard: boolean
    submitted_date: string
    tags: string
    availability: {
      download_disabled: boolean
      more_information: string | null
    }
    ratings: number[]
  }
  failtimes: {
    exit: number[]
    fail: number[]
  }
  max_combo: number
}

declare type BeatmapAttributes = {
  attributes: {
    star_rating: number
    max_combo: number
    aim_difficulty: number
    aim_difficult_slider_count: number
    speed_difficulty: number
    speed_note_count: number
    slider_factor: number
    aim_difficult_strain_count: number
    speed_difficult_strain_count: number
  }
}

declare type mods =
  | 'HD'
  | 'DT'
  | 'HR'
  | 'NF'
  | 'EZ'
  | 'HT'
  | 'SD'
  | 'NC'
  | 'PF'
  | 'FL'
  | 'RX'
  | 'AP'
  | 'SO'
  | 'nomod'

declare type OsuRanks = 'D' | 'C' | 'B' | 'A' | 'S' | 'SS' | 'SH' | 'SSH'

declare type Ruleset = 'fruits' | 'osu' | 'taiko' | 'mania'