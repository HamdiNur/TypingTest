
import TypingBox from "./components/TypingBox";
import { GlobalStyles } from "./styles/Global";

function App() {
  return (
    <div className="canvas">
      <GlobalStyles/>
        <div>Header</div>
        <TypingBox/>
        <div>Footer</div>

    </div>
  );
}

export default App;