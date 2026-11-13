import { useEffect, useState } from 'react'
import { getPostsByUser } from '../api/client'
import type { Post } from '../types'

export function usePosts(userId: number) {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)


    useEffect(() => {
        let ignore = false

        getPostsByUser(userId)
            .then(data => {
                if (!ignore) setPosts(data)
            })
            .catch((err: Error) => { if (!ignore) setError(err.message) })   
            .finally(() => { if (!ignore) setLoading(false) })              


        return () => { ignore = true }
    }, [userId])

    function addPost(post: Post) {
        setPosts(current => [post, ...current])
    }

    return { posts, loading, error, addPost }
}