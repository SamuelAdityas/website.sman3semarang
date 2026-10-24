"use client";

/**
 * Preserve the original page layout.
 *
 * The previous generic CMS renderer replaced the entire page with a grid of
 * cards as soon as any Supabase rows existed for that section. This caused
 * the homepage and other sections to lose their original design.
 *
 * The admin CMS/API remains available. Public pages should be connected to
 * Supabase through field-specific mappings, not by replacing whole pages with
 * a generic card grid.
 */
export default function CmsManagedPage({ children }) {
  return children;
}
