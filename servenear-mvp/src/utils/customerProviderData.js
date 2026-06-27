import { providers } from "../data/mockData";
import { getProviderProfile } from "./providerStorage";

export function getCustomerProviders() {
  const savedProviderProfile = getProviderProfile();

  return providers.map((provider) => {
    if (provider.id !== "1") {
      return provider;
    }

    return {
      ...provider,
      name: savedProviderProfile.fullName,
      businessName: savedProviderProfile.businessName,
      category: savedProviderProfile.category,
      area: savedProviderProfile.area,
      priceEstimate: savedProviderProfile.priceEstimate,
      description: savedProviderProfile.bio,
      portfolio: savedProviderProfile.portfolio,
      availability: savedProviderProfile.availability,
      verified: savedProviderProfile.verificationStatus === "verified",
      verificationStatus: savedProviderProfile.verificationStatus,
    };
  });
}

export function getCustomerProviderById(providerId) {
  return getCustomerProviders().find((provider) => provider.id === providerId);
}