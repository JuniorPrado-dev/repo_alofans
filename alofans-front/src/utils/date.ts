export const formatStringData = (date: string): string => {

    const [onlyDate, time] = date.split(" ");
    const [year, month, day] = onlyDate.split("-");
    
    return `${day}/${month}/${year} ${time}`;
}

export const unformatStringData = (date: string): string => {
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
}