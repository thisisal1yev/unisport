import dynamic from "next/dynamic";
import { PageLoading } from "@/components/shared/PageLoading";

const SportsmanYutuqlar = dynamic(() => import("@/components/sportsman/SportsmanYutuqlar"), {
  loading: () => <PageLoading />,
  ssr: false,
});

export default function SportsmanYutuqlarPage() {
  return <SportsmanYutuqlar />;
}
