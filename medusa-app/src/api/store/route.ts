import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

/**
 * Small storefront API smoke test. The rest of the Store API is provided by Medusa.
 */
export async function GET(_req: MedusaRequest, res: MedusaResponse) {
  res.json({ status: "ok", service: "AVEART Medusa Store API" })
}
