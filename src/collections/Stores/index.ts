import { authenticated } from '@/access/authenticated'
import { CollectionConfig } from 'payload'

export const Stores: CollectionConfig = {
  slug: 'stores',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'subdomain',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'customDomain',
      type: 'text',
      unique: true,
    },
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data }) => {
        // Generate subdomain from store name if not provided
        if (!data.subdomain) {
          data.subdomain = data.name.toLowerCase().replace(/[^a-z0-9]/g, '-')
        }
        return data
      },
    ],
  },
}
