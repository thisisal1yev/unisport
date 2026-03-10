import dynamic from "next/dynamic";
import { PageLoading } from "@/components/shared/PageLoading";

const SportsmanKlublar = dynamic(() => import("@/components/sportsman/SportsmanKlublar"), {
  loading: () => <PageLoading />,
  ssr: false,
});

export default function SportsmanKlublarPage() {
  return <SportsmanKlublar />;
}
