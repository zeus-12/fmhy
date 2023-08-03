export interface LinkType {
  title: string;
  link: string[];
  starred: boolean;
  isNsfw: boolean;
}

export interface SubCategoryType {
  title: string;
  links: LinkType[];
}

export interface CategoryType {
  title: string;
  links: LinkType[];
  subCategory: SubCategoryType[];
}
