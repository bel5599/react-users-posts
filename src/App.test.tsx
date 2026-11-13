import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { getPostsByUser, getUsers } from './api/client'

vi.mock('./api/client')

describe('App', () => {
  beforeEach(() => vi.clearAllMocks())

  it('muestra un error si falla la carga de usuarios', async () => {
    vi.mocked(getUsers).mockRejectedValue(new Error('Error al cargar usuarios (500)'))
    render(<App />)

    expect(await screen.findByRole('alert')).toHaveTextContent('Error al cargar usuarios (500)')
  })

  it('al elegir un usuario muestra sus publicaciones', async () => {
    const user = userEvent.setup()
    vi.mocked(getUsers).mockResolvedValue([
      { id: 1, name: 'Leanne Graham', username: 'Bret', email: 'leanne@test.com' },
    ])
    vi.mocked(getPostsByUser).mockResolvedValue([
      { id: 1, userId: 1, title: 'Mi primer post', body: 'Contenido' },
    ])
    render(<App />)

    await user.click(await screen.findByRole('button', { name: /Leanne Graham/ }))

    expect(await screen.findByText('Mi primer post')).toBeInTheDocument()
    expect(getPostsByUser).toHaveBeenCalledWith(1)
  })
})
