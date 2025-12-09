
import { VideoModel, UserModel, LiveStreamModel, GiftModel, ContactModel, RecentCallModel } from './types';

export const APP_NAME = "Divyanshi";
export const COIN_CONVERSION_RATE = 1000; // 1000 Coins = ₹1

// Earning Rates
export const COINS_PER_LIKE = 250;
export const COINS_PER_VIEW = 30;

export const MOCK_USER: UserModel = {
  id: 'u1',
  username: 'priya_sharma',
  name: 'Priya Sharma',
  bio: 'Digital Creator | Dance Lover 💃 | DM for Collabs',
  website: 'youtube.com/priya',
  avatar: 'https://picsum.photos/150/150',
  followers: '1.2M',
  following: '45',
  totalLikes: '15.5M',
  balance: 25400,
};

// Using reliable Google sample videos to ensure playback compatibility
export const MOCK_VIDEOS: VideoModel[] = [
  {
    id: 'v1',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    thumbnail: 'https://picsum.photos/400/800?random=1',
    username: 'rohit_dance',
    description: 'Wait for the drop! 🕺🇮🇳 #dance #divyanshi #trending',
    likes: 12400,
    comments: 450,
    shares: 1200,
    songName: 'Desi Beats - Original Mix',
  },
  {
    id: 'v2',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'https://picsum.photos/400/800?random=2',
    username: 'tech_guru',
    description: 'New gadget review coming soon! 📱✨ #tech #unboxing',
    likes: 8500,
    comments: 210,
    shares: 500,
    songName: 'Tech Talk - Background',
  },
  {
    id: 'v3',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail: 'https://picsum.photos/400/800?random=3',
    username: 'travel_with_amit',
    description: 'The beauty of Kerala 🌴🛶 #india #travel #nature',
    likes: 45000,
    comments: 1200,
    shares: 3400,
    songName: 'Kerala Vibes - Flute Version',
  },
  {
    id: 'v4',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnail: 'https://picsum.photos/400/800?random=4',
    username: 'comedy_king',
    description: 'When mom finds out you skipped tuition 😂 #comedy #relatable',
    likes: 89000,
    comments: 3400,
    shares: 12000,
    songName: 'Funny Sound Effect #4',
  }
];

export const MOCK_LIVE_STREAMS: LiveStreamModel[] = [
    {
        id: 'l1',
        username: 'angel_riya',
        avatar: 'https://picsum.photos/100/100?random=20',
        thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80',
        viewers: 1240,
        title: 'Chit Chat & Chill 💖',
        category: 'Chatting'
    },
    {
        id: 'l2',
        username: 'dj_vikram',
        avatar: 'https://picsum.photos/100/100?random=21',
        thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80',
        viewers: 850,
        title: 'Live DJ Set 🎵🔥',
        category: 'Music'
    },
    {
        id: 'l3',
        username: 'gamer_boy',
        avatar: 'https://picsum.photos/100/100?random=22',
        thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&q=80',
        viewers: 3200,
        title: 'BGMI Rank Push 🎮',
        category: 'Gaming'
    },
    {
        id: 'l4',
        username: 'cooking_mama',
        avatar: 'https://picsum.photos/100/100?random=23',
        thumbnail: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?w=500&q=80',
        viewers: 560,
        title: 'Making Pani Puri 🥘',
        category: 'Cooking'
    }
];

export const MOCK_FOLLOWING_USERS = [
    { id: 'f1', username: 'rohit_dance', avatar: 'https://picsum.photos/100/100?random=1', isLive: false },
    { id: 'f2', username: 'tech_guru', avatar: 'https://picsum.photos/100/100?random=2', isLive: true },
    { id: 'f3', username: 'angel_riya', avatar: 'https://picsum.photos/100/100?random=20', isLive: false },
    { id: 'f4', username: 'comedy_king', avatar: 'https://picsum.photos/100/100?random=4', isLive: false },
    { id: 'f5', username: 'travel_amit', avatar: 'https://picsum.photos/100/100?random=3', isLive: false },
];

export const GIFTS: GiftModel[] = [
    { id: 'g1', name: 'Rose', icon: '🌹', price: 10 },
    { id: 'g2', name: 'Heart', icon: '❤️', price: 50 },
    { id: 'g3', name: 'Choco', icon: '🍫', price: 100 },
    { id: 'g4', name: 'Fire', icon: '🔥', price: 200 },
    { id: 'g5', name: 'Crown', icon: '👑', price: 500 },
    { id: 'g6', name: 'Car', icon: '🏎️', price: 1000 },
];

export const MOCK_CONTACTS: ContactModel[] = [
  { id: 'c1', name: 'Rahul Sharma', phone: '+91 98765 43210', avatar: 'https://picsum.photos/100/100?random=50', isVerified: true, isFavorite: true },
  { id: 'c2', name: 'Anjali Verma', phone: '+91 99887 76655', avatar: 'https://picsum.photos/100/100?random=51' },
  { id: 'c3', name: 'Customer Support', phone: '1800-123-4567', avatar: 'https://picsum.photos/100/100?random=52', isVerified: true },
  { id: 'c4', name: 'Mom ❤️', phone: '+91 91234 56789', avatar: 'https://picsum.photos/100/100?random=53', isFavorite: true },
  { id: 'c5', name: 'Vikram Singh', phone: '+91 88990 01122', avatar: 'https://picsum.photos/100/100?random=54' },
];

export const MOCK_RECENT_CALLS: RecentCallModel[] = [
  { id: 'r1', name: 'Rahul Sharma', avatar: 'https://picsum.photos/100/100?random=50', type: 'INCOMING', time: '10:30 AM', duration: '5m 12s' },
  { id: 'r2', name: 'Anjali Verma', avatar: 'https://picsum.photos/100/100?random=51', type: 'MISSED', time: 'Yesterday' },
  { id: 'r3', name: 'Mom ❤️', avatar: 'https://picsum.photos/100/100?random=53', type: 'OUTGOING', time: 'Yesterday', duration: '12m 45s' },
  { id: 'r4', name: 'Unknown', avatar: 'https://via.placeholder.com/100', type: 'MISSED', time: '2 days ago' },
  { id: 'r5', name: 'Vikram Singh', avatar: 'https://picsum.photos/100/100?random=54', type: 'INCOMING', time: '3 days ago', duration: '2m 10s' },
];