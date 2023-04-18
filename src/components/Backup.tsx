import React from "react";

const RESOURCE_BACKUPS = [
  {
    name: "Saidit",
    link: "https://saidit.net/s/freemediaheckyeah/wiki/index",
    frequency: "Daily",
  },
  {
    name: "Github",
    link: "https://github.com/nbats/FMHY/wiki/FREEMEDIAHECKYEAH",
    frequency: "Daily",
  },
  { name: "Rentry", link: "https://rentry.co/FMHY", frequency: "Daily" },
  {
    name: "NotABug",
    link: "https://notabug.org/nbatman/freemediaheckyeah/wiki/_pages",
    frequency: "Daily",
  },
  {
    name: "Web Archive",
    link: "https://web.archive.org/web/20211218000000*/https://www.reddit.com/r/FREEMEDIAHECKYEAH/",
    frequency: "Periodically",
  },
  {
    name: "Disroot (Password: FMHY)",
    link: "https://bin.disroot.org/?afb37f030fe77ed8#9PJEnnb8qKd4VExxU3su5kSjcHpsVUP9CqkZ8AjrZasa",
    frequency: NaN,
  },
];
const SERVER_BACKUPS = [
  {
    name: "Discord",
    link: "https://mega.nz/folder/cRRCQSrb#cT9Pkauyena6IWBt7zYZJw",
    frequency: "Daily",
  },
  {
    name: "Guilded",
    link: "https://www.guilded.gg/i/1EqadvqE",
    frequency: NaN,
  },
  {
    name: "Revolt",
    link: "https://app.revolt.chat/invite/YzV4Fmdt",
    frequency: NaN,
  },
];

const Backup = () => {
  return (
    <div>
      <p className="text-red-400 text-3xl mb-2">Backups</p>
      <div className="flex flex-wrap gap-3">
        {SERVER_BACKUPS.concat(RESOURCE_BACKUPS).map((link) => {
          return (
            <a
              href={link.link}
              target="_blank"
              rel="noreferrer"
              key={link.link}
            >
              <div className="flex flex-col justify-center items-center bg-gray-900 p-6 rounded-lg">
                <p className="text-xl text-cyan-200 hover:scale-105 transition transform duration-100 ease-out">
                  {link.name}
                </p>
                <p className="hover:scale-105 transition transform duration-100 ease-out text-gray-300 text-sm">
                  {link.frequency}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Backup;
