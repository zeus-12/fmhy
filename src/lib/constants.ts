interface CommonResourceFields {
  title: string;
  emoji: string;
  dlForSearch: boolean;
  useAbsoluteUrl?: boolean;
}

export interface ParentResource extends CommonResourceFields {
  hasSubItems: true;
  // assuming no sub-sub items => might need to change this
  items: ChildResource[];
}

export interface ChildResource extends CommonResourceFields {
  hasSubItems: false;
  urlEnding: string;
}

export type ResourceEle = ChildResource | ParentResource;

export const MARKDOWN_RESOURCES: ResourceEle[] = [
  {
    title: "Home",
    urlEnding: "",
    emoji: "👋",
    dlForSearch: false,
    hasSubItems: false,
  },
  {
    title: "Adblock, Privacy",
    urlEnding: "AdblockVPNGuide",
    emoji: "📛",
    dlForSearch: true,
    hasSubItems: false,
  },
  {
    title: "AI Tools",
    urlEnding: "AI",
    emoji: "🤖",
    dlForSearch: true,
    hasSubItems: false,
  },
  {
    title: "Movies, TV, Anime, Sports",
    urlEnding: "VideoPiracyGuide",
    emoji: "📺",
    dlForSearch: true,
    hasSubItems: false,
  },
  {
    title: "Music, Podcasts, Radio",
    urlEnding: "AudioPiracyGuide",
    emoji: "🎵",
    dlForSearch: true,
    hasSubItems: false,
  },
  {
    title: "Gaming, Emulation",
    urlEnding: "GamingPiracyGuide",
    emoji: "🎮",
    dlForSearch: true,
    hasSubItems: false,
  },
  {
    title: "Books, Comics, Manga",
    urlEnding: "ReadingPiracyGuide",
    emoji: "📗",
    dlForSearch: true,
    hasSubItems: false,
  },

  {
    title: "Downloading",
    urlEnding: "DownloadPiracyGuide",
    emoji: "💾",
    dlForSearch: true,
    hasSubItems: false,
  },

  {
    title: "Torrenting",
    urlEnding: "TorrentPiracyGuide",
    emoji: "🌀",
    dlForSearch: true,
    hasSubItems: false,
  },

  {
    title: "Educational",
    urlEnding: "EDUPiracyGuide",
    emoji: "🧠",
    dlForSearch: true,
    hasSubItems: false,
  },

  {
    title: "Android, iOS",
    urlEnding: "Android-iOSGuide",
    emoji: "📱",
    dlForSearch: true,
    hasSubItems: false,
  },

  // {
  //   title: "Base64",
  //   urlEnding: "base64",
  //   emoji: "🔗",
  //   dlForSearch: false,
  // },

  {
    title: "Linux, MacOS",
    urlEnding: "LinuxGuide",
    emoji: "🐧",
    dlForSearch: true,
    hasSubItems: false,
  },

  {
    title: "Non-English",
    urlEnding: "Non-English",
    emoji: "🌍",
    dlForSearch: true,
    hasSubItems: false,
  },

  {
    title: "Miscellaneous",
    urlEnding: "MISCGuide",
    emoji: "📂",
    dlForSearch: true,
    hasSubItems: false,
  },

  {
    title: "Tools",
    emoji: "🔧",
    dlForSearch: true,
    hasSubItems: true,
    items: [
      {
        dlForSearch: true,
        title: "System Tools",
        emoji: "💻",
        urlEnding: "System-Tools",
        hasSubItems: false,
      },

      {
        dlForSearch: true,
        emoji: "🗃️",
        title: "File Tools",
        urlEnding: "File-Tools",
        hasSubItems: false,
      },
      {
        dlForSearch: true,
        emoji: "🔗",
        title: "Internet Tools",
        urlEnding: "Internet-Tools",
        hasSubItems: false,
      },

      {
        dlForSearch: true,
        emoji: "💬",
        title: "Social Media Tools",
        urlEnding: "social-media-tools",
        hasSubItems: false,
      },
      {
        dlForSearch: true,
        emoji: "📝",
        title: "Text Tools",
        urlEnding: "Text-Tools",
        hasSubItems: false,
      },
      {
        dlForSearch: true,
        emoji: "🎮",
        title: "Gaming Tools",
        urlEnding: "gaming-tools",
        hasSubItems: false,
      },
      {
        dlForSearch: true,
        emoji: "📷",
        title: "Image Tools",
        urlEnding: "img-tools",
        hasSubItems: false,
      },

      {
        dlForSearch: true,
        emoji: "📼",
        title: "Video Tools",
        urlEnding: "Video-Tools",
        hasSubItems: false,
      },

      {
        emoji: "🔊",
        title: "Audio Tools",
        useAbsoluteUrl: true,
        urlEnding: "audiopiracyguide#audio-tools",
        dlForSearch: false,
        hasSubItems: false,
      },

      {
        dlForSearch: false,
        emoji: "🍎",
        title: "Educational Tools",
        useAbsoluteUrl: true,
        urlEnding: "edupiracyguide#educational-tools",
        hasSubItems: false,
      },
      {
        title: "Developer Tools",
        dlForSearch: true,
        emoji: "👨‍💻",
        urlEnding: "DEVTools",
        hasSubItems: false,
      },
    ],
  },

  {
    title: "More",
    emoji: "➕",
    dlForSearch: true,
    hasSubItems: true,
    items: [
      {
        title: "NSFW",
        urlEnding: "NSFWPiracy",
        emoji: "🔞",
        dlForSearch: true,
        hasSubItems: false,
      },
      {
        title: "Unsafe Sites",
        urlEnding: "UnsafeSites",
        emoji: "🚫",
        dlForSearch: false,
        hasSubItems: false,
      },

      {
        title: "Storage",
        urlEnding: "STORAGE",
        emoji: "📦",
        dlForSearch: true,
        hasSubItems: false,
      },
    ],
  },
  {
    title: "Beginners Guide",
    urlEnding: "Beginners-Guide",
    emoji: "🏴‍☠️",
    dlForSearch: false,
    hasSubItems: false,
  },
];

