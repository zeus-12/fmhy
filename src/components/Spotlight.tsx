import { Badge, Group, UnstyledButton, createStyles } from "@mantine/core";
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
  // todo it was null instead of undefined: check if this works
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

        {action.new && <Badge>new</Badge>}
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
      title: "Wiki",
      description: "Collection of all links scraped from FMHY Github ",
      group: "page",
      new: true,
      onTrigger: () => {
        router.push("/wiki");
      },
    },
    {
      title: "Guides",
      description: "Collection of useful Guides!",
      group: "page",

      onTrigger: () => {
        router.push("/guides");
      },
    },
    {
      title: "Base64 Links",
      description: "All base64 links in r/fmhy",
      group: "page",
      onTrigger: () => {
        router.push("/base64");
      },
    },
    {
      title: query,
      description: "Search on Streamlit",
      isSearch: true,
      source: "Streamlit",
      group: "search",

      onTrigger: () => {
        const q = query.replace(" ", "+");
        window.open(`https://fmhy-search.streamlit.app/?q=${q}`);
      },
    },
    {
      title: query,
      isSearch: true,
      source: "DB",
      group: "search",
      description: "Search on Db",
      onTrigger: () => {
        router.push(`/search?q=${query}`);
      },
    },
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
