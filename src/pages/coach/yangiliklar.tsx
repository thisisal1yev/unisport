import dynamic from "next/dynamic";
import { PageLoading } from "@/components/shared/PageLoading";

const CoachYangiliklar = dynamic(() => import("@/components/coach/CoachYangiliklar"), {
  loading: () => <PageLoading />,
  ssr: false,
});

export default function CoachYangiliklarPage() {
  return <CoachYangiliklar />;
}
