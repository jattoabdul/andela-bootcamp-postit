$(document).ready(() => {
  $('.button-collapse').sideNav({
    menuWidth: 250,
    edge: 'left',
    closeOnClick: true,
    draggable: true
  });
  $('select').material_select();
  $('.modal').modal();
});
