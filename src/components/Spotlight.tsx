// @ts-nocheck
import { cn } from "@/lib/utils";
import { Spotlight, SpotlightActionData, spotlight } from "@mantine/spotlight";

import {
  // SpotlightProvider as MantineSpotlightProvider,
  SpotlightActionProps,
} from "@mantine/spotlight";

import { Search } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";

const CustomSpotlight = ({
  action,
  styles,
  classNames,
  hovered,
  onTrigger,
  ...others
}: SpotlightActionProps) => {
  return (
    <div
      className={cn(
        `w-full px-3 py-2 mt-1  hover:bg-gray-900 `,
        hovered && "bg-gray-900"
      )}
      data-hovered={hovered || undefined}
      tabIndex={-1}
      // @ts-ignore
      onMouseDown={(event) => event.preventDefault()}
      onClick={onTrigger}
      {...others}
    >
      {/* <Group noWrap> */}
      <div style={{ flex: 1 }}>
        {action.isSearch ? (
          <p>
            Search {action.title && "for "}
            {action.title && <span className="font-bold"> {action.title}</span>}
          </p>
        ) : (
          <p>{action.title}</p>
        )}
        <p className="text-gray-500 text-sm">{action.description}</p>
      </div>
      {/* </Group> */}
    </div>
  );
};

export const SpotlightProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const spotlightActions = [
    {
      title: query,
      key: "search",
      isSearch: true,
      source: "Fast ",
      group: "search",
      description: "Enter the query to search!",
      onTrigger: () => {
        router.push(`/search?q=${query}`);
      },
    },
    {
      title: "Guides",
      key: "Guides",
      description: "Collection of useful Guides!",
      group: "other",

      onTrigger: () => {
        window.open("https://rentry.co/fmhy-guides", "_blank");
      },
    },
    {
      title: "Discord",
      key: "Discord",
      description: "Fmhy official discord server!",
      group: "other",

      onTrigger: () => {
        window.open("https://discord.gg/5W9QJKuPkD", "_blank");
      },
    },
    {
      title: "Feedback",
      key: "Feedback",
      description: "Provide feedback to improve the website!",
      group: "other",

      onTrigger: () => {
        router.push("/feedback");
      },
    },
  ];

  return (
    <Spotlight
      classNames={{
        body: "bg-gray-950",
        search: "bg-gray-950",
      }}
      shortcut={["mod + P", "mod + K", "/"]}
      // @ts-ignore
      actions={spotlightActions}
      actionComponent={CustomSpotlight}
      searchPlaceholder="Search..."
      query={query}
      onQueryChange={setQuery}
      searchIcon={<Search className="w-5 h-5 text-gray-500" />}
    >
      {children}
    </Spotlight>
  );
};
