import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UserList } from './UserList'
import type { User } from '../types'

const users: User[] = [
  { id: 1, name: 'Leanne Graham', username: 'Bret', email: 'leanne@test.com' },
  { id: 2, name: 'Ervin Howell', username: 'Antonette', email: 'ervin@test.com' },
]

describe('UserList', () => {
  it('filtra usuarios por nombre sin distinguir mayúsculas', async () => {
    const user = userEvent.setup()
    render(<UserList users={users} selectedId={null} onSelect={() => {}} />)

    await user.type(screen.getByLabelText('Buscar usuario'), 'ERVIN')

    expect(screen.getByText('Ervin Howell')).toBeInTheDocument()
    expect(screen.queryByText('Leanne Graham')).not.toBeInTheDocument()
  })

  it('muestra un mensaje si ningún usuario coincide', async () => {
    const user = userEvent.setup()
    render(<UserList users={users} selectedId={null} onSelect={() => {}} />)

    await user.type(screen.getByLabelText('Buscar usuario'), 'zzz')

    expect(screen.getByText('No hay usuarios que coincidan')).toBeInTheDocument()
  })
})
