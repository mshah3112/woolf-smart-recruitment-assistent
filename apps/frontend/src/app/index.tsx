import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "@/components/theme";
import Sidebar from "@/components/LayoutSidebar";
import Topbar from "@/components/Topbar"
import { ResumeAnalyser } from "@/app/ResumeAnalyser";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar/>
           <main className="content">
             <Topbar />
             <Routes>
              <Route path="/" element={<ResumeAnalyser />} />
              <Route path="/resume-analysis" element={<ResumeAnalyser />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;