export async function onRequestPost({ request, env }) {
  const { key, imageUrl } = await request.json()

  if (!key || !imageUrl) {
    return new Response('Secret key and image URL are required', { status: 400 })
  }

  let imageList = await env.IMG_KV.get(key)
  if (imageList) {
    imageList = JSON.parse(imageList)
    const index = imageList.indexOf(imageUrl)
    if (index > -1) {
      imageList.splice(index, 1)
      await env.IMG_KV.put(key, JSON.stringify(imageList))
      return new Response('Image deleted successfully', { status: 200 })
    } else {
      return new Response('Image not found', { status: 404 })
    }
  } else {
    return new Response('Image list not found', { status: 404 })
  }
}