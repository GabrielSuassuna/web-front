const genPeriodOptions = () => {
  const currYear = new Date().getFullYear();
  let options = [];
  for (let y = 2018; y <= currYear; y++) {
    options.push({
      label: `${y}.1`,
      value: `${y}.1`,
    });
    options.push({
      label: `${y}.2`,
      value: `${y}.2`,
    });
  }
  options.sort((f, s) => {
    if (f === s) return 0;
    else return f.value > s.value ? -1 : 1;
  });
  return [
    {
      value:"",
      label:"Selecione um período"
    },
    ...options];
};

export { genPeriodOptions }
