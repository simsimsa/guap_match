export const formatToUserDate = (date?: Date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString();
};

//дата нужного времени
