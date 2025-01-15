import { useSuspenseQuery } from "@tanstack/react-query";
import { User } from "./App";
import { useState } from "react";

export const fetchUsers = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const res = await fetch(
    `http://localhost:8080/users?_page=${page}&_per_page=${limit}`
  );
  const data = await res.json();
  return data.data;
};

export default function Users() {
  const [page, setPage] = useState(1);

  const { data } = useSuspenseQuery<User[]>({
    queryKey: ["users", page],
    queryFn: () => fetchUsers({ page, limit: 5 }),
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
      <button onClick={() => setPage(page + 1)}>next</button>
    </div>
  );
}
