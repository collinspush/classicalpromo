import type { Currency } from "@/lib/site";
import type { PackageId } from "@/config/pricing";

export type Role = "ARTIST" | "MANAGER" | "LABEL" | "PARTNER" | "ADMIN";
export type PartnerStatus = "PENDING" | "UNDER_REVIEW" | "VERIFIED" | "SUSPENDED" | "REJECTED";
export type CampaignStatus =
  | "DRAFT"
  | "AWAITING_PAYMENT"
  | "PAID"
  | "QUEUED"
  | "IN_PROGRESS"
  | "AWAITING_PARTNER_RESULTS"
  | "COMPLETED"
  | "CANCELLED";
export type PaymentStatus = "PENDING" | "SUCCESSFUL" | "FAILED" | "REFUNDED";

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: Role;
  emailVerified: boolean;
  demo?: boolean;
};

export type ArtistProfile = {
  slug: string;
  stageName: string;
  bio: string;
  country: string;
  city: string;
  genres: string[];
  website: string;
  instagram: string;
  tiktok: string;
  youtube: string;
  spotify: string;
  appleMusic: string;
  audiomack: string;
  verified: boolean;
  image: string;
};

export type UserRecord = {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: Role;
  emailVerified: boolean;
  phone: string;
  tokenVersion: number;
  demo: boolean;
  country: string;
  city: string;
  profile: ArtistProfile | null;
  company: string;
  notifyEmail: boolean;
  createdAt: string;
};

export type SongRecord = {
  id: string;
  artistId: string;
  title: string;
  artistName: string;
  featured: string;
  genre: string;
  releaseDate: string;
  isrc: string;
  songLink: string;
  artworkName: string;
  lyrics: string;
  videoLink: string;
  pressKitName: string;
  createdAt: string;
};

export type ChannelMetric = {
  label: string;
  value: string;
  awaiting?: boolean;
};

export type CampaignChannel = {
  name: string;
  metrics: ChannelMetric[];
};

export type CampaignRecord = {
  id: string;
  artistId: string;
  artistName: string;
  songId: string;
  songTitle: string;
  packageId: PackageId;
  packageName: string;
  status: CampaignStatus;
  budgetNgn: number;
  currency: Currency;
  goals: string[];
  markets: string[];
  genres: string[];
  services: string[];
  progress: number;
  demo: boolean;
  assignee: string;
  startDate: string;
  endDate: string;
  channels: CampaignChannel[];
  createdAt: string;
};

export type SubmissionRecord = {
  id: string;
  userId: string | null;
  email: string;
  payload: PitchPayload;
  createdAt: string;
};

export type PitchPayload = {
  artistName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  genre: string;
  website: string;
  instagram: string;
  tiktok: string;
  youtube: string;
  spotify: string;
  appleMusic: string;
  audiomack: string;
  songTitle: string;
  songArtist: string;
  featured: string;
  releaseGenre: string;
  releaseDate: string;
  isrc: string;
  songLink: string;
  artworkName: string;
  lyrics: string;
  videoLink: string;
  pressKitName: string;
  goals: string[];
  markets: string[];
  audienceGenres: string[];
  budget: string;
  customBudget: string;
  packageId: PackageId;
};

export type PartnerRecord = {
  id: string;
  userId: string | null;
  name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  categories: string[];
  platform: string;
  profileUrl: string;
  audience: string;
  genres: string[];
  description: string;
  status: PartnerStatus;
  proofNote: string;
  createdAt: string;
};

export type ListingRecord = {
  id: string;
  slug: string;
  partnerId: string | null;
  service: string;
  category: string;
  audience: string;
  country: string;
  genre: string;
  priceNgn: number;
  deliverables: string[];
  duration: string;
  verified: boolean;
  active: boolean;
};

export type DirectoryRecord = {
  id: string;
  kind: "playlist" | "dj" | "radio" | "creator" | "blog";
  name: string;
  location: string;
  genres: string[];
  platform: string;
  audience: string;
  verified: boolean;
  partnerId: string | null;
};

export type MessageRecord = {
  id: string;
  threadId: string;
  campaignId: string | null;
  senderId: string;
  senderName: string;
  senderRole: Role;
  body: string;
  createdAt: string;
  participantIds: string[];
};

export type NotificationRecord = {
  id: string;
  userId: string;
  type: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
};

export type PaymentRecord = {
  id: string;
  userId: string;
  campaignId: string | null;
  provider: string;
  reference: string;
  amount: number;
  currency: Currency;
  status: PaymentStatus;
  invoiceNumber: string;
  billTo: string;
  description: string;
  createdAt: string;
};

export type RedirectRecord = {
  id: string;
  oldUrl: string;
  newUrl: string;
  type: 301 | 302;
  status: "active" | "inactive";
  createdAt: string;
};

export type AuditRecord = {
  id: string;
  userId: string | null;
  action: string;
  target: string;
  meta: string;
  createdAt: string;
};

export type ArticleRecord = {
  slug: string;
  kind: "academy" | "media";
  title: string;
  excerpt: string;
  body: string[];
  category: string;
  artist: string;
  genre: string;
  author: string;
  image: string;
  date: string;
  status: "published" | "draft";
};

export type TokenRecord = {
  id: string;
  userId: string;
  tokenHash: string;
  purpose: "reset" | "verify";
  expiresAt: string;
};

export type Database = {
  users: UserRecord[];
  songs: SongRecord[];
  campaigns: CampaignRecord[];
  submissions: SubmissionRecord[];
  partners: PartnerRecord[];
  listings: ListingRecord[];
  directory: DirectoryRecord[];
  messages: MessageRecord[];
  notifications: NotificationRecord[];
  payments: PaymentRecord[];
  redirects: RedirectRecord[];
  articles: ArticleRecord[];
  tokens: TokenRecord[];
  audit: AuditRecord[];
  settings: {
    bankName: string;
    accountName: string;
    accountNumber: string;
    packagePrices: Partial<Record<PackageId, number | null>>;
  };
};
