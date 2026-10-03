import { z } from "zod";
import { goals, genres, markets, partnerTypes } from "@/content/services";

export const registerSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  password: z.string().min(10).max(80),
  role: z.enum(["ARTIST", "MANAGER", "LABEL"]),
  company: z.string().trim().max(80).optional().default(""),
});

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1).max(80),
});

export const pitchSchema = z.object({
  artistName: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(7).max(24),
  country: z.string().trim().min(2).max(60),
  city: z.string().trim().min(2).max(60),
  genre: z.string().trim().min(2).max(40),
  website: z.string().trim().max(200).optional().default(""),
  instagram: z.string().trim().max(200).optional().default(""),
  tiktok: z.string().trim().max(200).optional().default(""),
  youtube: z.string().trim().max(200).optional().default(""),
  spotify: z.string().trim().max(200).optional().default(""),
  appleMusic: z.string().trim().max(200).optional().default(""),
  audiomack: z.string().trim().max(200).optional().default(""),
  songTitle: z.string().trim().min(1).max(120),
  songArtist: z.string().trim().min(1).max(120),
  featured: z.string().trim().max(160).optional().default(""),
  releaseGenre: z.string().trim().min(2).max(40),
  releaseDate: z.string().trim().max(20).optional().default(""),
  isrc: z.string().trim().max(20).optional().default(""),
  songLink: z.string().trim().min(4).max(300),
  artworkName: z.string().trim().max(160).optional().default(""),
  lyrics: z.string().trim().max(8000).optional().default(""),
  videoLink: z.string().trim().max(300).optional().default(""),
  pressKitName: z.string().trim().max(160).optional().default(""),
  goals: z.array(z.enum(goals as unknown as [string, ...string[]])).min(1),
  markets: z.array(z.enum(markets as unknown as [string, ...string[]])).min(1),
  audienceGenres: z.array(z.enum(genres as unknown as [string, ...string[]])).min(1),
  budget: z.enum(["25000", "50000", "100000", "250000", "500000+", "custom"]),
  customBudget: z.string().trim().max(20).optional().default(""),
  company: z.string().max(0).optional().default(""),
});

export const partnerSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  phone: z.string().trim().min(7).max(24),
  country: z.string().trim().min(2).max(60),
  city: z.string().trim().min(2).max(60),
  categories: z.array(z.enum(partnerTypes as unknown as [string, ...string[]])).min(1),
  platform: z.string().trim().min(2).max(40),
  profileUrl: z.string().trim().max(300).optional().default(""),
  audience: z.string().trim().min(2).max(80),
  genres: z.array(z.string().trim().min(2).max(40)).min(1),
  description: z.string().trim().min(20).max(800),
  proofNote: z.string().trim().min(5).max(400),
  terms: z.literal(true),
  company: z.string().max(0).optional().default(""),
});

export const messageSchema = z.object({
  threadId: z.string().min(3).max(80),
  body: z.string().trim().min(1).max(2000),
});
