import PropTypes from "prop-types";
import LABELS from "../../utils/labels";
import { useTranslation } from "react-i18next";

function CardFooter({ note }) {
    const { t } = useTranslation();
    const { label: labelTextObj } = t("Notes");

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
                        >
                            {labelTextObj[label.toLowerCase()] || label}
                        </span>
                    );
                })}
            </div>
        </div>
    );
}

CardFooter.propTypes = {
    note: PropTypes.object.isRequired,
};

export default CardFooter;
