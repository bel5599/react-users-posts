import { useState } from 'react'
import './App.css'
import type { User } from './types'
import { useUsers } from './hooks/useUsers'
import { UserList } from './components/UserList'

function App() {
  const { users, loading, error } = useUsers()
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  return (
    <main>
      <h1>Usuarios y publicaciones</h1>
      {
        loading ? (
          <p>Cargando usuarios...</p>
        ) : error ? (
          <p role="alert">Error: {error}</p>
        ) : (
          <UserList
            users={users}
            selectedId={selectedUser?.id || null}
            onSelect={setSelectedUser}
          />
        )
      }
    </main>
  )
}


export default App
