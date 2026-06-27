import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import Button from "../ui/Button";
import Card from "../ui/Card";
import StatusBadge from "../ui/StatusBadge";
import { getBookings } from "../../utils/bookingStorage";
import {
  getMessagesForBooking,
  saveMessage,
} from "../../utils/messageStorage";

export default function MessageCenter({ userType = "customer" }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const bookings = getBookings();

  const firstBookingId = bookings[0]?.id || "";
  const selectedBookingId = searchParams.get("bookingId") || firstBookingId;

  const selectedBooking = bookings.find(
    (booking) => booking.id === selectedBookingId
  );

  const [messages, setMessages] = useState(
    selectedBookingId ? getMessagesForBooking(selectedBookingId) : []
  );

  const [messageText, setMessageText] = useState("");
  const [error, setError] = useState("");

  const pageCopy = useMemo(() => {
    if (userType === "provider") {
      return {
        title: "Customer Messages",
        description: "View and reply to customers linked to your job requests.",
        emptyTitle: "No customer messages yet",
        emptyDescription:
          "Customer conversations will appear once bookings are created.",
        senderLabel: "Provider",
        receiverLabel: "Customer",
        placeholder: "Type a reply to the customer...",
      };
    }

    return {
      title: "Messages",
      description: "View conversations linked to your service bookings.",
      emptyTitle: "No messages yet",
      emptyDescription:
        "Once you book a provider, your conversations will appear here.",
      senderLabel: "Customer",
      receiverLabel: "Provider",
      placeholder: "Type a message to the provider...",
    };
  }, [userType]);

  function handleSelectBooking(bookingId) {
    setSearchParams({ bookingId });
    setMessages(getMessagesForBooking(bookingId));
    setMessageText("");
    setError("");
  }

  function handleSendMessage(event) {
    event.preventDefault();

    if (!selectedBooking) {
      setError("Please select a booking first.");
      return;
    }

    if (!messageText.trim()) {
      setError("Message cannot be empty.");
      return;
    }

    const newMessage = {
      id: crypto.randomUUID(),
      bookingId: selectedBooking.id,
      senderRole: userType,
      text: messageText.trim(),
      createdAt: new Date().toISOString(),
    };

    saveMessage(newMessage);
    setMessages(getMessagesForBooking(selectedBooking.id));
    setMessageText("");
    setError("");
  }

  if (bookings.length === 0) {
    return (
      <>
        <section className="page-header">
          <p className="eyebrow">{pageCopy.title}</p>
          <h1>{pageCopy.emptyTitle}</h1>
          <p>{pageCopy.emptyDescription}</p>
        </section>

        <div className="empty-state">
          <h2>No bookings found</h2>
          <p>You need at least one booking before messages can be created.</p>

          {userType === "customer" ? (
            <Link to="/customer/search">
              <Button>Find a Provider</Button>
            </Link>
          ) : (
            <Link to="/provider/dashboard">
              <Button>Back to Dashboard</Button>
            </Link>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <section className="page-header">
        <p className="eyebrow">{pageCopy.title}</p>
        <h1>{pageCopy.title}</h1>
        <p>{pageCopy.description}</p>
      </section>

      <section className="message-layout">
        <aside className="conversation-list">
          <h2>Conversations</h2>

          {bookings.map((booking) => (
            <button
              key={booking.id}
              type="button"
              className={
                selectedBooking?.id === booking.id
                  ? "conversation-item active"
                  : "conversation-item"
              }
              onClick={() => handleSelectBooking(booking.id)}
            >
              <span>{booking.businessName}</span>
              <small>{booking.bookingDate}</small>
              <StatusBadge status={booking.status} />
            </button>
          ))}
        </aside>

        <Card className="chat-panel">
          {selectedBooking ? (
            <>
              <div className="chat-header">
                <div>
                  <p className="provider-category">
                    {selectedBooking.category}
                  </p>
                  <h2>{selectedBooking.businessName}</h2>
                  <p>{selectedBooking.address}</p>
                </div>

                <StatusBadge status={selectedBooking.status} />
              </div>

              <div className="message-thread">
                {messages.length === 0 ? (
                  <div className="empty-chat">
                    <h3>No messages in this conversation yet</h3>
                    <p>Send the first message below.</p>
                  </div>
                ) : (
                  messages.map((message) => {
                    const isOwnMessage = message.senderRole === userType;

                    return (
                      <div
                        key={message.id}
                        className={
                          isOwnMessage
                            ? "message-bubble own-message"
                            : "message-bubble other-message"
                        }
                      >
                        <small>
                          {isOwnMessage
                            ? pageCopy.senderLabel
                            : pageCopy.receiverLabel}
                        </small>
                        <p>{message.text}</p>
                        <span>
                          {new Date(message.createdAt).toLocaleString()}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>

              <form className="message-form" onSubmit={handleSendMessage}>
                <textarea
                  rows="3"
                  placeholder={pageCopy.placeholder}
                  value={messageText}
                  onChange={(event) => setMessageText(event.target.value)}
                />

                {error && <span className="form-error">{error}</span>}

                <Button type="submit">Send Message</Button>
              </form>
            </>
          ) : (
            <div className="empty-state">
              <h2>Select a conversation</h2>
              <p>Choose a booking conversation from the list.</p>
            </div>
          )}
        </Card>
      </section>
    </>
  );
}