import { useQuery } from "@tanstack/react-query";
import "./App.css";

interface User {
  id: string;
  name: string;
  device: string;
  age: number;
  lastname: string;
}

const fetchUsers = async () => {
  const res = await fetch("http://localhost:8080/users");
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return res.json();
};

function App() {
  const { data, isLoading, error } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
  });

  if (isLoading)
    return (
      <div className="container">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="skeleton-user">
            <div className="skeleton skeleton-title"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-etc"></div>
            <div className="skeleton skeleton-etc"></div>
          </div>
        ))}
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="container">
        {data?.map((user) => (
          <div key={user.id} className="user">
            <h2>{user.name}</h2>
            <p>{user.device}</p>
            <p>{user.age}</p>
            <p>{user.lastname}</p>
          </div>
        ))}
        <div>footer</div>
      </div>
    </>
  );
}

export default App;
