/* ==========================================================================
   PARTHIBAN CREATIONS - CENTRAL DATASTORE
   Database for Mods, PC Games, Android Games, Software, & Tools
   ========================================================================== */

const PARTHIBAN_DATA = {
  categories: [
    {
      id: "mods",
      title: "Mods",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
      description: "Discover game modifications, HD texture packs, custom scripts, and visual mods.",
      gradient: "linear-gradient(135deg, rgba(0,242,254,0.15), rgba(157,78,221,0.05))"
    },
    {
      id: "pc-games",
      title: "PC Games",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
      description: "Explore immersive PC titles, indie creations, and high-performance game releases.",
      gradient: "linear-gradient(135deg, rgba(157,78,221,0.15), rgba(0,242,254,0.05))"
    },
    {
      id: "android-games",
      title: "Android Games",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`,
      description: "High-octane mobile games, custom APK releases, and Android gaming experiences.",
      gradient: "linear-gradient(135deg, rgba(0,245,212,0.15), rgba(0,242,254,0.05))"
    },
    {
      id: "software",
      title: "Software",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
      description: "Essential PC & mobile applications, system optimizers, multimedia suites.",
      gradient: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(157,78,221,0.05))"
    },
    {
      id: "tools",
      title: "Tools",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
      description: "Practical online web utilities, FPS calculators, checksum validators, & dev tools.",
      gradient: "linear-gradient(135deg, rgba(255,183,3,0.15), rgba(0,245,212,0.05))"
    }
  ],

  // Real Items Database (Empty - add your real items here)
  /*
  To add a new item, add an object into the items array below matching this schema:
  {
    id: "unique-item-id",
    title: "Item Title",
    category: "mods" | "pc-games" | "android-games" | "software" | "tools",
    categoryName: "Mods" | "PC Games" | "Android Games" | "Software" | "Tools",
    rating: "5.0",
    version: "v1.0",
    fileSize: "100 MB",
    updatedDate: "Sep 13, 2026",
    downloads: "0",
    author: "Parthiban Creations",
    shortDesc: "Short description of the item...",
    fullDesc: "Comprehensive description of the item...",
    bannerImg: "https://your-domain.com/banner.jpg",
    thumbImg: "https://your-domain.com/thumb.jpg",
    features: ["Feature 1", "Feature 2"],
    requirements: {
      os: "Windows 10/11",
      cpu: "Intel / AMD",
      gpu: "Graphics Card",
      ram: "8 GB RAM",
      storage: "1 GB"
    },
    installation: [
      "Step 1...",
      "Step 2..."
    ],
    checksum: "SHA256: ..."
  }
  */
  items: [
    {
      id: "gta-v-cheat-engine",
      title: "GTA V Cheat Engine & Mod Menu Table",
      category: "mods",
      categoryName: "Mods",
      rating: "4.95",
      version: "v7.5 (v1.0.3095)",
      fileSize: "18.5 MB",
      updatedDate: "Sep 13, 2026",
      downloads: "52,400+",
      author: "Parthiban Modding Lab",
      shortDesc: "Comprehensive Cheat Engine table & mod menu for GTA V Story Mode featuring God Mode, Unlimited Cash, Vehicle Spawner, and Teleportation.",
      fullDesc: "The ultimate single-player GTA V Cheat Engine table and trainer. Enables unlimited health, infinite armor, max weapon ammo with no reload, custom wanted level freezing, vehicle spawning with all DLC supercars, and custom teleportation coordinates across Los Santos.",
      bannerImg: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
      thumbImg: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=500&q=80",
      features: [
        "God Mode (Invincibility & Unlimited Armor)",
        "Unlimited Money & Stealth Max Stats",
        "Infinite Weapon Ammo, Explosive Bullets & No Reload",
        "Instant Vehicle Spawner (All DLC Sports, Planes & Tanks)",
        "Freeze / Clear Police Wanted Level",
        "Teleportation to Waypoint & Custom Map Locations"
      ],
      requirements: {
        os: "Windows 10 / Windows 11 (64-bit)",
        cpu: "Intel Core i5 3470 / AMD FX 8350",
        gpu: "NVIDIA GTX 660 / AMD HD 7870",
        ram: "8 GB RAM",
        storage: "50 MB Space"
      },
      installation: [
        "Download and install Cheat Engine 7.5 (or higher) on your PC.",
        "Launch Grand Theft Auto V in Single Player mode.",
        "Open `GTAV_Parthiban_CheatEngine_v7.5.CT` with Cheat Engine.",
        "Click the monitor icon in Cheat Engine and select the running `GTA5.exe` process.",
        "Check the boxes for God Mode, Unlimited Cash, or Vehicle Spawner to activate!"
      ],
      checksum: "SHA256: 4f8b9c2a1d0e3f5a7b9c1d3e5f7a9b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a",
      downloadUrl: "https://t.me/gtavcheatsengine"
    }
  ]
};
