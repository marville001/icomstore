// middleware/tenant.ts
import payload from 'payload'

export interface TenantRequest extends Request {
  store?: any
}

export const tenantMiddleware = async (req: TenantRequest, res: Response, next: NextFunction) => {
  const hostname = req.headers.host

  try {
    // Check for custom domain first
    let store = await payload.find({
      collection: 'stores',
      where: {
        customDomain: { equals: hostname },
        active: { equals: true },
      },
    })

    // If no store found with custom domain, check subdomain
    if (!store.docs.length) {
      const subdomain = hostname.split('.')[0]
      store = await payload.find({
        collection: 'stores',
        where: {
          subdomain: { equals: subdomain },
          active: { equals: true },
        },
      })
    }

    if (store.docs.length) {
      req.store = store.docs[0]
    }

    next()
  } catch (error) {
    next(error)
  }
}
