import dynamic from "next/dynamic";
import { PageLoading } from "@/components/shared/PageLoading";

const SportsmanMusobaqalar = dynamic(() => import("@/components/sportsman/SportsmanMusobaqalar"), {
  loading: () => <PageLoading />,
  ssr: false,
});

export default function SportsmanMusobaqalarPage() {
  return <SportsmanMusobaqalar />;
}
