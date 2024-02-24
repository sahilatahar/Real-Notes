import PropTypes from "prop-types"
import { createContext, useState } from "react"

const TabContext = createContext()

const TabProvider = ({ children }) => {
	const [isStarredTab, setIsStarredTab] = useState(false)
	return (
		<TabContext.Provider
			value={{
				isStarredTab,
				setIsStarredTab,
			}}
		>
			{children}
		</TabContext.Provider>
	)
}

TabProvider.propTypes = {
	children: PropTypes.node,
}

export default TabContext
export { TabProvider }

