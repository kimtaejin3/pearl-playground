import { useSuspenseQuery } from "@tanstack/react-query";
import { User } from "./App";

const fetchUsers = async () => {
  const res = await fetch("http://localhost:8080/users");
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return res.json();
};

export default function Users() {
  const { data } = useSuspenseQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
  });

  return (
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
  );
}
