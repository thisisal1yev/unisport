import dynamic from "next/dynamic";
import { PageLoading } from "@/components/shared/PageLoading";

const MusobaqalarManager = dynamic(() => import("@/components/admin/MusobaqalarManager"), {
  loading: () => <PageLoading />,
  ssr: false,
});

export default function MusobaqalarManagerPage() {
  return <MusobaqalarManager />;
}
