import PageWrapper from "../components/layout/PageWrapper";
import EmptyState from "../components/shared/EmptyState";

export default function Settings() {
  return (
    <PageWrapper title="Settings">
      <EmptyState
        icon="⚙️"
        title="Settings coming soon"
        message="Workspace, team, and API key management will live here."
      />
    </PageWrapper>
  );
}