export const MARKDOWN_URL_ENDING_TO_EMOJI_MAPPING: { [key: string]: string } =
  MARKDOWN_RESOURCES.reduce(
    (mapping: { [key: string]: string }, resource: ResourceEle) => {
      if (resource.hasSubItems) {
        resource.items?.forEach((item) => {
          mapping[item.urlEnding.toLowerCase()] = item.emoji;
        });
      } else {
        mapping[resource.urlEnding.toLowerCase()] = resource.emoji;
      }
      return mapping;
    },
    {}
  );

// make next image do this instead of hardcoding
export const blurDataUrlForLogo =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAB3AHkDASIAAhEBAxEB/8QAGQABAQEBAQEAAAAAAAAAAAAAAAIBAwQG/8QAGBABAQEBAQAAAAAAAAAAAAAAAAECETH/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD4xWPUqx6D0ZdMuWXXKquNZGqrKjS6ig5acdO2nHQIAZZI6Zc46ZBcCAOCs+pVn0HfLrlxy6xVXGpjRSoqqiqI046ddOWgQAyyLyhcBcayAOLc+sbPQdsusccukqq6St6mU6DaiqtRaKjTlp0050EgIyKiWwHSCY0HNsYA65dJXLLpKKuVvU9OqNtTaWptBOnOr0igwBEGxgCmpAYAC8rlc4uAvreplOqrbU2tqaCamtqQAEQABowAABsXERUBTUxoFZWpqqmsaxEAAAAAAAAFRKoChjQE1SaqsY1iIAAAAAAAAKgA1oAxlBVYwEQAAAAAB//Z";

