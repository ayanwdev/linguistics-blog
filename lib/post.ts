import { Client, Databases, Storage, Query } from "node-appwrite"

export function getFileViewUrl(bucketId: string, fileId: string) {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!
  const url = new URL(
    `${endpoint}/storage/buckets/${bucketId}/files/${fileId}/view`,
  )

  url.searchParams.set("project", projectId)

  return url.toString()
}

export async function getPost(slug: string) {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_API_KEY!)

  const databases = new Databases(client)
  const storage = new Storage(client)

  const result = await databases.listDocuments({
    databaseId: process.env.NEXT_PUBLIC_APPRWITE_POSTS_DB!,
    collectionId: "posts",
    queries: [Query.equal("slug", slug)],
  })

  const post = result.documents[0]
  if (!post) return null

  const fileBuffer = await storage.getFileDownload({
    bucketId: process.env.NEXT_PUBLIC_APPRWITE_POSTS_BUCKET!,
    fileId: `${post.$id}.md`,
  })
  const content = Buffer.from(fileBuffer).toString("utf-8")

  let cover: string | null = null
  for (const ext of ["jpg", "jpeg", "png"]) {
    const fileId = `${post.$id}.${ext}`

    try {
      await storage.getFile({
        bucketId: process.env.NEXT_PUBLIC_APPRWITE_CVIMAGE_BUCKET!,
        fileId,
      })
      cover = getFileViewUrl(
        process.env.NEXT_PUBLIC_APPRWITE_CVIMAGE_BUCKET!,
        fileId,
      )
      break
    } catch {
      // try next extension
    }
  }

  return { post, content, cover }
}

export async function getPosts() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_API_KEY!)

  const databases = new Databases(client)

  const result = await databases.listDocuments({
    databaseId: process.env.NEXT_PUBLIC_APPRWITE_POSTS_DB!,
    collectionId: "posts",
  })

  return result.documents
}
