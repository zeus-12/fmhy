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

const MarkdownRenderer = ({
  category,
  starredLinks,
  children,
  components,
}: {
  category: string;
  starredLinks: boolean;
  children: string;
  components?:
    | Partial<
        Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents
      >
    | undefined;
}) => {
  return (
    <ReactMarkdown
      components={{
        h1: (props: any) => HeadingRenderer(props, 1),
        h2: (props: any) => HeadingRenderer(props, 2),
        h3: (props: any) => HeadingRenderer(props, 3), //for beginners guide only
        h4: (props: any) => HeadingRenderer(props, 4), //for storage only
        p: PRenderer, // for beginners guide only
        a: LinkRenderer,
        li: (props: any) => LiRenderer(props, starredLinks), //for storage only
        hr: () => <></>,
        code: (props: any) => CodeRenderer(props, category),
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
