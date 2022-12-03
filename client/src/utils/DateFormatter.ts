const dateFormatter = (date: string, option?: string) => {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  if (option === '년월일') {
    return `${year}년 ${month >= 10 ? month : '0' + month}월 ${
      day >= 10 ? day : '0' + day
    }일`;
  }
  return `${year}.${month >= 10 ? month : '0' + month}.${
    day >= 10 ? day : '0' + day
  }`;
};

export default dateFormatter;
