const BOOKINGS_KEY = "servenear_bookings";

export function getBookings() {
  const storedBookings = localStorage.getItem(BOOKINGS_KEY);

  if (!storedBookings) {
    return [];
  }

  try {
    return JSON.parse(storedBookings);
  } catch (error) {
    console.error("Failed to parse bookings:", error);
    return [];
  }
}

export function saveBooking(booking) {
  const existingBookings = getBookings();
  const updatedBookings = [booking, ...existingBookings];

  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updatedBookings));

  return updatedBookings;
}

export function updateBookingStatus(bookingId, newStatus) {
  const existingBookings = getBookings();

  const updatedBookings = existingBookings.map((booking) =>
    booking.id === bookingId ? { ...booking, status: newStatus } : booking
  );

  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updatedBookings));

  return updatedBookings;
}