import { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import Footer from "./Components/Footer";
import TypingBox from "./Components/TypingBox";
import { useTheme } from "./Context/ThemeContext";
import { GlobalStyles } from "./Styles/global";


function App() {

  const {theme} = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles/>
      <Alert/>
      <Routes>
        <Route path='/' element={<HomePage/>}   />
        <Route path='/user' element={<UserPage/>} />
        <Route path='/compare/:username' element={<ComparePage/>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
