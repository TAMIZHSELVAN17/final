module.exports = {
  // ... other config
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext]',
        },
      },
      // ... other rules
    ],
  },
  // ... rest of config
};