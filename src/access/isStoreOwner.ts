// access/isStoreOwner.ts
import type { Access } from 'payload'

export const isStoreOwner: Access = ({ req: { user } }) => {
  if (!user) return false

  if (user.role === 'admin') return true

  if (user.role === 'store-owner') {
    return {
      'owner.id': {
        equals: user.id,
      },
    }
  }

  return false
}
