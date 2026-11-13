import type { Post, User, NewPost } from '../types'

const BASE_URL = 'https://jsonplaceholder.typicode.com'

export async function getUsers(): Promise<User[]> {
  const res = await fetch(`${BASE_URL}/users`)
  if (!res.ok) throw new Error(`Error al cargar usuarios (${res.status})`)
  return res.json()
}

export async function getPostsByUser(userId: number): Promise<Post[]> {
  const res = await fetch(`${BASE_URL}/posts?userId=${userId}`)
  if (!res.ok) throw new Error(`Error al cargar publicaciones (${res.status})`)
  return res.json()
}

export async function createPost(post: NewPost): Promise<Post> {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  })
  if (!res.ok) throw new Error(`Error al crear publicación (${res.status})`)
  return res.json()
}