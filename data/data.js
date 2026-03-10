// list of soyjaks
const jsArrayData = [
  "soyjak",
  "impjak",
  "cobson",
  "feraljak",
  "gapejak",
  "nojak",
  "angryjak",
  "pogjak",
];

const soyjakImageData = jsArrayData.map(name => ({
  name,
  image: `../images/${name}.png`
}));

// Edit this list with your own videos.
// Fields used by filters: title, description, url, videoId, duration, board, category, platform, tags, date
const forumVideos = [
    {
      id: "the-origin-of-every-soyjak1",
      title: "The Origin of Every Soyjak: Explained",
      description: "Ever wondered where some soyjaks came from? This video will list a few of the most popular ones and explain their origins. By ShreddedNerd",
      videoId: "lMxL_p5uRgU",
      url: "https://www.youtube.com/watch?v=lMxL_p5uRgU",
      duration: "4:52",
      board: "General",
      category: "Lore",
      platform: "youtube",
      tags: ["soy", "explanation", "short"],
      date: "2025-01-05"
    },
    {
      id: "the-origin-of-every-soyjak2",
      title: "Soy Lore V2",
      description: "Similar to the first video, but with more soyjaks and more in-depth explanations. By ShreddedNerd",
      videoId: "BYTTi2tk0Fs",
      url: "https://www.youtube.com/watch?v=BYTTi2tk0Fs",
      duration: "5:18",
      board: "General",
      category: "Lore",
      platform: "youtube",
      tags: ["soy", "explanation", "short"],
      date: "2025-03-11"
    },
    {
      id: "the-history-of-soyjaks",
      title: "Wojaks, Soyjaks, and You. | Bad Art History",
      description: "A deepdive into the history and evolution of Wojaks and Soyjaks perfectly done. By Frankie Fey",
      videoId: "oMmidmD7FQk",
      url: "https://www.youtube.com/watch?v=oMmidmD7FQk",
      duration: "1:06:49",
      board: "Archive",
      category: "History",
      platform: "youtube",
      tags: ["soy", "explanation", "history", "long"],
      date: "2024-10-20"
    }
];

window.forumVideos = forumVideos;
window.soyjakImageData = soyjakImageData;