// these are actual data for development purposes
export const testData = `
  
  # Android Adblocking
  
  - ⭐ **[System Wide Adblocking](https://champagne.pages.dev/before-you-begin/important-tools/)** / [2](https://redd.it/oyfmr1) - System Wide Adblocking Guides
  - ⭐ **[AdGuard Premium](https://github.com/nbats/FMHYedit/blob/main/base64.md#adguard-premium)** - Adblocking App
  - ⭐ **[Bromite](https://github.com/uazo/bromite-buildtools/releases)** / [2](https://www.bromite.org/), [jQuarks](https://f-droid.org/packages/com.oF2pks.jquarks/) or [Monument](https://play.google.com/store/apps/details?id=br.marcelo.monumentbrowser) - Adblocking Browser / [Filter](https://github.com/xarantolus/filtrite)
  - ⭐ **uBlock Origin** - [Firefox](https://addons.mozilla.org/en-US/firefox/addon/ublock-origin/), [Yandex](https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm) & [Kiwi](https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm)
  - ⭐ **[Hermit](https://play.google.com/store/apps/details?id=com.chimbori.hermitcrab)**, [NativeAlphaForAndroid](https://github.com/cylonid/NativeAlphaForAndroid), [MultiApp](https://github.com/WaxMoon/MultiApp) or [WebApps](https://github.com/tobykurien/WebApps/) - App Containers
  - ⭐ **[Infinity](https://github.com/Docile-Alligator/Infinity-For-Reddit)** / [2](https://f-droid.org/en/packages/ml.docilealligator.infinityforreddit/), [Slide](https://github.com/Haptic-Apps/Slide) / [2](https://f-droid.org/en/packages/me.ccrama.redditslide/), [Redditoria](https://play.google.com/store/apps/details?id=com.kirkbushman.redditoria), [RIF](https://github.com/nbats/FMHYedit/blob/main/base64.md#rif), [RedReader](https://github.com/QuantumBadger/RedReader), [Redited](https://github.com/Blatzar/Redited), [Boost](https://boostforreddit.com/) or [Stealth](https://f-droid.org/packages/com.cosmos.unreddit/) / [2](https://gitlab.com/cosmosapps/stealth) - Ad Free Reddit Clients
  - [Blokada](https://blokada.org/) / [v4](https://go.blokada.org/apk4) - Adblocking App
  - [AdAway](https://adaway.org/) - Adblocking App / [GitHub](https://github.com/AdAway/AdAway)
  - [ad-free](https://abertschi.github.io/ad-free/landing/) - Adblocking App
  - [personalDNSfilter](https://www.zenz-solutions.de/personaldnsfilter-wp/) / [F-Droid](https://f-droid.org/packages/dnsfilter.android), [Rethink](https://rethinkdns.com/app) / [Blocklists](https://rethinkdns.com/app#blocklists), [BhanUpratpys](https://github.com/bhanupratapys/dnswarden), [DNS66](https://f-droid.org/en/packages/org.jak_linux.dns66/), [2](https://jak-linux.org/projects/dns66/) / [GitHub](https://github.com/julian-klode/dns66), [TrustDNS](https://surfshark.com/trust-dns) or [Pi-Droid](https://f-droid.org/en/packages/friimaind.piholedroid/) - DNS Adblocker
  - [Daedalus](https://github.com/iTXTech/Daedalus) or [Smokescreen](https://play.google.com/store/apps/details?id=com.frostnerd.smokescreen)- DNS Modifier
  - [DNS Speed Test & Changer](https://github.com/nbats/FMHYedit/blob/main/base64.md#dns-speed-test--changer) - DNS Speed Test
  - [DNS Changer](https://play.google.com/store/apps/details?id=com.technoapps.dnschanger) - DNS Changer
  - [YouTubeAdAway](https://github.com/wanam/YouTubeAdAway) - YouTube Adblocker
  - [Twidere](https://github.com/TwidereProject/Twidere-Android), [TwiFucker](https://github.com/Dr-TSNG/TwiFucker), [Aerowitter](https://aerowitter.com/) or [Twidere-X](https://github.com/TwidereProject/TwidereX-Android) - Ad-Free Twitter Apps
  - [GoodbyeAds](https://github.com/jerryn70/GoodbyeAds) - Adblock Filters
  - [Should I Answer?](http://www.shouldianswer.net/), [Yet Another Call Blocker](https://f-droid.org/en/packages/dummydomain.yetanothercallblocker/) / [GitLab](https://gitlab.com/xynngh/YetAnotherCallBlocker) or [Hiya](https://www.hiya.com/) - Block Spam Calls
  - [The National Do Not Call Registry](https://www.donotcall.gov/) - Opt Out of Telemarketing Calls
  - [Should I Call Back?](https://should-i-call-back.binary-person.dev/), [PhoneInfoga](https://github.com/sundowndev/PhoneInfoga) or [Scammer.Info](https://scammer.info/) / [Discord](https://discord.com/invite/nUThJjK) - Scam Numbers Database
  - [Xtra](https://github.com/crackededed/Xtra), [PurpleTV](https://discord.gg/wrU7Ea6wvr), [TwitchMod](https://t.me/pubTw) or [Twire](https://f-droid.org/packages/com.perflyst.twire/) - Ad Free Twitch App
  - [Killergram](https://github.com/Xposed-Modules-Repo/com.shatyuka.killergram) - Remove Sponsored Telegram Messages
  
  ---
  
  # Android Privacy
  
  - ⭐ **[Awesome Android Security](https://github.com/ashishb/android-security-awesome)** - Android Security Resources
  - ⭐ **[Privacy Based Browsers](https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/storage#wiki_privacy_based_browsers)** - Browsers with a focus on Privacy
  - ⭐ **[DPITunnel](https://github.com/nomoresat/DPITunnel-android)**, [PowerTunnel](https://github.com/krlvm/PowerTunnel-Android) or [Xandroid](https://github.com/XndroidDev/Xndroid) - Proxies
  - ⭐ **[Aegis](https://getaegis.app/)**, [Authy](https://play.google.com/store/apps/details?id=com.authy.authy), [AuthenticatorPro](https://github.com/jamie-mh/AuthenticatorPro), [Mauth](https://github.com/X1nto/Mauth) or [andOTP](https://github.com/andOTP/andOTP) - Two-Factor Authentication
  - [Gear VPN](https://github.com/KaustubhPatange/Gear-VPN), [Adguard VPN](https://adguard.com/en/blog/introducing-adguard-vpn-for-android.html), [GoatVPN](https://play.google.com/store/apps/details?id=com.secure.proxy.freevpn), [Vpnify](https://vpnifyapp.com/), [YourFreedomVPN](https://apkcombo.com/your-freedom-vpn-client/de.resolution.yf_android/), [GoFLy](https://play.google.com/store/apps/details?id=com.ambrose.overwall), [TempoVPN](https://play.google.com/store/apps/details?id=com.waves.tempovpn&gl=US), [VPN Door](https://play.google.com/store/apps/details?id=com.securesoft.vpndoor&hl=en_US&gl=US), [VPNhub](https://www.vpnhub.com/) or [Clash](https://github.com/Kr328/ClashForAndroid/) / [Profiles](https://rentry.co/2q3rn) - Free VPNs
  - [Guardian Project](https://guardianproject.info/) / [2](https://guardianproject.info/fdroid/repo), [Divestos Apps](https://divestos.org/pages/recommended_apps) or [InviZible](https://github.com/Gedsh/InviZible) - Privacy Based Apps / Tools
  - [Encrypted Messengers](https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/storage#wiki_encrypted_android_messengers) - Encrypted Android Messengers
  - [Silence](https://silence.im/) or [Partisan SMS](https://github.com/wrwrabbit/Partisan-SMS) - Encrypt SMS/MMS Messages
  - [Wickr](https://play.google.com/store/apps/details?id=com.wickr.pro&hl=en), [MySudo](https://mysudo.com/), [Jami](https://jami.net/), [Syphon](https://syphon.org/), [Mesibo](https://play.google.com/store/apps/details?id=com.mesibo.mesiboapplication) or [Element](https://schildi.chat/android/) / [2](https://play.google.com/store/apps/details?id=im.vector.app) - Encrypted Messaging / Video Calls
  - [SmallTalk](https://github.com/ouchadam/small-talk) - Matrix Client
  - [OVERSEC](https://www.oversec.io/) - Add Text / Image Encryption to any App
  - [adb-clear-packages](https://gist.github.com/noseratio/e3b136401965289c4aab40fa60f3be41) - Clear Android Packages Data
  - [SpoofCard](https://www.spoofcard.com/) - Disguise Caller ID
  - [PilferShushJammer](https://github.com/kaputnikGo/PilferShushJammer) - Microphone Jamming Techniques
  - [Catch the Man-in-the-Middle](https://play.google.com/store/apps/details?id=me.brax.certchecker) - Check if HTTPS Traffic is being Monitored
  - [apk-mitm](https://github.com/shroudedcode/apk-mitm) - HTTPS Inspector
  - [JustUseApp](https://justuseapp.com/) - Hide App Payments
  - [Gadget Bridge](https://gadgetbridge.org/) - Connect to Smartwatches without Vendor Apps / Accounts
  - [Amarok Hider](https://github.com/deltazefiro/Amarok-Hider/blob/main/README.md) - Hide Files / Apps
  - [Extirpater](https://gitlab.com/divested-mobile/extirpater) - Make Deleted Files Irrecoverable
  - [PrivacyBlur](https://privacyblur.app/) - Blur Sensitive Parts of Photos / [GitHub](https://github.com/MATHEMA-GmbH/privacyblur)
  - [Scrambled Exif](https://gitlab.com/juanitobananas/scrambled-exif/tree/HEAD) or [exif-eraser](https://github.com/Tommy-Geenexus/exif-eraser) 
  ---
  
  `;

