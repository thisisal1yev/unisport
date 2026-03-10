import dynamic from "next/dynamic";
import { PageLoading } from "@/components/shared/PageLoading";

const CoachKlublar = dynamic(() => import("@/components/coach/CoachKlublar"), {
  loading: () => <PageLoading />,
  ssr: false,
});

export default function CoachKlublarPage() {
  return <CoachKlublar />;
}
