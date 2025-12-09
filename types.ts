
export interface VideoModel {
  id: string;
  url: string;
  thumbnail: string;
  username: string;
  description: string;
  likes: number;
  comments: number;
  shares: number;
  songName: string;
}

export interface UserModel {
  id: string;
  username: string;
  name?: string;
  bio?: string;
  website?: string;
  avatar: string;
  followers: string;
  following: string;
  totalLikes: string;
  balance: number; // In Coins
}

export enum Tab {
  HOME = 'HOME',
  STATUS = 'STATUS',
  CREATE = 'CREATE',
  WALLET = 'WALLET',
  PROFILE = 'PROFILE',
  DIALER = 'DIALER'
}

export interface Comment {
  id: string;
  username: string;
  text: string;
  timestamp: string;
}

export interface LiveStreamModel {
  id: string;
  username: string;
  avatar: string;
  thumbnail: string;
  viewers: number;
  title: string;
  category: string;
}

export interface GiftModel {
  id: string;
  name: string;
  icon: string;
  price: number;
}

export interface ChatMessage {
  id: string;
  username: string;
  text: string;
  isGift?: boolean;
  giftIcon?: string;
  color?: string;
}

export interface ContactModel {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  isVerified?: boolean;
  isFavorite?: boolean;
}

export interface RecentCallModel {
  id: string;
  name: string;
  avatar: string;
  type: 'INCOMING' | 'OUTGOING' | 'MISSED';
  time: string;
  duration?: string;
}