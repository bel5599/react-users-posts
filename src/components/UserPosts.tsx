import { usePosts } from '../hooks/usePosts'
import type { User } from '../types'
import { NewPostForm } from './NewPostForm'
import { PostList } from './PostList'

export function UserPosts({ user }: { user: User }) {
  const { posts, loading, error, addPost } = usePosts(user.id)

  return (
    <section>
      <h2>Publicaciones de {user.name}</h2>
      <NewPostForm userId={user.id} onCreated={addPost} />
      {loading ? (
        <p>Cargando publicaciones…</p>
      ) : error ? (
        <p role="alert">Error: {error}</p>
      ) : (
        <PostList posts={posts} />
      )}
    </section>
  )
}
