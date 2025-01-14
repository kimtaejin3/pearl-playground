import "./App.css";
import Users from "./Users";
import { Suspense } from "react";
import { ErrorBoundary } from "@suspensive/react";

export interface User {
  id: string;
  name: string;
  device: string;
  age: number;
  lastname: string;
}

function App() {
  return (
    <div className="container">
      <ErrorBoundary fallback={<div>Error</div>}>
        <Suspense
          fallback={
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
          }
        >
          <Users />
        </Suspense>
        <div>made by @Taejin Kim</div>
      </ErrorBoundary>
    </div>
  );
}

export default App;
