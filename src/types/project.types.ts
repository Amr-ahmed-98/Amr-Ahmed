
export type ProjectCategory = "all" | "ecommerce" | "dashboards" | "landingPages" | (string & {});

export interface Project {
    id: string;
    titleKey: string;
    descriptionKey?: string;
    categories: Exclude<ProjectCategory, "all">[];
    tags?: string[];
    image: { src: string; altKey: string };
    liveUrl?: string;
    repoUrl?: string;
    accent?: "primary" | "card";
}