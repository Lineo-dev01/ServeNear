import AppLayout from "../../components/layout/AppLayout";
import MessageCenter from "../../components/messages/MessageCenter";

export default function CustomerMessages() {
  return (
    <AppLayout userType="customer">
      <MessageCenter userType="customer" />
    </AppLayout>
  );
}