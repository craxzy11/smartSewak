const convertTime = (time) => {
    const time_array = time.split(":")
    let new_time = Number(time_array[0]) * 60;
    if(time_array.length > 1) new_time += Number(time_array[1]);
    return new_time;
};

module.exports = convertTime