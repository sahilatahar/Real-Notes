function getCurrentDate() {
    const now = new Date();

    const currentDate = {
        day: now.getDate(),
        month: now.getMonth() + 1, // Months are zero-indexed, so add 1
        year: now.getFullYear(),
        hour: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds()
    };

    return currentDate;
}

export { getCurrentDate };