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

export default dateFormatter;
