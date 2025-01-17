import "./App.css";
import useInView from "./hooks/useInView";

function App() {
  const { ref, isInView } = useInView();

  console.log("isInView", isInView);

  return (
    <>
      <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            style={{ width: 100, height: 100, backgroundColor: "#ffee21" }}
          ></div>
        ))}
        <div
          ref={ref}
          style={{
            width: 100,
            height: 100,
            backgroundColor: "#ff6600",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          target
        </div>
      </div>
    </>
  );
}

export default App;
