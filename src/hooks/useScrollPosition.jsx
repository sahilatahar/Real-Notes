import { useEffect, useState } from "react";

const useScrollPosition = () => {
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    useEffect(() => {
        const home = document.getElementById("home");

        const handleScroll = () => {
            console.log("scrolling");
            const currentPosition = home.scrollTop;
            const threshold = 1200;

            if (currentPosition > threshold) {
                setShowScrollToTop(true);
            } else {
                setShowScrollToTop(false);
            }
        };

        home.addEventListener("scroll", handleScroll);

        // Clean up event listener
        return () => {
            home.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return { showScrollToTop };
};

export default useScrollPosition;
