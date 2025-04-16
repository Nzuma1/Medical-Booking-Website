const convertTime = time =>{
    //time parts returns an array
    const timeParts = time.split(":");
    let hours = parseInt(timeParts[0])
    let minutes = parseInt(timeParts[1])

    let meridiem ="am"
    if (hours >= 12){
        meridiem = "pm"

    if (hours > 12) {
        hours -= 12
    }
    }
    return `${hours}:${minutes} ${meridiem}`
}

export default convertTime