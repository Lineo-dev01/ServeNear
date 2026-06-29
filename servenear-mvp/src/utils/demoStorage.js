export function clearDemoData() {
  const keysToRemove = [
    "servenear_bookings",
    "servenear_messages",
    "servenear_reviews",
    "servenear_provider_profile",
  ];

  keysToRemove.forEach((key) => localStorage.removeItem(key));
}

export function clearAllDemoData() {
  const keysToRemove = [
    "servenear_bookings",
    "servenear_messages",
    "servenear_reviews",
    "servenear_provider_profile",
    "servenear_users",
    "servenear_current_user",
  ];

  keysToRemove.forEach((key) => localStorage.removeItem(key));
}