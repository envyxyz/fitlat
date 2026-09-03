"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const STAGGER_STEP_MS = 90;
const OFFSET_PX = 20;

interface RevealProps {
  children: ReactNode;
  /** Which edge this element sits on — sets its entrance direction. */
  from?: "left" | "right" | "none";
  /** Position in the reveal sequence; multiplied by a 90ms stagger step. */
  index?: number;
  revealed: boolean;
  className?: string;
  as?: "div" | "span";
}

/**
 * The page's post-intro reveal: fade + 20px translate on the site's shared
 * ease/duration, fired once `revealed` flips true (driven by
 * `useIntroReveal`, itself gated on the loader — see design-system.md
 * "Motion" for why the loader, not this, is the site's one signature
 * moment). Left-of-center content enters from -20px, right-of-center from
 * +20px, centered content fades with no X offset at all.
 */
export function Reveal({ children, from = "none", index = 0, revealed, className, as = "div" }: RevealProps) {
  const offset = from === "left" ? -OFFSET_PX : from === "right" ? OFFSET_PX : 0;
  const Tag = as;

  return (
    <Tag
      className={cn("motion-reduce:!translate-x-0 motion-reduce:!opacity-100", className)}
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateX(0px)" : `translateX(${offset}px)`,
        transition: `opacity var(--duration-slow) var(--motion-ease) ${index * STAGGER_STEP_MS}ms, transform var(--duration-slow) var(--motion-ease) ${index * STAGGER_STEP_MS}ms`,
      }}
    >
      {children}
    </Tag>
  );
}
