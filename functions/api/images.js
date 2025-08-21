export async function onRequestGet({ request, env }) {
  const url = new URL(request.url)
  const key = url.searchParams.get('key')

  if (!key) {
    return new Response('Secret key is required', { status: 400 })
  }

  const imageList = await env.IMG_KV.get(key)

  return new Response(imageList || '[]', {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}