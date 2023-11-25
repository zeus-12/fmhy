import { create } from "zustand";

type Wiki = {
  showOnlyStarred: boolean;
  toggleWikiToggleStarred: () => void;

  showToc: boolean;
  toggleShowToc: () => void;

  hideCategory: boolean;
  toggleHideCategory: () => void;
};

export const useWiki = create<Wiki>((set) => ({
  showOnlyStarred: false,

  toggleWikiToggleStarred: () =>
    set((state) => ({ showOnlyStarred: !state.showOnlyStarred })),

  showToc: false,
  toggleShowToc: () => set((state) => ({ showToc: !state.showToc })),

  hideCategory: true,
  toggleHideCategory: () =>
    set((state) => ({ hideCategory: !state.hideCategory })),
}));
