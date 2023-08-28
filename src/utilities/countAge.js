const countAge = (day, month, year) => {

    const dayOfBirth = parseInt(day);

    let monthOfBirth;

    if (month === 'January') monthOfBirth = 1;
    if (month === 'February') monthOfBirth = 2;
    if (month === 'March') monthOfBirth = 3;
    if (month === 'April') monthOfBirth = 4;
    if (month === 'May') monthOfBirth = 5;
    if (month === 'June') monthOfBirth = 6;
    if (month === 'July') monthOfBirth = 7;
    if (month === 'August') monthOfBirth = 8;
    if (month === 'September') monthOfBirth = 9;
    if (month === 'October') monthOfBirth = 10;
    if (month === 'November') monthOfBirth = 11;
    if (month === 'December') monthOfBirth = 12;

    const yearOfBirth = parseInt(year);

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const currentDay = new Date().getDate();

    let age = currentYear - yearOfBirth;
    let birthday = false;

    if (currentMonth < monthOfBirth) age = age - 1;

    if (currentMonth === monthOfBirth) {
        if (currentDay < dayOfBirth) age = age - 1;
        if (currentDay === dayOfBirth) birthday = true;
    }

    return [age, birthday]
}

export default countAge;