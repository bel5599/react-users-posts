import { useState } from 'react'
import type { User } from '../types'

interface UserListProps {
  users: User[]
  selectedId: number | null
  onSelect: (user: User) => void
}

export function UserList({ users, selectedId, onSelect }: UserListProps) {
  const [search, setSearch] = useState('');
  const filtered = users.filter(user => user.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <section>
      <input
        type="search"
        aria-label="Buscar usuario"
        placeholder="Buscar por nombre"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {filtered.length === 0 ? (
        <p>No hay usuarios que coincidan</p>
      ) : (
        <ul>
          {filtered.map(user => (
            <li key={user.id}>
              <button
                type="button"
                aria-pressed={user.id === selectedId}
                onClick={() => onSelect(user)}
              >
                <strong>{user.name}</strong>
                <span>{user.email}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}