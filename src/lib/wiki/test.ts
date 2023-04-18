import { redirectRedditLinksToWebsite } from "./helpers";

const test = [
  "https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/img-tools",
  "https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/games#wiki_.25BA_gaming_tools",
  "https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/edu#wiki_.25BA_educational_tools",
  "https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/ai#wiki_.25BA_ai_tools",
  "https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/dev-tools",
  "https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/img-tools#wiki_.25B7_instagram_tools",
  "https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/linux#wiki_.25BA_linux_tools_.2F_apps",
  "https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/linux#wiki_.25BA_mac_tools_.2F_apps",
  "https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/android#wiki_.25BA_android_tools",
  "https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/android#wiki_.25BA_ios_tools",
  "https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/edu/#wiki_.25BA_downloading",
  "https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/dev-tools/#wiki_.25B7_color_schemes",
];

test.forEach((item) => {
  console.log("link", redirectRedditLinksToWebsite(item));
});
