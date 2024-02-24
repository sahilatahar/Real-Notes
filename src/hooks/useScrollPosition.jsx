import { useEffect, useState } from "react"

const useScrollPosition = () => {
	const [showScrollToTop, setShowScrollToTop] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			const currentPosition = window.scrollY
			const threshold = 800

			if (currentPosition > threshold) {
				setShowScrollToTop(true)
			} else {
				setShowScrollToTop(false)
			}
		}

		window.addEventListener("scroll", handleScroll)

		// Clean up event listener
		return () => {
			window.removeEventListener("scroll", handleScroll)
		}
	}, [])

	return { showScrollToTop }
}

export default useScrollPosition
