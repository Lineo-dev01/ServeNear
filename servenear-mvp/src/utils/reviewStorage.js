const REVIEWS_KEY = "servenear_reviews";

export function getReviews() {
  const storedReviews = localStorage.getItem(REVIEWS_KEY);

  if (!storedReviews) {
    return [];
  }

  try {
    return JSON.parse(storedReviews);
  } catch (error) {
    console.error("Failed to parse reviews:", error);
    return [];
  }
}

export function getReviewForBooking(bookingId) {
  return getReviews().find((review) => review.bookingId === bookingId);
}

export function getReviewsForProvider(providerId) {
  return getReviews().filter((review) => review.providerId === providerId);
}

export function saveReview(review) {
  const existingReviews = getReviews();

  const alreadyReviewed = existingReviews.some(
    (item) => item.bookingId === review.bookingId
  );

  if (alreadyReviewed) {
    return existingReviews;
  }

  const updatedReviews = [review, ...existingReviews];

  localStorage.setItem(REVIEWS_KEY, JSON.stringify(updatedReviews));

  return updatedReviews;
}

export function getAverageRating(providerId, fallbackRating = 0) {
  const providerReviews = getReviewsForProvider(providerId);

  if (providerReviews.length === 0) {
    return fallbackRating;
  }

  const total = providerReviews.reduce(
    (sum, review) => sum + Number(review.rating),
    0
  );

  return (total / providerReviews.length).toFixed(1);
}