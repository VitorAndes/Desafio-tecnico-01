import { useEffect, useState } from "react";

type Users = {
  username: string;
  image: string;
  role: string;
};

export function App() {
  const [users, setUsers] = useState<Users[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
      })
      .catch((error) => console.error("Error fetching the user data: ", error));
  }, []);

  if (users.length == 0) {
    return <div>Loading...</div>;
  }

  const filteredUsers = users.filter((user) =>
    user.role.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
  );

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-slate-950 min-h-screen">
      <h1 className="font-bold text-3xl text-slate-200">User list</h1>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="rounded-md bg-slate-800 text-slate-200 border-slate-200 border p-1"
      />
      <ul className="flex flex-wrap justify-center gap-8 border rounded-md p-4">
        {filteredUsers.map((user, i) => (
          <li
            key={i}
            className="flex flex-col bg-slate-800 rounded-md p-4 text-center"
          >
            <img src={user.image} alt={user.username} />
            <span className="text-slate-200 text-2xl font-bold">
              {user.username}
            </span>
            <span className="text-slate-400 font-semibold">{user.role}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
