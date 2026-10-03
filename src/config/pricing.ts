export type PackageId = "starter" | "growth" | "breakout" | "custom";

export type PackageConfig = {
  id: PackageId;
  name: string;
  audience: string;
  priceNgn: number | null;
  priceLabel: string;
  duration: string;
  services: string[];
  deliverables: string[];
  reporting: string;
  featured?: boolean;
};

export type ServicePrice = {
  id: string;
  name: string;
  fromNgn: number;
  duration: string;
  included: string[];
  receives: string[];
  reporting: string;
  notGuaranteed: string[];
};

export const defaultPackages: PackageConfig[] = [
  {
    id: "starter",
    name: "STARTER",
    audience: "For emerging artists preparing a first serious release push.",
    priceNgn: 50000,
    priceLabel: "₦50,000",
    duration: "14 days",
    services: ["Playlist outreach", "Music blog pitches", "Campaign setup"],
    deliverables: [
      "Curator outreach on relevant independent playlists",
      "Blog pitch log",
      "One campaign summary",
    ],
    reporting: "Activity report at the end of the campaign.",
  },
  {
    id: "growth",
    name: "GROWTH",
    audience: "For artists launching a focused release with more than one channel.",
    priceNgn: 150000,
    priceLabel: "₦150,000",
    duration: "21 days",
    services: [
      "Playlist outreach",
      "TikTok creator campaign",
      "Instagram promotion",
      "DJ promotion",
      "Radio servicing",
    ],
    deliverables: [
      "Channel-by-channel activity log",
      "Creator and curator outreach records",
      "DJ and radio servicing notes",
    ],
    reporting: "Mid-campaign update and a closing report.",
    featured: true,
  },
  {
    id: "breakout",
    name: "BREAKOUT",
    audience: "For artists seeking coordinated exposure across several audiences.",
    priceNgn: 350000,
    priceLabel: "₦350,000",
    duration: "30 days",
    services: [
      "Playlist outreach",
      "TikTok creator campaign",
      "Instagram promotion",
      "YouTube promotion",
      "Radio servicing",
      "DJ promotion",
      "Blog and press outreach",
    ],
    deliverables: [
      "Multi-channel campaign desk",
      "Weekly activity updates",
      "Placement and response log where partners report them",
    ],
    reporting: "Weekly notes and a full closing report.",
  },
  {
    id: "custom",
    name: "CUSTOM",
    audience: "For labels, managers and established artists with a specific brief.",
    priceNgn: null,
    priceLabel: "Scoped",
    duration: "Agreed per brief",
    services: ["Strategy", "Channel mix", "Team assignment", "Reporting plan"],
    deliverables: [
      "Written campaign scope before work begins",
      "Named services and markets",
      "Reporting schedule agreed in advance",
    ],
    reporting: "Defined in the scope. Activity is reported; results are not guaranteed.",
  },
];

export const servicePrices: ServicePrice[] = [
  {
    id: "playlist",
    name: "Playlist outreach",
    fromNgn: 25000,
    duration: "10–21 days",
    included: [
      "Brief matched to genre and territory",
      "Pitches to relevant independent playlist curators",
      "Follow-up window",
    ],
    receives: ["Curators contacted", "Responses received", "Placements reported by curators"],
    reporting: "Outreach log in the campaign report.",
    notGuaranteed: [
      "Spotify editorial playlist placement",
      "A set number of streams",
      "Placement on any specific playlist",
    ],
  },
  {
    id: "tiktok",
    name: "TikTok",
    fromNgn: 40000,
    duration: "14–30 days",
    included: ["Creator shortlist", "Outreach to relevant creators", "Optional paid amplification if scoped"],
    receives: ["Creators contacted", "Posts published", "Available view and engagement figures when creators share them"],
    reporting: "Creator activity log. Missing figures are marked awaiting data.",
    notGuaranteed: ["Viral reach", "A set number of views", "Follower growth"],
  },
  {
    id: "instagram",
    name: "Instagram",
    fromNgn: 40000,
    duration: "14–30 days",
    included: ["Creator or media outreach", "Caption and asset guidance", "Audience fit check"],
    receives: ["Accounts contacted", "Posts or stories published", "Reported interactions when available"],
    reporting: "Activity report. Reach is not estimated when it was not measured.",
    notGuaranteed: ["Viral Reels", "Follower counts", "Saves or shares"],
  },
  {
    id: "radio",
    name: "Radio",
    fromNgn: 50000,
    duration: "14–28 days",
    included: ["Station shortlist", "Servicing pack", "Follow-up with presenters or producers"],
    receives: ["Stations serviced", "Responses", "Confirmed spins only where a station verifies them"],
    reporting: "Servicing log. Unconfirmed airplay is not counted as a spin.",
    notGuaranteed: ["Airplay", "A number of spins", "National rotation"],
  },
  {
    id: "dj",
    name: "DJ",
    fromNgn: 35000,
    duration: "14–21 days",
    included: ["DJ shortlist by city and genre", "Servicing of the release", "Response tracking"],
    receives: ["DJs serviced", "Replies", "Reported club or mix support"],
    reporting: "DJ servicing log.",
    notGuaranteed: ["Club play", "A number of DJ drops"],
  },
  {
    id: "youtube",
    name: "YouTube",
    fromNgn: 40000,
    duration: "14–30 days",
    included: ["Creator or channel outreach", "Video asset check", "Optional ads if separately scoped"],
    receives: ["Channels contacted", "Features published", "View data only when available"],
    reporting: "Outreach and publish log.",
    notGuaranteed: ["Views", "Watch time", "Trending placement"],
  },
  {
    id: "blogs",
    name: "Blogs",
    fromNgn: 30000,
    duration: "14–28 days",
    included: ["Outlet shortlist", "Personalised pitches", "Asset delivery"],
    receives: ["Pitches sent", "Replies", "Published articles"],
    reporting: "Pitch and publication log with links when a story goes live.",
    notGuaranteed: ["Coverage", "A specific headline or outlet"],
  },
  {
    id: "pr",
    name: "Press & PR",
    fromNgn: 80000,
    duration: "21–45 days",
    included: ["Story angle", "Press note", "Journalist and editor outreach"],
    receives: ["Media contacted", "Interviews requested", "Coverage secured"],
    reporting: "Media log and links to published work.",
    notGuaranteed: ["Press coverage", "A feature in a named title"],
  },
  {
    id: "campaigns",
    name: "Full campaigns",
    fromNgn: 50000,
    duration: "14–45 days",
    included: ["Goal setting", "Channel plan", "Execution", "Reporting"],
    receives: ["A single campaign record", "Service-level activity", "A closing report"],
    reporting: "Dashboard updates and a downloadable campaign report.",
    notGuaranteed: [
      "Streams",
      "Followers",
      "Views",
      "Editorial playlist placement",
      "Virality",
    ],
  },
];

export const budgetOptions = [
  { id: "25000", label: "₦25,000", amount: 25000 },
  { id: "50000", label: "₦50,000", amount: 50000 },
  { id: "100000", label: "₦100,000", amount: 100000 },
  { id: "250000", label: "₦250,000", amount: 250000 },
  { id: "500000+", label: "₦500,000+", amount: 500000 },
  { id: "custom", label: "Custom budget", amount: null },
] as const;
