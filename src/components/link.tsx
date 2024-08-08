import { cn } from "@/lib/utils";
import NextLink from "next/link";
import { AnchorHTMLAttributes, DetailedHTMLProps, Ref } from "react";

type LinkProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> & {
  ref?: Ref<HTMLAnchorElement>;
};

const Link = ({ href, className, children, ...rest }: LinkProps) => {
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));

  if (isInternalLink) {
    return (
      <NextLink
        href={href}
        className={cn("text-blue-400 hover:text-blue-500", className)}
        {...rest}
      >
        {children}
      </NextLink>
    );
  }

  return (
    <a
      className={cn("text-blue-400 hover:text-blue-500", className)}
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      {...rest}
    >
      {children}
    </a>
  );
};

export default Link;
