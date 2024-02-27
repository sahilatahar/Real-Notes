const sortNotes = (notes) => {
    // Sort the notes array by lastModified in descending order (newest first)
    const sortedNotes = notes.slice().sort((noteA, noteB) => {
        const timeA = noteA.lastModified;
        const timeB = noteB.lastModified;

        // Compare years
        if (timeA.year !== timeB.year) {
            return timeB.year - timeA.year;
        }

        // Compare months
        if (timeA.month !== timeB.month) {
            return timeB.month - timeA.month;
        }

        // Compare days
        if (timeA.day !== timeB.day) {
            return timeB.day - timeA.day;
        }

        // Compare hours
        if (timeA.hour !== timeB.hour) {
            return timeB.hour - timeA.hour;
        }

        // Compare minutes
        if (timeA.minutes !== timeB.minutes) {
            return timeB.minutes - timeA.minutes;
        }

        return timeB.seconds - timeA.seconds;
    });

    return sortedNotes;
}

export { sortNotes };