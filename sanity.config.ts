import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'Dušan Rakić - Knjige',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '45sk4b34',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  basePath: '/studio',

  plugins: [deskTool()],

  schema: {
    types: schemaTypes,
  },
})
