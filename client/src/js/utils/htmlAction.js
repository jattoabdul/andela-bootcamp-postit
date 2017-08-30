$(document).ready(() => {
  $('.button-collapse').sideNav({
    menuWidth: 250,
    edge: 'left',
    closeOnClick: true,
    draggable: true
  });
  $('.modal').modal();
  $('select').material_select();
  $('.collapsible').collapsible();
  $('.tooltipped').tooltip({ delay: 50 });
});
