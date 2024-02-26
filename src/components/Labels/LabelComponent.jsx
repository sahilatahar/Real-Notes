import PropTypes from "prop-types";
import { showToast } from "../../utils/toast";
import LABELS from "../../utils/labels";
import { useTranslation } from "react-i18next";

const LabelComponent = ({ noteState, setNoteState }) => {
    const handleLabelClick = (item) => {
        const noteLabels = noteState?.labels;
        // check label exists or not
        if (noteLabels === undefined || noteLabels === null) {
            setNoteState((prev) => ({ ...prev, labels: [item] }));
            return;
        }
        if (noteState.labels.includes(item)) {
            setNoteState((prev) => ({
                ...prev,
                labels: prev.labels.filter((label) => label !== item),
            }));
            return;
        }
        if (noteState.labels.length > 4) {
            showToast("info", "You can add upto 5 labels only!");
            return;
        }
        setNoteState((prev) => ({ ...prev, labels: [...prev.labels, item] }));
    };

    return (
        <div className="w-full">
            <div className="flex flex-wrap gap-2">
                {LABELS.map(({ name }, index) => (
                    <Label
                        name={name}
                        key={index}
                        onClick={handleLabelClick}
                        noteState={noteState}
                    />
                ))}
            </div>
        </div>
    );
};

LabelComponent.propTypes = {
    noteState: PropTypes.object.isRequired,
    setNoteState: PropTypes.func.isRequired,
};

export default LabelComponent;

const Label = ({ name, onClick, noteState }) => {
    name = name.toLowerCase();
    const color = LABELS.find(
        (label) => label.name.toLowerCase() === name,
    ).color;
    const isSelect = noteState?.labels?.includes(name) || false;

    const { t } = useTranslation();
    const { label: labelTextObj } = t("Notes");

    return (
        <button
            onClick={() => onClick(name)}
            type="button"
            className="flex cursor-pointer items-center gap-1 rounded-md border-2 px-2 py-1 text-sm font-medium text-white"
            style={
                isSelect
                    ? { backgroundColor: color, borderColor: color }
                    : { borderColor: color, color: color }
            }
        >
            {labelTextObj[name]}
        </button>
    );
};

Label.propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    noteState: PropTypes.object.isRequired,
};
