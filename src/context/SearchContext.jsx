import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
            {children}
        </SearchContext.Provider>
    );
};

SearchProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Custom hook to use the search context
export const useSearch = () => {
    return useContext(SearchContext);
};
