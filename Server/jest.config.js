/** @returns {Promise<import('jest').Config>} */
module.exports = async () => {
  return {
    verbose: true,
    testTimeout: 30_000_000, // I give up.
  };
};
