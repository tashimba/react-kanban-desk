import Board from "./components/Board";
import LeftBar from "./components/LeftBar";

const App = () => {
  return (
    <div>
      <LeftBar />
      <Board kanban={-1} />
    </div>
  );
};

export default App;
