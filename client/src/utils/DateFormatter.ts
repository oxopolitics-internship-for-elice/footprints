const dateFormatter = (date: string, option: string) => {
  const dateDate = new Date(date);
  const year = dateDate.getFullYear();
  const month = dateDate.getMonth() + 1;
  const day = dateDate.getDate();
  if (option === '년월일') {
    return `${year}년 ${month >= 10 ? month : '0' + month}월 ${
      day >= 10 ? day : '0' + day
    }일`;
  } else if (option === '.') {
    return `${year}.${month >= 10 ? month : '0' + month}.${
      day >= 10 ? day : '0' + day
    }`;
  }
};

export default dateFormatter;
