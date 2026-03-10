import dynamic from "next/dynamic";
import { PageLoading } from "@/components/shared/PageLoading";

const SportJoylariManager = dynamic(() => import("@/components/admin/SportJoylariManager"), {
  loading: () => <PageLoading />,
  ssr: false,
});

export default function SportJoylariManagerPage() {
  return <SportJoylariManager />;
}
