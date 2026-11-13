import { useState } from 'react'
import type { FormEvent } from 'react'
import { createPost } from '../api/client'
import type { Post } from '../types'

interface NewPostFormProps {
  userId: number
  onCreated: (post: Post) => void
}

interface FormErrors {
  title?: string
  body?: string
}

export function NewPostForm({ userId, onCreated }: NewPostFormProps) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault() 

    const newErrors: FormErrors = {}
    if (!title.trim()) newErrors.title = 'El título es obligatorio'
    if (!body.trim()) newErrors.body = 'El texto es obligatorio'
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setSubmitting(true)
    setSubmitError(null)
    try {
      const created = await createPost({ userId, title: title.trim(), body: body.trim() })
      onCreated({ ...created, id: Date.now() })
      setTitle('')
      setBody('')
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Error inesperado')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h3>Nueva publicación</h3>

      <label htmlFor="title">Título</label>
      <input id="title" value={title} onChange={e => setTitle(e.target.value)} />
      {errors.title && <p className="field-error">{errors.title}</p>}

      <label htmlFor="body">Texto</label>
      <textarea id="body" value={body} onChange={e => setBody(e.target.value)} />
      {errors.body && <p className="field-error">{errors.body}</p>}

      {submitError && <p role="alert">{submitError}</p>}

      <button type="submit" disabled={submitting}>
        {submitting ? 'Publicando…' : 'Publicar'}
      </button>
    </form>
  )
}
