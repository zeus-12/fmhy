import { Modal } from "@mantine/core";
import { FC } from "react";

interface ContributeModalProps {
  opened: boolean;
  close: () => void;
}

const links = [
  {
    title: "FMHY Edit Github Repo",
    url: "https://github.com/fmhy/FMHYedit",
  },
  {
    title: "Website frontend Repo",
    url: "https://github.com/zeus-12/fmhy-ui",
  },
  {
    title: "Website backend Repo (migrated most to fmhy-ui)",
    url: "https://github.com/zeus-12/fmhy-server",
  },
  {
    title: "Github scraper Repo",
    url: "https://github.com/zeus-12/fmhy-scraper",
  },
];

const ContributeModal: FC<ContributeModalProps> = ({ opened, close }) => {
  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Contribute"
      classNames={{
        title: "font-semibold text-xl tracking-tight bg-black",
        body: "bg-black",
        content: "bg-black",
        header: "bg-black",
      }}
      centered
    >
      <div className="space-y-4 my-4">
        {links.map((link) => (
          <div key={link.title}>
            <a
              className="text-slate-300"
              href={link.url}
              target="_blank"
              rel="noreferrer"
            >
              <div className="h-12  bg-gray-900 flex items-center pl-4 rounded-md">
                {link.title}
              </div>
            </a>
          </div>
        ))}
      </div>
    </Modal>
  );
};
export default ContributeModal;
