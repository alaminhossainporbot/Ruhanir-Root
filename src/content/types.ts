export interface FocusArea {
  title: string;
  description: string;
}

export interface LeaderMember {
  slug: string;
  name: string;
  nameEn?: string;
  role: string;
  imagePrefix: string;
  bio: string;
  github?: string;
  githubLabel?: string;
  focusAreas: FocusArea[];
}
