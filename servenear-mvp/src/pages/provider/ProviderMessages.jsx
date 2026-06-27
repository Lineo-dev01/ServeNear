import AppLayout from "../../components/layout/AppLayout";
import MessageCenter from "../../components/messages/MessageCenter";

export default function ProviderMessages() {
  return (
    <AppLayout userType="provider">
      <MessageCenter userType="provider" />
    </AppLayout>
  );
}