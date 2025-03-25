import { createMDX } from 'fumadocs-mdx/next';
import type { NextConfig } from 'next';

const withMDX = createMDX();

const config = {
  reactStrictMode: true,
} satisfies NextConfig;

export default withMDX(config);
