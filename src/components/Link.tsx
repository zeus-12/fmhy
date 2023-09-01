import React, { DetailedHTMLProps, AnchorHTMLAttributes, Ref } from "react";
import NextLink from "next/link";

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
        className={`text-blue-400 hover:text-blue-500 transition-colors duration-150 ease-in ${className}`}
        {...rest}
      >
        {children}
      </NextLink>
    );
  }

  return (
    <a
      className={`text-blue-400 hover:text-blue-500 transition-colors duration-150 ease-in ${className}`}
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
