import { useEffect, useState } from "react";
import "./App.css";
import "./skeleton.css";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Error {
  message: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
  });
  const [isUsersLoading, setIsUsersLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsUsersLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const response = await fetch("http://localhost:3001/users");
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError({ message: "유저를 불러오는 중 오류가 발생했습니다." });
    } finally {
      setIsUsersLoading(false);
    }
  };

  const addUser = async (user: Omit<User, "id">, id: number) => {
    setUsers([...users, { ...user, id }]);
    await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...user, id }),
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addUser(newUser, users.length + 1);

    setNewUser({
      name: "",
      email: "",
    });
  };

  const SkeletonLoader = () => (
    <ul className="user-list">
      {[1, 2, 3, 4, 5].map((index) => (
        <li key={index} className="skeleton-item"></li>
      ))}
    </ul>
  );

  return (
    <div className="container">
      <h1 className="title">유저 관리</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="이메일을 입력하세요."
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="이름을 입력하세요."
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <button type="submit">유저 추가하기</button>
      </form>
      <div className="user-list-container">
        {error && <p className="error-message">{error?.message}</p>}
        {isUsersLoading ? (
          <SkeletonLoader />
        ) : (
          <ul className="user-list">
            {users.map((user) => (
              <li key={user.id}>
                {user.name} ({user.email})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
