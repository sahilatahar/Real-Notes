import PropTypes from "prop-types";
import LABELS from "../../utils/labels";
import { useTranslation } from "react-i18next";
import HighlightedText from "../HighlightedText";
import { useSearch } from "../../context/SearchContext";

function Labels({ note }) {
    const { setSearchQuery } = useSearch();
    const { t } = useTranslation();
    const { label: labelTextObj } = t("Notes");
    const isHomePath = window.location.pathname === "/";

    const handleLabelClick = (e, label) => {
        e.stopPropagation();
        if (isHomePath) {
            setSearchQuery(`${label}`);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
                {note.labels?.map((label, index) => {
                    const color =
                        LABELS.find(
                            (l) => l.name.toLowerCase() === label.toLowerCase(),
                        )?.color || "#fffff";
                    return (
                        <span
                            key={index}
                            className="rounded-md px-2 py-1 text-sm font-medium"
                            style={{
                                backgroundColor: color,
                                color: "#fff",
                            }}
                            onClick={(e) => handleLabelClick(e, label)}
                        >
                            <HighlightedText
                                text={
                                    labelTextObj[label.toLowerCase()] || label
                                }
                            />
                        </span>
                    );
                })}
            </div>
        </div>
    );
}

Labels.propTypes = {
    note: PropTypes.object.isRequired,
};

export default Labels;