export const isDevEnv = process.env.NODE_ENV === "development";

export const SEARCH_RESULTS_PER_PAGE = 30;

export const beginnersGuideFaqs = [
  {
    question: "How do I tell if a site or download is safe? Any tips?",
    answer: `Check out [Booty Guard](https://rentry.org/bootyguard) our basic safety guide. 
      Still feel unsure? Reach out to us via [Discord](https://redd.it/17f8msf) & make sure you've looked at sites/software we've listed as unsafe: [here](https://www.reddit.com/r/FREEMEDIAHECKYEAH/comments/10bh0h9/unsafe_sites_software_thread)`,
  },
  {
    question: "I don't know what seeding means or *insert other term*...",
    answer: `You will find almost all terms related to piracy & more on [The Piracy Glossary](https://rentry.org/the-piracy-glossary)
        Didn't find it and still confused? Reach out to us via [Divolt](https://redd.it/uto5vw).`,
  },

  {
    question: "How do I download Photoshop/Adobe Products for free?",
    answer: `You can download pre-cracked Adobe products from [M0nkrus](http://w14.monkrus.ws/) | [How to download from M0nkrus](https://rentry.co/adobesoftware) or Patch it yourself following these guides [here](https://www.reddit.com/r/GenP/wiki/index/) & for MacOS go [here](#macos)
  
  !!!info M0nkrus is a well trusted and reputable source for adobe software in the piracy community.`,
  },
  {
    question: "How do I download windows / activate windows & Office?",
    answer: `For Windows check out this [section](#pirate-windows)
      For Office check these [guides](https://fmhy.pages.dev/storage/#office-suites)`,
  },
  {
    question: "Where do I find *insert game title / movie title*?",
    answer: `For movies check out [this](https://whereyouwatch.com) and for new movies it's a good idea to keep an eye on [r/movieleaks](https://reddit.com/r/movieleaks). 
        For sites to stream from check out this [section](#streaming).
  
  !!!info Pirated releases generally happen after a movie is digitally released or released via Blu-Ray / DVD, which can take 3 months+ after initially playing in theaters.
        
  For games use [Rezi](https://rezi.one) or any site listed [here](https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/games/#wiki_.25BA_download_games) and for newly released games check [r/crackwatch](https://reddit.com/r/crackwatch).
  
  !!!warning Please avoid downloading games from The Pirate Bay or any site listed: [here](https://www.reddit.com/r/FREEMEDIAHECKYEAH/comments/10bh0h9/unsafe_sites_software_thread)`,
  },
  {
    question: "How do I unlock *insert random game title* DLCs?",
    answer:
      "Use the tools listed [here](https://fmhy.pages.dev/gamingpiracyguide/#steam--epic) to unlock DLCs.",
  },
  {
    question:
      "Should I install & use *insert random anti-virus software* instead of using Windows Defender?",
    answer: `No don't do that, windows defender is more than good enough, you don't need another anti-virus, but if you're set on installing a secondary AV the one worth installing is Malwarebytes. Please read the note [here](#anti-virus). 
  
  !!!warning Stay away from Avast, Norton and McAfee, these are "bloatware" and generally not safe software.`,
  },
  {
    question: "How do I bypass this paywalled article?",
    answer:
      "Use [this](https://bitbucket.org/magnolia1234/bypass-paywalls-firefox-clean/src/master/) / [2](https://gitlab.com/magnolia1234/bypass-paywalls-chrome-clean) to read the article easily.",
  },
  {
    question: "How do I download image from *insert stock site*?",
    answer: `You can use [this](https://downloader.la/) if this doesn't work you can find similar stock image downloaders [here](https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/storage/#wiki_stock_photo_sites).`,
  },
];

