import sanityClient from '@sanity/client'

export const client = sanityClient({
    projectId: 'v5610h49',
    dataset: 'production',
    apiVersion: 'v1',
    token:process.env.NEXT_PUBLIC_SANITY_TOKEN,
    useCdn: false,
})