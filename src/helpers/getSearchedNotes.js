function getSearchedNotes(notes) {
    return function (query) {
        const filteredNotes = notes.filter(
            (note) =>
                note.title.toLowerCase().includes(query.toLowerCase()) ||
                note.description.toLowerCase().includes(query.toLowerCase()) ||
                note.labels.some((label) =>
                    label.toLowerCase().includes(query.toLowerCase()),
                ),
        );
        const filteredStarredNotes = filteredNotes.filter(
            (note) => note.starred,
        );

        return {
            filteredNotes,
            filteredStarredNotes,
        };
    };
}

export default getSearchedNotes;
