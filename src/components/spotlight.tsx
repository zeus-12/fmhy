import { cn } from "@/lib/utils";
import { Group, UnstyledButton } from "@mantine/core";
import {
  SpotlightProvider as MantineSpotlightProvider,
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
    <UnstyledButton
      className={cn(
        `mt-1 w-full px-3 py-2 hover:bg-gray-900`,
        hovered && "bg-gray-900",
      )}
      data-hovered={hovered || undefined}
      tabIndex={-1}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onTrigger}
      {...others}
    >
      <Group noWrap>
        <div style={{ flex: 1 }}>
          {action.isSearch ? (
            <p>
              Search {action.title && "for "}
              {action.title && (
                <span className="font-bold"> {action.title}</span>
              )}
            </p>
          ) : (
            <p>{action.title}</p>
          )}
          <p className="text-sm text-gray-500">{action.description}</p>
        </div>
      </Group>
    </UnstyledButton>
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
      description: "Collection of useful Guides!",
      group: "other",

      onTrigger: () => {
        window.open("https://rentry.co/fmhy-guides", "_blank");
      },
    },
    {
      title: "Discord",
      description: "Fmhy official discord server!",
      group: "other",

      onTrigger: () => {
        window.open("https://rentry.co/fmhy-invite", "_blank");
      },
    },
    {
      title: "Feedback",
      description: "Provide feedback to improve the website!",
      group: "other",

      onTrigger: () => {
        router.push("/feedback");
      },
    },
  ];

  return (
    <MantineSpotlightProvider
      classNames={{
        body: "bg-gray-950",
        searchInput: "bg-gray-950",
      }}
      shortcut={["mod + P", "mod + K", "/"]}
      actions={spotlightActions}
      actionComponent={CustomSpotlight}
      searchPlaceholder="Search..."
      query={query}
      onQueryChange={setQuery}
      searchIcon={<Search className="h-5 w-5 text-gray-500" />}
    >
      {children}
    </MantineSpotlightProvider>
  );
};
