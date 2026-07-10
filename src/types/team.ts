export interface TeamMember {
  id: string;
  name: string;
  role: string;
  isAttorney: boolean;
  bio: string;
  education?: string;
  barAdmissions?: string;
  languages: string;
  /** Optional distinction/award line, e.g. Super Lawyers recognition. */
  honor?: string;
  /** Path to headshot image in /public. Undefined until confirmed. */
  photo?: string;
  /** True until the bio text itself is confirmed real (should be false for all current entries). */
  isPlaceholder: boolean;
  /** True once we've confirmed which uploaded headshot file belongs to this person. */
  photoConfirmed: boolean;
}
