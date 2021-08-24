document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('#menu');
  const navigation = document.querySelector('#navigation');

  menu.addEventListener('click', () => {
    navigation.classList.toggle('max-h-0');
    navigation.classList.toggle('max-h-56');
  });
});
