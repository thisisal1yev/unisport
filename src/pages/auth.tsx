import dynamic from "next/dynamic";
import { PageLoading } from "@/components/shared/PageLoading";

const AuthForm = dynamic(() => import("@/components/auth/AuthForm"), {
  loading: () => <PageLoading />,
  ssr: false,
});

export default function AuthPage() {
  return <AuthForm />;
}
