/**
 * Utility functions (localStorage-only version)
 * No API calls - all data stored in browser localStorage
 */

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
