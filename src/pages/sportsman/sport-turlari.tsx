import dynamic from "next/dynamic";
import { PageLoading } from "@/components/shared/PageLoading";

const SportsmanSportTurlari = dynamic(() => import("@/components/sportsman/SportsmanSportTurlari"), {
  loading: () => <PageLoading />,
  ssr: false,
});

export default function SportsmanSportTurlariPage() {
  return <SportsmanSportTurlari />;
}
