import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

/**
 * Confirms the custom API router is loaded. Authentication and administration
 * are still handled by Medusa's built-in Admin API and dashboard.
 */
export async function GET(_req: MedusaRequest, res: MedusaResponse) {
  res.json({ status: "ok", service: "AVEART Medusa Admin API extension point" })
}
