import { MARKDOWN_RESOURCES } from "@/lib/CONSTANTS";
import { Group, UnstyledButton, createStyles } from "@mantine/core";
import { SpotlightActionProps } from "@mantine/spotlight";
import { SpotlightProvider as MantineSpotlightProvider } from "@mantine/spotlight";
import { Search } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";
const useStyles = createStyles((theme) => ({
  action: {
    borderRadius: theme.radius.sm,
    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[1],
    }),

    "&[data-hovered]": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[1],
    },
  },
}));

const CustomSpotlight = ({
  action,
  styles,
  classNames,
  hovered,
  onTrigger,
  ...others
}: SpotlightActionProps) => {
  const { classes } = useStyles(undefined, {
    styles,
    classNames,
    name: "Spotlight",
  });

  return (
    <UnstyledButton
      className={`w-full px-3 py-2 mt-1 ${classes.action}`}
      data-hovered={hovered || undefined}
      tabIndex={-1}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onTrigger}
      {...others}
    >
      <Group noWrap>
        <div style={{ flex: 1 }}>
          <div className="flex items-center gap-4">
            {action.isSearch ? (
              <p>
                Search {action.title && "for "}
                {action.title && (
                  <span className="font-bold"> {action.title}</span>
                )}
              </p>
            ) : (
              <p className="text-lg">{action.title}</p>
            )}
            {action.isSearch && (
              <div className="text-blue-300 bg-[#1D2C40] uppercase font-semibold text-xs rounded-lg px-3 py-1">
                {action.source}
              </div>
            )}
          </div>
          <p className="text-gray-500 text-sm">{action.description}</p>
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
      description: "Search",
      onTrigger: () => {
        router.push(`/search?q=${query}`);
      },
    },
    {
      title: "Guides",
      description: "Collection of useful Guides!",
      group: "guides",

      onTrigger: () => {
        router.push("/guides");
      },
    },

    // filter to remove "Home"

    // ...MARKDOWN_RESOURCES.filter((item) => item.urlEnding).map((res) => ({
    //   title: res.title,
    //   group: "wiki",
    //   description: "Wiki",
    //   onTrigger: () => {
    //     router.push(`/${res.urlEnding}`);
    //   },
    // })),
  ];

  return (
    <MantineSpotlightProvider
      shortcut={["mod + P", "mod + K", "/"]}
      actions={spotlightActions}
      actionComponent={CustomSpotlight}
      searchPlaceholder="Search..."
      query={query}
      onQueryChange={setQuery}
      searchIcon={<Search className="w-5 h-5 text-gray-400" />}
    >
      {children}
    </MantineSpotlightProvider>
  );
};
