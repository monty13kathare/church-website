// types/gallery.ts
export type Category = "All" | "Sermons" | "Events" | "Worship" | "Ministry" | "Testimonies";
import heroImage from "@/assets/worship-team.jpeg";

import p1 from "@/assets/p1.jpeg";
import p2 from "@/assets/p2.jpeg";
import p3 from "@/assets/p3.jpeg";
import p4 from "@/assets/p4.jpeg";
import p5 from "@/assets/p5.jpeg";
import p6 from "@/assets/p6.jpeg";
import p7 from "@/assets/p7.jpeg";
import p8 from "@/assets/p8.jpeg";
import p9 from "@/assets/p9.jpeg";



export interface GalleryImage {
  id: number;
  title: string;
  description: string;
  category: Exclude<Category, "All">;
  imageUrl: string;
  date: string;
  photographer?: string;
  tags: string[];
  location?: string;
  featured: boolean;
  likes: number;
  views: number;
}

export const categories: Category[] = [
  "All",
  "Sermons",
  "Events",
  "Worship",
  "Ministry",
  "Testimonies",
];

export const galleryImages: GalleryImage[] = [
  {
    id: 1,
    title: "Sunday Worship Service - January 2026",
    description: "The congregation gathering for Sunday worship and praise",
    category: "Sermons",
    imageUrl: heroImage,
    date: "Jan 15, 2026",
    photographer: "Brother Michael",
    tags: ["worship", "sunday", "service"],
    location: "Main Sanctuary",
    featured: true,
    likes: 245,
    views: 1200
  },
  {
    id: 2,
    title: "Christmas Celebration 2025",
    description: "Christmas Eve service with carols and candlelight",
    category: "Events",
    imageUrl: p1,
    date: "Dec 24, 2025",
    photographer: "Sister Sarah",
    tags: ["christmas", "celebration", "carols"],
    location: "Church Auditorium",
    featured: true,
    likes: 0,
    views: 0
  },
  {
    id: 3,
    title: "Christmas Celebration 2025",
    description: "Christmas Eve service with carols and candlelight",
    category: "Events",
    imageUrl: p2,
    date: "Dec 24, 2025",
    photographer: "Sister Sarah",
    tags: ["christmas", "celebration", "carols"],
    location: "Church Auditorium",
    featured: true,
    likes: 0,
    views: 0
  },
  {
    id: 4,
    title: "Christmas Celebration 2025",
    description: "Christmas Eve service with carols and candlelight",
    category: "Events",
    imageUrl: p3,
    date: "Dec 24, 2025",
    photographer: "Sister Sarah",
    tags: ["christmas", "celebration", "carols"],
    location: "Church Auditorium",
    featured: true,
    likes: 0,
    views: 0
  },
  {
    id: 5,
    title: "Christmas Celebration 2025",
    description: "Christmas Eve service with carols and candlelight",
    category: "Events",
    imageUrl: p4,
    date: "Dec 24, 2025",
    photographer: "Sister Sarah",
    tags: ["christmas", "celebration", "carols"],
    location: "Church Auditorium",
    featured: true,
    likes: 0,
    views: 0
  },
  {
    id: 6,
    title: "Christmas Celebration 2025",
    description: "Christmas Eve service with carols and candlelight",
    category: "Events",
    imageUrl: p5,
    date: "Dec 24, 2025",
    photographer: "Sister Sarah",
    tags: ["christmas", "celebration", "carols"],
    location: "Church Auditorium",
    featured: true,
    likes: 0,
    views: 0
  },


  {
    id: 7,
    title: "Christmas Celebration 2025",
    description: "Christmas Eve service with carols and candlelight",
    category: "Events",
    imageUrl: p6,
    date: "Dec 24, 2025",
    photographer: "Sister Sarah",
    tags: ["christmas", "celebration", "carols"],
    location: "Church Auditorium",
    featured: true,
    likes: 0,
    views: 0
  },
  {
    id: 8,
    title: "Christmas Celebration 2025",
    description: "Christmas Eve service with carols and candlelight",
    category: "Events",
    imageUrl: p7,
    date: "Dec 24, 2025",
    photographer: "Sister Sarah",
    tags: ["christmas", "celebration", "carols"],
    location: "Church Auditorium",
    featured: true,
    likes: 0,
    views: 0
  },
  {
    id: 9,
    title: "Christmas Celebration 2025",
    description: "Christmas Eve service with carols and candlelight",
    category: "Events",
    imageUrl: p8,
    date: "Dec 24, 2025",
    photographer: "Sister Sarah",
    tags: ["christmas", "celebration", "carols"],
    location: "Church Auditorium",
    featured: true,
    likes: 0,
    views: 0
  },
  {
    id: 10,
    title: "Christmas Celebration 2025",
    description: "Christmas Eve service with carols and candlelight",
    category: "Events",
    imageUrl: p9,
    date: "Dec 24, 2025",
    photographer: "Sister Sarah",
    tags: ["christmas", "celebration", "carols"],
    location: "Church Auditorium",
    featured: true,
    likes: 0,
    views: 0
  },

];