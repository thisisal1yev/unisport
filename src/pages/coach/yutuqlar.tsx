import dynamic from "next/dynamic";
import { PageLoading } from "@/components/shared/PageLoading";

const CoachYutuqlar = dynamic(() => import("@/components/coach/CoachYutuqlar"), {
  loading: () => <PageLoading />,
  ssr: false,
});

export default function CoachYutuqlarPage() {
  return <CoachYutuqlar />;
}
