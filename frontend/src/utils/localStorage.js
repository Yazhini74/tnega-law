// localStorage utility for storing and retrieving application data

const STORAGE_KEY = 'tnega_law_applications';

/**
 * Save new application
 */
export const saveApplication = (applicationData) => {
  const applications = getAllApplications();
  const id = Date.now().toString();
  const newApp = {
    id,
    ...applicationData,
    createdAt: new Date().toISOString(),
  };
  applications.push(newApp);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
  return id;
};

/**
 * Get all applications
 */
export const getAllApplications = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

/**
 * Get single application by ID
 */
export const getApplicationById = (id) => {
  const applications = getAllApplications();
  return applications.find((app) => app.id === id);
};

/**
 * Update application
 */
export const updateApplication = (id, updatedData) => {
  const applications = getAllApplications();
  const index = applications.findIndex((app) => app.id === id);
  if (index !== -1) {
    applications[index] = {
      ...applications[index],
      ...updatedData,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
    return true;
  }
  return false;
};

/**
 * Delete application
 */
export const deleteApplication = (id) => {
  const applications = getAllApplications();
  const filtered = applications.filter((app) => app.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
};

/**
 * Save form section data
 */
export const saveSectionData = (applicantId, section, data) => {
  const app = getApplicationById(applicantId);
  if (app) {
    const updated = {
      ...app,
      [section]: data,
    };
    updateApplication(applicantId, updated);
  }
};

/**
 * Get form section data
 */
export const getSectionData = (applicantId, section) => {
  const app = getApplicationById(applicantId);
  return app ? app[section] : null;
};
