import dynamic from "next/dynamic";
import { PageLoading } from "@/components/shared/PageLoading";

const SportsmanYangiliklar = dynamic(() => import("@/components/sportsman/SportsmanYangiliklar"), {
  loading: () => <PageLoading />,
  ssr: false,
});

export default function SportsmanYangiliklarPage() {
  return <SportsmanYangiliklar />;
}
