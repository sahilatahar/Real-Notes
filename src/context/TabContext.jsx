import PropTypes from "prop-types";
import { useContext } from "react";
import { createContext, useState } from "react";

const TabContext = createContext();

export const TabProvider = ({ children }) => {
    const [isStarredTab, setIsStarredTab] = useState(false);
    return (
        <TabContext.Provider
            value={{
                isStarredTab,
                setIsStarredTab,
            }}
        >
            {children}
        </TabContext.Provider>
    );
};

TabProvider.propTypes = {
    children: PropTypes.node,
};

export const useTabs = () => {
    return useContext(TabContext);
};
