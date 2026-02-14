import { create } from "zustand";

type Wiki = {
  showOnlyStarred: boolean;
  toggleWikiToggleStarred: () => void;
};

export const useWiki = create<Wiki>((set) => ({
  showOnlyStarred: false,

  toggleWikiToggleStarred: () =>
    set((state) => ({ showOnlyStarred: !state.showOnlyStarred })),
}));
