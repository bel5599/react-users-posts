import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NewPostForm } from './NewPostForm'
import { createPost } from '../api/client'

vi.mock('../api/client') // sustituye las funciones de la API por simulaciones

describe('NewPostForm', () => {
  beforeEach(() => vi.clearAllMocks())

  it('muestra errores y no llama a la API si faltan campos', async () => {
    const user = userEvent.setup()
    const onCreated = vi.fn()
    render(<NewPostForm userId={1} onCreated={onCreated} />)

    await user.click(screen.getByRole('button', { name: 'Publicar' }))

    expect(screen.getByText('El título es obligatorio')).toBeInTheDocument()
    expect(screen.getByText('El texto es obligatorio')).toBeInTheDocument()
    expect(createPost).not.toHaveBeenCalled()
    expect(onCreated).not.toHaveBeenCalled()
  })

  it('crea la publicación y vacía el formulario', async () => {
    const user = userEvent.setup()
    const onCreated = vi.fn()
    vi.mocked(createPost).mockResolvedValue({ id: 101, userId: 1, title: 'Hola', body: 'Mi texto' })
    render(<NewPostForm userId={1} onCreated={onCreated} />)

    await user.type(screen.getByLabelText('Título'), 'Hola')
    await user.type(screen.getByLabelText('Texto'), 'Mi texto')
    await user.click(screen.getByRole('button', { name: 'Publicar' }))

    await waitFor(() =>
      expect(onCreated).toHaveBeenCalledWith(expect.objectContaining({ title: 'Hola', body: 'Mi texto' }))
    )
    expect(screen.getByLabelText('Título')).toHaveValue('')
  })
})