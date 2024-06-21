import { useUsers } from "./useUser";

export function App() {
  const { filter, setFilter, users } = useUsers();

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-slate-950 min-h-screen">
      <h1 className="font-bold text-3xl text-slate-200">User list</h1>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="rounded-md bg-slate-800 text-slate-200 border-slate-200 border p-1"
      />
      {users.length == 0 ? (
        <div>Loading...</div>
      ) : (
        <ul className="flex flex-wrap justify-center gap-8 border rounded-md p-4">
          {users.map((user) => (
            <li
              key={user.username}
              className="flex flex-col bg-slate-800 rounded-md p-4 text-center"
            >
              <img src={user.image} alt={user.username} />
              <h1 className="text-slate-200 text-2xl font-bold">
                {user.username}
              </h1>
              <p className="text-slate-400 font-semibold">Role: {user.role}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
