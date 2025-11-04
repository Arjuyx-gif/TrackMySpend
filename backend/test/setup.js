// Test setup file
process.env.NODE_ENV = 'test';
process.env.MONGO_URI = process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/trackmyspend_test';
process.env.JWT_SECRET = 'test-jwt-secret-key-for-testing-only';
