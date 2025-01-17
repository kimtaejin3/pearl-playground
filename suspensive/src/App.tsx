import "./App.css";
import { fetchUsers } from "./Users";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "@suspensive/react";
import { SuspenseQuery } from "@suspensive/react-query";
import { FadeIn } from "@suspensive/react-dom";

export interface User {
  id: string;
  name: string;
  device: string;
  age: number;
  lastname: string;
}

function App() {
  const [page, setPage] = useState(1);

  return (
    <div className="container">
      <ErrorBoundary fallback={<div>Error</div>}>
        <Suspense
          fallback={
            <FadeIn delay={2000}>
              {(fadein) => (
                <div {...fadein} className="container">
                  {[1, 2, 3, 4].map((n) => (
                    <div key={n} className="skeleton-user">
                      <div className="skeleton skeleton-title"></div>
                      <div className="skeleton skeleton-text"></div>
                      <div className="skeleton skeleton-text"></div>
                      <div className="skeleton skeleton-etc"></div>
                      <div className="skeleton skeleton-etc"></div>
                    </div>
                  ))}
                  <div className="footer">
                    <button onClick={() => setPage(page - 1)}>prev</button>
                    <button onClick={() => setPage(page + 1)}>next</button>
                  </div>
                </div>
              )}
            </FadeIn>
          }
        >
          <SuspenseQuery
            queryKey={["users", page]}
            queryFn={() => fetchUsers({ page, limit: 5 })}
          >
            {({ data }) => {
              return (
                <div className="container">
                  {data?.map((user: User) => (
                    <div key={user.id} className="user">
                      <h2>{user.name}</h2>
                      <p>{user.device}</p>
                      <p>{user.age}</p>
                      <p>{user.lastname}</p>
                    </div>
                  ))}
                  <div className="footer">
                    <button onClick={() => setPage(page - 1)}>prev</button>
                    <button onClick={() => setPage(page + 1)}>next</button>
                  </div>
                </div>
              );
            }}
          </SuspenseQuery>
        </Suspense>

        <div>made by @Taejin Kim</div>
      </ErrorBoundary>
    </div>
  );
}

export default App;
