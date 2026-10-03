export type SeoPage = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  lede: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export const seoPages: SeoPage[] = [
  {
    slug: "music-promotion",
    title: "Music promotion for independent artists",
    description: "How ClassicalPromo plans, runs and reports a music promotion campaign across playlists, creators, radio, DJs, blogs and press.",
    eyebrow: "Promotion",
    heading: "Music promotion, scoped as work.",
    lede: "A campaign is a set of introductions, servicing tasks and reports. It is not a promise that a song will travel on its own.",
    sections: [
      {
        heading: "What the work actually is",
        paragraphs: [
          "ClassicalPromo helps artists, managers and labels take a finished song to the people who might play it, post it, programme it or write about it. That includes independent playlist curators, TikTok and Instagram creators, YouTube channels, radio stations, DJs, music blogs and press.",
          "Each channel is chosen because it fits the record and the market. A campaign for a Lagos club single should not look identical to a gospel release or a London R&B single. The brief is written down before the work starts: services, countries, duration, budget and the report you will receive.",
        ],
      },
      {
        heading: "Activity and outcomes",
        paragraphs: [
          "We report campaign activity: who was contacted, what was published, which stations were serviced, which replies came back. Streams, followers, views and airplay are outcomes controlled by audiences and third parties. They are not line items we sell.",
          "If a figure is not available, the report says so. Estimating a result to fill a dashboard is not part of the service.",
        ],
      },
      {
        heading: "Who it is for",
        paragraphs: [
          "Independent artists use ClassicalPromo to run a first serious release push. Managers and labels use it to keep several artists and several channels in one place. Partners in the network — curators, DJs, stations, creators and writers — are reviewed before they are marked verified.",
          "You can pitch a song without pretending the campaign is already won. Start with the record, the audience and a budget you can complete.",
        ],
      },
    ],
  },
  {
    slug: "music-promotion-nigeria",
    title: "Music promotion in Nigeria",
    description: "How to promote a song in Nigeria across Lagos, Abuja, Port Harcourt and the diaspora, with radio, DJs, blogs, creators and playlists.",
    eyebrow: "Nigeria",
    heading: "Promotion built around Nigerian release reality.",
    lede: "Nigeria is not one audience. A useful campaign names the cities, the format and the people who can actually use the song.",
    sections: [
      {
        heading: "Start with a city and a format",
        paragraphs: [
          "Lagos club DJs, Abuja radio, Port Harcourt stations and diaspora listeners in London can all matter. They do not require the same assets or the same week. ClassicalPromo asks for the markets up front so the servicing list matches the record.",
          "Afrobeats, Afropop, Amapiano, Hip-Hop, R&B, Gospel, Highlife, Fuji and Alternative records each have their own desks. A pitch that hides the genre wastes the first reply.",
        ],
      },
      {
        heading: "Channels that usually belong in a Nigerian plan",
        paragraphs: [
          "DJs and radio still move records that people hear in public. Independent playlist curators help streaming discovery, but they are not the same thing as a platform’s editorial team. Creators can carry a hook. Blogs and press carry the story. Advertising can extend a moment that is already clear.",
          "Audiomack, YouTube, Instagram and TikTok may all be relevant. None of them is a guarantee of an audience. The campaign records what was done on each one.",
        ],
      },
      {
        heading: "A budget that finishes",
        paragraphs: [
          "Prices are shown in naira and can be scoped in other currencies. A starter push can cover a tight outreach list. A larger release can add radio, DJs, creators and press under one timeline. Custom work for labels is written as a scope, not a slogan.",
          "We do not sell artificial streams to decorate a Nigerian campaign. The report is there so you can decide whether to run the next single the same way.",
        ],
      },
    ],
  },
  {
    slug: "spotify-playlist-promotion",
    title: "Independent playlist pitching",
    description: "What independent playlist promotion is, how curator outreach works, and why ClassicalPromo does not promise Spotify editorial placement.",
    eyebrow: "Playlists",
    heading: "Pitch the song to curators who already have a playlist.",
    lede: "Independent playlist promotion is a pitching service. It is not access to a streaming service’s editorial team.",
    sections: [
      {
        heading: "Two different doors",
        paragraphs: [
          "Editorial playlists are programmed by the streaming service. Independent playlists are programmed by curators. ClassicalPromo pitches relevant independent curators. We do not claim official editorial access, and we do not guarantee placement on any playlist.",
          "A curator adds a record because it fits the playlist they run. Genre, mood, language and territory matter more than a generic request to “get on playlists”.",
        ],
      },
      {
        heading: "What you receive",
        paragraphs: [
          "You receive a record of curators contacted, responses, and placements they report. A placement is something a curator confirms. A screenshot without that relationship is not treated as a result.",
          "Streams that may follow a placement show up in your own distributor. They are not a number we attach to the invoice in advance.",
        ],
      },
      {
        heading: "How to prepare the pitch",
        paragraphs: [
          "Send one song, a working link, accurate credits, and two records that sit beside it. If the song is not out yet, say the date. Private links that expire on the morning of the pitch waste the curator’s time and your budget.",
          "Read the Academy note on playlist pitching before you brief a campaign. The same rules apply whether the listener is in Lagos, Accra or London.",
        ],
      },
    ],
  },
  {
    slug: "tiktok-music-promotion",
    title: "TikTok music promotion",
    description: "How ClassicalPromo runs TikTok creator outreach for a song without promising virality or view counts.",
    eyebrow: "TikTok",
    heading: "Creator outreach for a song, not a viral promise.",
    lede: "TikTok promotion connects a release with relevant creators and audiences. It does not guarantee a viral video.",
    sections: [
      {
        heading: "Fit before volume",
        paragraphs: [
          "The useful question is which creators already talk to the people who might like this record. A dance record, a lyric record and a comedy-adjacent hook do not share a creator list. ClassicalPromo builds the list from the brief, then contacts creators with the audio and a short context.",
          "Creators decide whether to post. A campaign can count contacts and published posts. It cannot count posts that were never made.",
        ],
      },
      {
        heading: "Views only when they exist",
        paragraphs: [
          "If a creator or an advertising account provides view and engagement figures, they can appear in the report. If they do not, the line reads awaiting campaign data. We will not invent a view count to make a week look successful.",
          "Paid amplification, when you want it, is scoped as advertising with its own spend. It is not quietly blended into an organic creator fee.",
        ],
      },
      {
        heading: "What to send",
        paragraphs: [
          "Clear audio, permission to use it, a vertical clip if you have one, and a single hook. Creators should not have to guess which eight bars matter. They should also be allowed to sound like themselves.",
          "If the sound does not travel, that is information. The next release can change the hook, the creator pool, or the decision to lead with TikTok at all.",
        ],
      },
    ],
  },
  {
    slug: "instagram-music-promotion",
    title: "Instagram music promotion",
    description: "Instagram creator and audience campaigns for releases, reported as activity rather than guaranteed reach.",
    eyebrow: "Instagram",
    heading: "Instagram campaigns built around the people who would care.",
    lede: "Connect the release with relevant creators and audiences. Reach is observed when it is measured, not promised in the proposal.",
    sections: [
      {
        heading: "Posts, stories and paid support",
        paragraphs: [
          "An Instagram campaign can include creator posts, stories and, separately, ads. Each one needs a creative that fits the placement. A square press photo is not a Reel. A Reel without a caption strategy is just a file.",
          "We look for creators and editors whose existing posts already sit near your genre. Borrowing an unrelated audience produces a spike that does not become listeners.",
        ],
      },
      {
        heading: "Reporting without theatre",
        paragraphs: [
          "The report lists accounts contacted and posts that published. Interactions are included when they are available from the creator or the ad account. Follower growth is not a deliverable.",
          "ClassicalPromo does not buy fake likes, comments or followers, and partner listings are not allowed to promise them.",
        ],
      },
      {
        heading: "Use it with the rest of the release",
        paragraphs: [
          "Instagram works better when the profile, the bio link and the press photos agree with the campaign. Branding support can clean that up before outreach begins.",
          "Pair the posts with playlist, DJ or radio work if those channels match the song. Social attention without a next step is a moment. A campaign should know what the moment is for.",
        ],
      },
    ],
  },
  {
    slug: "radio-promotion",
    title: "Radio promotion for new music",
    description: "How radio servicing works: stations, presenters, confirmations and verified spins, without guaranteed airplay.",
    eyebrow: "Radio",
    heading: "Radio servicing, with confirmations kept honest.",
    lede: "We contact stations and presenters who can play the record. Airplay is their decision.",
    sections: [
      {
        heading: "A servicing pack, not a blast",
        paragraphs: [
          "Radio promotion at ClassicalPromo means a shortlist, a pack, and follow-up. The pack carries the song, credits, a short biography and the cities you care about. Presenters and producers are contacted because the show fits the genre.",
          "A nationwide claim with no station list is not a radio campaign. You should be able to see which stations were serviced.",
        ],
      },
      {
        heading: "Confirmations are not spins",
        paragraphs: [
          "A confirmation means a person at the station said they would support the record. A spin is counted when it is verified. Unconfirmed airplay is not upgraded into a number for the closing report.",
          "Some stations will decline. Declines belong in the log. They stop you from servicing the same wrong desk on the next single.",
        ],
      },
      {
        heading: "Where this fits",
        paragraphs: [
          "Radio still matters for records that people hear away from their own headphones: gospel, highlife, Fuji, Afrobeats, hip-hop and regional formats. It is often paired with DJ servicing so the club and the show are not briefed differently.",
          "International artists can service African stations when the record and the story make sense for that audience. The brief should say why.",
        ],
      },
    ],
  },
  {
    slug: "dj-promotion",
    title: "DJ promotion for releases",
    description: "How DJ servicing works for clubs, mixes and selectors, and what a DJ campaign report includes.",
    eyebrow: "DJs",
    heading: "Get the song to selectors who might actually play it.",
    lede: "DJ promotion is servicing and follow-up. It is not a receipt for a fixed number of club plays.",
    sections: [
      {
        heading: "City, genre, night",
        paragraphs: [
          "A DJ in Lagos, Accra, Johannesburg, Nairobi or London is not interchangeable. The campaign names the cities and the genres. Afrobeats, Amapiano, Dancehall, Hip-Hop and R&B nights do not share one crate.",
          "DJs receive the song with a plain note: tempo or feel, language, and where it sits in a night. One lead record. A working link.",
        ],
      },
      {
        heading: "What the report shows",
        paragraphs: [
          "You see DJs serviced and responses. Reported support is included when a DJ says they played it or will play it. Silence is silence. It is not converted into an estimated number of plays.",
          "Partner DJs on ClassicalPromo are reviewed before they are verified. Their contact details stay off the public directory.",
        ],
      },
      {
        heading: "After the campaign",
        paragraphs: [
          "The DJs who reply are the useful asset. Keep them. The next release should start with people who already know your name, then add a careful new list.",
          "Read the Academy guide on pitching DJs before you upload a folder of unfinished edits.",
        ],
      },
    ],
  },
  {
    slug: "afrobeats-promotion",
    title: "Afrobeats promotion",
    description: "How to promote Afrobeats and Afropop records in Nigeria and across diaspora audiences without generic campaign promises.",
    eyebrow: "Afrobeats",
    heading: "Afrobeats promotion with a specific audience.",
    lede: "The genre is global. A good campaign is still local enough to name a city, a selector and a listener.",
    sections: [
      {
        heading: "Do not brief “Afrobeats worldwide” and stop",
        paragraphs: [
          "Afrobeats and Afropop records travel, and they also belong to particular scenes. A campaign should say whether the lead market is Nigeria, Ghana, the UK, the US, or a combination. Diaspora playlists and home radio are related. They are not the same phone call.",
          "Language, feature list and tempo change the desks. A record with a Yoruba chorus and a record aimed at pop radio should not share a copy-paste pitch.",
        ],
      },
      {
        heading: "A channel mix that respects the song",
        paragraphs: [
          "Club-led records need DJs. Story-led records need press, blogs and a clear video plan. Most releases need a relevant independent playlist pitch and a creator plan for the hook. Advertising can support a defined audience after the creative is ready.",
          "ClassicalPromo will not dress an Afrobeats campaign in guaranteed editorial placements or guaranteed streams. The artists and managers who use the platform should be able to show the report to a label without translating the adjectives.",
        ],
      },
      {
        heading: "The wider catalogue",
        paragraphs: [
          "The same desk also works on Amapiano, Highlife, Fuji, Hip-Hop, R&B, Gospel, Dancehall, Pop and Alternative. Afrobeats is a focus, not a limitation. If the song sits between genres, say so in the pitch. The recommendation will follow the goals and the budget, not a template slogan.",
        ],
      },
    ],
  },
  {
    slug: "music-blog-promotion",
    title: "Music blog promotion",
    description: "How music blog pitching works, what gets published, and how ClassicalPromo reports coverage.",
    eyebrow: "Blogs",
    heading: "Pitch a story a blog can actually publish.",
    lede: "Blog promotion is editor outreach. Publication is the editor’s decision.",
    sections: [
      {
        heading: "A reason to write",
        paragraphs: [
          "“New song out” is a caption, not a pitch. Bloggers need a reason: a scene, a producer, a city, a first, a collaboration, a video, a return. ClassicalPromo writes that reason with you and sends it to outlets that cover the genre.",
          "West African, UK and diaspora blogs do not all want the same story. The shortlist follows the markets you chose.",
        ],
      },
      {
        heading: "Proof of publication",
        paragraphs: [
          "The report shows pitches, replies and published articles with links. A pitch that received no answer is still part of the work. It is not described as coverage.",
          "We do not buy unmarked advertorials and call them reviews. If a placement is sponsored, it should be identifiable as such.",
        ],
      },
      {
        heading: "Send a complete kit",
        paragraphs: [
          "Artwork, a working link, credits and a short biography should be in the first email. The Academy guide to press kits is the checklist. Missing photos are the usual reason a willing editor delays a post.",
          "Blog coverage pairs well with press outreach when the story is strong enough for both. They are scoped as related services, not as the same email.",
        ],
      },
    ],
  },
  {
    slug: "artist-promotion",
    title: "Artist promotion and branding",
    description: "Artist promotion for independents, managers and labels: branding, press, release campaigns and reporting without inflated claims.",
    eyebrow: "Artists",
    heading: "Promote the artist and the song as one brief.",
    lede: "Artist promotion is the story, the assets and the channels around a release — held to the same reporting standard as the campaign.",
    sections: [
      {
        heading: "Brand is not a filter",
        paragraphs: [
          "Artist branding at ClassicalPromo means the public facts: name, biography, photos, links, genre and the way the campaign describes the music. It is there so a curator, journalist or fan meets the same artist everywhere.",
          "We do not invent awards, fake press logos or “as seen on” lines. A verified badge on a profile means the account was reviewed. It does not mean a chart position.",
        ],
      },
      {
        heading: "Press, without theatre",
        paragraphs: [
          "Press and PR start with an angle and a list of relevant journalists, editors and producers. You receive the outreach log and links to anything that runs. An interview is not guaranteed because it was requested.",
          "Labels and managers can run this across a roster. Each artist keeps a separate campaign history so one release does not blur into the next.",
        ],
      },
      {
        heading: "A profile that can be sent",
        paragraphs: [
          "Public artist profiles collect the biography, latest release, social and music links, featured campaigns and press. They are designed to be forwarded. Sample profiles on this site are labelled until a real artist publishes one.",
          "If you are ready, pitch the song. The recommendation that follows is a starting scope, not a promise of fame.",
        ],
      },
    ],
  },
];

export function getSeoPage(slug: string) {
  return seoPages.find((page) => page.slug === slug) ?? null;
}
