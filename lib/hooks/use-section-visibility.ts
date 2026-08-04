import { useState, useEffect } from "react";
import { fetchSectionVisibility, SectionVisibility, DEFAULT_SECTION_VISIBILITY } from "@/lib/site-config";

export function useSectionVisibility() {
  const [visibility, setVisibility] = useState<SectionVisibility>(DEFAULT_SECTION_VISIBILITY);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadVisibility() {
      try {
        const data = await fetchSectionVisibility();
        if (active) {
          setVisibility(data);
        }
      } catch (err) {
        console.error("Error loading section visibility:", err);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadVisibility();

    return () => {
      active = false;
    };
  }, []);

  return { visibility, loading };
}
