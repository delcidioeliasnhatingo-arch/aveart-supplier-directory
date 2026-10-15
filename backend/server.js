"use strict";

const http = require("node:http");
const { URL } = require("node:url");

const PORT = Number(process.env.PORT || 8080);
const HOST = "0.0.0.0";

// Integrations remain disabled until credentials and supplier-specific tests are configured.
const suppliers = [];

function send(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "content-length": Buffer.byteLength(payload),
    "cache-control": "no-store",
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET,OPTIONS",
    "access-control-allow-headers": "content-type,authorization",
  });
  res.end(payload);
}

const server = http.createServer((req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET,OPTIONS",
      "access-control-allow-headers": "content-type,authorization",
    });
    return res.end();
  }

  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  const path = url.pathname.replace(/\/+$/, "") || "/";

  if (req.method !== "GET") {
    return send(res, 405, { error: "Method not allowed", allowedMethods: ["GET", "OPTIONS"] });
  }

  if (path === "/" || path === "/health" || path === "/api/health") {
    return send(res, 200, {
      name: "AVEART Supplier Directory API",
      status: "running",
      version: "1.1.0",
      timestamp: new Date().toISOString(),
      endpoints: ["GET /health", "GET /api/health", "GET /api/suppliers", "GET /api/suppliers/:id"],
      safety: "Supplier integrations and order forwarding are not enabled.",
    });
  }

  if (path === "/api/suppliers") {
    return send(res, 200, { count: suppliers.length, suppliers, integrationsEnabled: false });
  }

  const supplierMatch = path.match(/^\/api\/suppliers\/([a-zA-Z0-9_-]+)$/);
  if (supplierMatch) {
    const supplier = suppliers.find((item) => item.id === supplierMatch[1]);
    if (!supplier) return send(res, 404, { error: "Supplier not found", id: supplierMatch[1] });
    return send(res, 200, supplier);
  }

  return send(res, 404, { error: "Not found", path });
});

server.listen(PORT, HOST, () => {
  console.log(`AVEART Supplier Directory API listening on ${HOST}:${PORT}`);
});

process.on("SIGTERM", () => server.close(() => process.exit(0)));
process.on("SIGINT", () => server.close(() => process.exit(0)));
