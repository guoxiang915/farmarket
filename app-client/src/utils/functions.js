export const isOpenNow = hours => {
  const weekdays = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];
  const weekday = new Date().getDay();
  // eslint-disable-next-line
  const time = new Date().getHours() * 60 + new Date().getMinutes();

  const hoursDay = hours.find(item => item.weekday === weekdays[weekday]);
  if (hoursDay) {
    let splits = hoursDay.start.split(':');
    // eslint-disable-next-line
    const start = Number(splits[0]) * 60 + Number(splits[1]);
    splits = hoursDay.end.split(':');
    // eslint-disable-next-line
    const end = Number(splits[0]) * 60 + Number(splits[1]);

    if (time >= start && time <= end) {
      return hoursDay;
    }

    return false;
  }

  return false;
};

export const getAddressFromCoordinates = ({ latitude, longitude }) => {
  return fetch(
    `https://api.tiles.mapbox.com/v4/geocode/mapbox.places-v1/${longitude},${latitude}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
  );
};

export const getAddressString = address => {
  return address;
};
