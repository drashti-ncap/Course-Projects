import React, { useState } from 'react'

const ThemeSwitcher = () => {

  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
  }

  const lightMode = {
    backgroundColor: "#f5f5f5",
    color: "#333",
    minHeight: "100vh",
    padding: "40px",
    textAlign: "center",
    transition: "all 0.3s ease"
  };

  const darkMode = {
    backgroundColor: "#1e1e1e",
    color: "#ffffff",
    minHeight: "100vh",
    padding: "40px",
    textAlign: "center",
    transition: "all 0.3s ease"
  };

 


  return (
    <div style={isDark ? darkMode : lightMode}>
      <h1 style={{ fontSize: "90px" , lineHeight:"200px" }}>{isDark ? "DarkMode" : "LightMode"}</h1>
      <p style={{ fontSize: "50px",lineHeight:"200px" }}>This is basic Form themeswitcher using useState</p>
      <button onClick={toggleTheme} style={{
        fontSize: "30px",
        padding: "10px 20px", borderRadius: "10px"
      }}> Switch to {isDark ? "DarkMode" : "LightMode"}</button>

    </div>


  )
}

export default ThemeSwitcher;
