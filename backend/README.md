# AVEART Supplier Directory API

Standalone Node.js HTTP API intended to run from the `backend` directory on Railway.

- `GET /health` or `GET /api/health`: service health and endpoint information
- `GET /api/suppliers`: supplier directory (empty until suppliers are configured)
- `GET /api/suppliers/:id`: lookup a supplier by ID

Supplier integrations and order forwarding are intentionally disabled until credentials and supplier-specific tests are configured.
