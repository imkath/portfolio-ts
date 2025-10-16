/**
 * Analytics wrapper for Vercel Analytics
 * Events are non-blocking and do not include PII
 */

import { track } from "@vercel/analytics";

/**
 * Track filter selection in FilterBar
 */
export function trackFilterSelect(category: string) {
  try {
    track("filter_select", {
      category: category,
    });
  } catch (error) {
    // Silent fail - analytics should never block UI
    console.debug("Analytics error:", error);
  }
}

/**
 * Track project card click
 */
export function trackProjectOpen(projectSlug: string, category?: string) {
  try {
    track("project_open", {
      project: projectSlug,
      category: category || "unknown",
    });
  } catch (error) {
    console.debug("Analytics error:", error);
  }
}

/**
 * Track lightbox image open
 */
export function trackImageOpen(projectSlug: string, imageIndex: number) {
  try {
    track("image_open", {
      project: projectSlug,
      index: imageIndex,
    });
  } catch (error) {
    console.debug("Analytics error:", error);
  }
}

/**
 * Track contact form submission
 */
export function trackContactSubmit(method: "email" | "form") {
  try {
    track("contact_submit", {
      method: method,
    });
  } catch (error) {
    console.debug("Analytics error:", error);
  }
}

/**
 * Track navigation events
 */
export function trackNavigation(destination: string) {
  try {
    track("navigation", {
      to: destination,
    });
  } catch (error) {
    console.debug("Analytics error:", error);
  }
}
