const PROVIDER_PROFILE_KEY = "servenear_provider_profile";

const defaultProviderProfile = {
  fullName: "Thabo Mokoena",
  businessName: "Thabo Plumbing Services",
  category: "Plumbing",
  area: "Evaton",
  phone: "071 234 5678",
  priceEstimate: "From R350",
  availability: "Monday to Saturday, 08:00 - 17:00",
  verificationStatus: "pending",
  bio: "Reliable local plumber specialising in leaks, blocked drains, taps, toilets and bathroom repairs.",
  services: [
    "Leak repairs",
    "Blocked drains",
    "Tap installation",
    "Toilet repairs",
  ],
  portfolio: [
    "Kitchen sink installation",
    "Bathroom pipe repair",
    "Outdoor tap replacement",
  ],
};

export function getProviderProfile() {
  const storedProfile = localStorage.getItem(PROVIDER_PROFILE_KEY);

  if (!storedProfile) {
    return defaultProviderProfile;
  }

  try {
    return JSON.parse(storedProfile);
  } catch (error) {
    console.error("Failed to parse provider profile:", error);
    return defaultProviderProfile;
  }
}

export function saveProviderProfile(profile) {
  localStorage.setItem(PROVIDER_PROFILE_KEY, JSON.stringify(profile));
  return profile;
}

export function resetProviderProfile() {
  localStorage.removeItem(PROVIDER_PROFILE_KEY);
  return defaultProviderProfile;
}