// headers = {
//   "AdblockVPNGuide.md": [
//       "Adblocking / Privacy",
//       "Adblocking, Privacy, VPN's, Proxies, Antivirus",
//   ],
//   "AI.md": [
//       "Artificial Intelligence",
//       "Chat Bots, Text Generators, Image Generators, ChatGPT Tools",
//   ],
//   "Android-iOSGuide.md": ["Android / iOS", "Apps, Jailbreaking, Android Emulators"],
//   "AudioPiracyGuide.md": [
//       "Music / Podcasts / Radio",
//       "Stream Audio, Download Audio, Torrent Audio",
//   ],
//   "Beginners-Guide.md": ["Beginners Guide", "A Guide for Beginners to Piracy"],
//   "DownloadPiracyGuide.md": [
//       "Downloading",
//       "Download Sites, Software Sites, Open Directories",
//   ],
//   "EDUPiracyGuide.md": ["Educational", "Courses, Documentaries, Learning Resources"],
//   "GamingPiracyGuide.md": [
//       "Gaming / Emulation",
//       "Download Games, ROMs, Gaming Tools",
//   ],
//   "LinuxGuide.md": ["Linux / MacOS", "Apps, Software Sites, Gaming"],
//   "MISCGuide.md": ["Miscellaneous", "Extensions, Indexes, News, Health, Food, Fun"],
//   "NSFWPiracy.md": ["NSFW", "NSFW Indexes, Streaming, Downloading"],
//   "Non-English.md": ["Non-English", "International Piracy Sites"],
//   "ReadingPiracyGuide.md": [
//       "Books / Comics / Manga",
//       "Books, Comics, Magazines, Newspapers",
//   ],
//   "gaming-tools.md": ["Gaming Tools", "Gaming Optimization, Game Launchers, Multiplayer"],
//   "DEVTools.md": ["Developer Tools", "Git, Hosting, App Dev, Software Dev"],
//   "img-tools.md": ["Image Tools", "Image Editors, Generators, Compress"],
//   "Audio-Tools.md": [
//       "Audio Tools",
//       "Audio Players, Audio Editors, Audio Downloaders",
//   ],
//   "System-Tools.md": [
//       "System Tools",
//       "System Tools, Hardware Tools, Windows ISOs, Customization",
//   ],
//   "File-Tools.md": ["File Tools", "Download Managers, File Hosting, File Archivers"],
//   "Video-Tools.md": [
//       "Video Tools",
//       "Video Players, Video Editors, Live Streaming, Animation",
//   ],
//   "Text-Tools.md": ["Text Tools", "Text Editors, Pastebins, Fonts, Translators"],
//   # "Internet-Tools.md": ["Internet Tools", "Browsers, Extensions, Search Engines"],
//   "Social-Media-Tools.md": [
//       "Social Media Tools",
//       "Discord Tools, Reddit Tools, YouTube Tools",
//   ],
//   "STORAGE.md": ["Storage", "Sections too big to fit on main pages"],
//   "TorrentPiracyGuide.md": ["Torrenting", "Torrent Clients, Torrent Sites, Trackers"],
//   "VideoPiracyGuide.md": [
//       "Movies / TV / Anime",
//       "Stream Videos, Download Videos, Torrent Videos",
//   ],
//   "base64.md": ["Base64", "Base64 storage"],
//   "UnsafeSites.md": ["Unsafe Sites", "Unsafe/harmful sites to avoid."],
// }
