export const celcius = temp => Math.round(temp - 273.15);  

export const countryCodes = [
    {Code:1, Name:'Singapore'},
    {Code:2, Name:'Delhi'},
    {Code:3, Name:'Johannesburg'},
    {Code:4, Name:'Noida'},
    {Code:5, Name:'Bangalore'}
];

export const formateAmandPm = date=> {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

   // Returns week of the day
  export const  getDay = data => {
    const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    return daysOfWeek[new Date(data[0].dt * 1000).getDay()];
  };


  export const getMinMaxTemratureInfo = (data, min=[], max=[], humidity=[]) => {
    data.map(item => {
      max.push(item.main.temp_max);
      min.push(item.main.temp_min);
      humidity.push(item.main.humidity);
    });

    const minMax = {
      min: Math.round(Math.min(...min)),
      max: Math.round(Math.max(...max)),
    };

    // Gets the day's average humdity
    const avgHumdity = Math.round(humidity.reduce((curr, next) => curr + next) / humidity.length);

    return {  minMax, avgHumdity}
  };

  export const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

  export const convertToF = celsius => celsius * 9/5 + 32;