// utils/getLatestValidSubscription.js

export const getLatestValidSubscription = (subscriptions = []) => {
  if (!Array.isArray(subscriptions) || subscriptions.length === 0) {
    return { isValid: false, latestSubscription: null };
  }

  // Sort by endDate descending (latest first)
  const sortedSubs = [...subscriptions].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const latestSubscription = sortedSubs[0];

  const isValid =
    // latestSubscription.status === "pending" &&
    new Date(latestSubscription.endDate) > new Date();

  return { isValid, latestSubscription };
};
