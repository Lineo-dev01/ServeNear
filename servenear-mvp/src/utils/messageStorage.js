const MESSAGES_KEY = "servenear_messages";

export function getMessages() {
  const storedMessages = localStorage.getItem(MESSAGES_KEY);

  if (!storedMessages) {
    return [];
  }

  try {
    return JSON.parse(storedMessages);
  } catch (error) {
    console.error("Failed to parse messages:", error);
    return [];
  }
}

export function getMessagesForBooking(bookingId) {
  return getMessages().filter((message) => message.bookingId === bookingId);
}

export function saveMessage(message) {
  const existingMessages = getMessages();
  const updatedMessages = [...existingMessages, message];

  localStorage.setItem(MESSAGES_KEY, JSON.stringify(updatedMessages));

  return updatedMessages;
}