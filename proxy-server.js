/* Copyright 2023 Adobe. All Rights Reserved.
NOTICE: All information contained herein is, and remains the property of Adobe and its suppliers, if any. The intellectual and technical concepts contained herein are proprietary to Adobe and its suppliers and are protected by all applicable intellectual property laws, including trade secret and copyright laws. Dissemination of this information or reproduction of this material is strictly forbidden unless prior written permission is obtained from Adobe.
*/

import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";

const PORT = process.env.PORT || 3002;
const TARGET_URL =
  process.env.TARGET_URL || "https://venia.magento.com/graphql";

const app = express();

// CORS setup
app.use((req, res, next) => {
  cors({
    origin: (origin, callback) => {
      // TODO: should further restrict the allowed origins here.
      callback(null, origin);
    },
  })(req, res, next);
});

// Proxy middleware
app.use(
  "/",
  createProxyMiddleware({
    target: TARGET_URL,
    changeOrigin: true,
  })
);

// Start server
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
