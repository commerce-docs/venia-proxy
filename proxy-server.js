/* Copyright 2023 Adobe. All Rights Reserved.
NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying it. */

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
