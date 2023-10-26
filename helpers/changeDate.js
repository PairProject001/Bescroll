function changeToRupiahForm(date) {
    const dateToChange = date
    const dateUp = new Date(dateToChange)
    const m = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    const str_op = dateUp.getDate() + ' ' + m[dateUp.getMonth()] + ' ' + dateUp.getFullYear();
    return str_op;
}

module.exports = changeToRupiahForm