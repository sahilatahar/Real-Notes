function getCurrentDate() {
    const now = new Date();

    const currentDate = {
        day: now.getDate(),
        month: now.getMonth() + 1, // Months are zero-indexed, so add 1
        year: now.getFullYear(),
        hour: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
    };

    return currentDate;
}

function formatTimestamp(timestamp) {
    const date = new Date(
        timestamp.year,
        timestamp.month - 1, // Adjust month to 0-indexed value
        timestamp.day,
        timestamp.hour,
        timestamp.minutes,
        timestamp.seconds,
    );

    // Get day, month, year
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    // Get hours, minutes, seconds
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;

    const formattedTimestamp = `${day}/${month}/${year} ${hours}:${minutes}:${seconds} ${ampm}`;

    return formattedTimestamp;
}

export { getCurrentDate, formatTimestamp };
