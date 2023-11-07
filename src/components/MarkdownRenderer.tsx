import {
  LiRenderer,
  LinkRenderer,
  PRenderer,
  CodeRenderer,
  HeadingRenderer,
  UlRenderer,
  BlockquoteRenderer,
} from "@/lib/wiki/renderers";
import ReactMarkdown from "react-markdown";
import { SpecialComponents } from "react-markdown/lib/ast-to-react";
import { NormalComponents } from "react-markdown/lib/complex-types";
import GithubSlugger from "github-slugger";

const MarkdownRenderer = ({
  category,
  starredLinks,
  children,
  components,
}: {
  category?: string;
  starredLinks?: boolean;
  children: string;
  components?:
    | Partial<
        Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents
      >
    | undefined;
}) => {
  const slugger = new GithubSlugger();
  slugger.reset();

  return (
    <ReactMarkdown
      components={{
        h1: (props: any) => HeadingRenderer(props, 1, slugger),
        h2: (props: any) => HeadingRenderer(props, 2, slugger),
        h3: (props: any) => HeadingRenderer(props, 3, slugger), //for beginners guide only
        h4: (props: any) => HeadingRenderer(props, 4, slugger), //for storage only
        p: PRenderer, // for beginners guide only
        a: LinkRenderer,
        li: (props: any) => LiRenderer(props, starredLinks), //for storage only
        hr: () => <></>,
        code: (props: any) => CodeRenderer(props, category), // for base64 only
        ul: (props: any) => UlRenderer(props),
        blockquote: (props: any) => BlockquoteRenderer(props, category),
        ...components,
      }}
    >
      {children}
    </ReactMarkdown>
  );
};
export default MarkdownRenderer;
