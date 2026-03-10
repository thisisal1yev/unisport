import dynamic from "next/dynamic";
import { PageLoading } from "@/components/shared/PageLoading";

const CoachProfil = dynamic(() => import("@/components/coach/CoachProfil"), {
  loading: () => <PageLoading />,
  ssr: false,
});

export default function CoachProfilPage() {
  return <CoachProfil />;
}
