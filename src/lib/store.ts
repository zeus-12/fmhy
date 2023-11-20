import { create } from "zustand";

type Wiki = {
  showOnlyStarred: boolean;
  toggleWikiToggleStarred: () => void;

  showToc: boolean;
  toggleShowToc: () => void;
};

export const useWiki = create<Wiki>((set) => ({
  showOnlyStarred: false,

  toggleWikiToggleStarred: () =>
    set((state) => ({ showOnlyStarred: !state.showOnlyStarred })),

  showToc: false,
  toggleShowToc: () => set((state) => ({ showToc: !state.showToc })),
}));
