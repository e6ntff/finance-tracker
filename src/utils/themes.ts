const setTheme = (isChecked: boolean) => {
  if (isChecked) {
    document.body.classList.remove('theme-light');
    document.body.classList.add('theme-dark');
  } else {
    document.body.classList.remove('theme-dark');
    document.body.classList.add('theme-light');
  }
};

export default setTheme;
