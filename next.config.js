const moduleExports = {
  publicRuntimeConfig: {
    API_MOCKING: process.env.API_MOCKING,
    CKF_PROFILE_API: process.env.CKF_PROFILE_API,
    CKF_RECIPES_API: process.env.CKF_RECIPES_API,
  },
  images: {
    domains: ["election.kmutt.ac.th"],
  },
  experimental: {
    outputStandalone: true,
  },
};

module.exports = moduleExports;
