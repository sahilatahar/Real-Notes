import PropTypes from "prop-types";
import { useSearch } from "../context/SearchContext";

const HighlightedText = ({ text }) => {
    const { searchQuery } = useSearch();
    const isHomePath = window.location.pathname === "/";

    if (!searchQuery || !isHomePath) return text;

    const regex = new RegExp(`(${searchQuery})`, "gi");

    const parts = text.split(regex);

    return (
        <span>
            {parts.map((part, index) =>
                regex.test(part) ? <mark key={index}>{part}</mark> : part,
            )}
        </span>
    );
};

HighlightedText.propTypes = {
    text: PropTypes.string,
};

export default HighlightedText;
