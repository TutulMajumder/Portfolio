const config = {
  node_env: process.env.NODE_ENV,

  database_url: process.env.DATABASE_URL,

  jwt_secret: process.env.JWT_SECRET,

  admin_email: process.env.ADMIN_EMAIL || "admin@example.com",
  admin_password: process.env.ADMIN_PASSWORD || "changeme123",

  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
};

export default config;
