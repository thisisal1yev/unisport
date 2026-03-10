import dynamic from "next/dynamic";
import { PageLoading } from "@/components/shared/PageLoading";

const SportsmanProfil = dynamic(() => import("@/components/sportsman/SportsmanProfil"), {
  loading: () => <PageLoading />,
  ssr: false,
});

export default function SportsmanProfilPage() {
  return <SportsmanProfil />;
}
