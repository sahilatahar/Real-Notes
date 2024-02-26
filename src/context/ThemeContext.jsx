import { createContext } from "react";
import PropTypes from "prop-types";
import useTheme from "../hooks/useTheme";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
    const { theme, setTheme, toggleTheme } = useTheme();
    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ThemeContext;
export { ThemeProvider };
