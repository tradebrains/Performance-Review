/** @type {import('next').NextConfig} */

module.exports = {
  // reactStrictMode: true,
  env: {
    // NEXT_APP_BASE_URL: "https://portal.tradebrains.in/api/",
    NEXT_APP_BASE_URL: "https://api.dev.hrms.bloomingwaves.com/api/",
  },
  async headers() {
    return [];
  },
  images: {
    domains: [
      "tradebrains.in",
      "pagead2.googlesyndication.com",
      "tradebrains-portal.s3.amazonaws.com",
      "fingrad-staging.s3.amazonaws.com",
      "fingrad-staging.s3.ap-south-1.amazonaws.com",
      "firebasestorage.googleapis.com",
      "st3.depositphotos.com",
      "lh3.googleusercontent.com",
      "tradebrains-portal.s3.ap-south-1.amazonaws.com",
      "https://tradebrains.in/features/wp-json/wp",
      "lh4.googleusercontent.com",
      "lh5.googleusercontent.com",
      "lh6.googleusercontent.com",
    ],
  },
};
