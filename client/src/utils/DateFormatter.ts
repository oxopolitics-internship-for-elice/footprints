const dateFormatter = (date: Date): string => {
  let dateDate = new Date(date);
  const year = dateDate.getFullYear();
  const month = dateDate.getMonth() + 1;
  const day = dateDate.getDate();
  console.log(day);
  const stringDate = `${year}년 ${month >= 10 ? month : '0' + month}월 ${
    day >= 10 ? day : '0' + day
  }일`;
  return stringDate;
};

export const dateTrans = (date: Date): string => {
  let dateDate = new Date(date);
  const month = dateDate.getMonth() + 1;
  const day = dateDate.getDate();
  const hour = dateDate.getHours() - 9;
  const minute = dateDate.getMinutes();
  const stringDate = ` ${month >= 10 ? month : '0' + month}월 ${
    day >= 10 ? day : '0' + day
  }일 ${hour >= 10 ? hour : '0' + hour}:${
    minute >= 10 ? minute : '0' + minute
  }`;
  return stringDate;
};

export default dateFormatter;
