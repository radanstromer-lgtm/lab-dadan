import { createClient } from "./supabase/client";

export interface SectionVisibility {
  hero: boolean;
  projects: boolean;
  courses: boolean;
  tech_radar: boolean;
  lab_notes: boolean;
  graveyard: boolean;
}

export const DEFAULT_SECTION_VISIBILITY: SectionVisibility = {
  hero: true,
  projects: true,
  courses: true,
  tech_radar: true,
  lab_notes: true,
  graveyard: true,
};

export async function fetchSectionVisibility(): Promise<SectionVisibility> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("site_config")
      .select("value")
      .eq("key", "section_visibility")
      .single();

    if (error) {
      console.warn("Using default section visibility due to fetch error:", error.message);
      return DEFAULT_SECTION_VISIBILITY;
    }

    if (data && data.value) {
      // Cast atau merge hasil data.value dengan defaults
      return {
        ...DEFAULT_SECTION_VISIBILITY,
        ...(data.value as Partial<SectionVisibility>),
      };
    }
  } catch (err) {
    console.error("Failed to fetch section visibility config:", err);
  }

  return DEFAULT_SECTION_VISIBILITY;
}
