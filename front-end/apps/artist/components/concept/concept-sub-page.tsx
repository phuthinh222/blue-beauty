import { ConceptSubPage as _ConceptSubPage } from "@repo/ui/concept";
import type { Artist } from "@repo/ui/concept";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import type { UserProfile } from "@/lib/auth";

type ConceptSubPageProps = {
  title: string;
  breadcrumbLabel: string;
  artists: Artist[];
  onLogout?: () => void;
  user?: UserProfile | null;
};

export function ConceptSubPage({ onLogout, user, ...props }: ConceptSubPageProps) {
  return (
    <_ConceptSubPage
      {...props}
      header={<SiteHeader onLogout={onLogout} user={user} />}
      footer={<SiteFooter />}
    />
  );
}
