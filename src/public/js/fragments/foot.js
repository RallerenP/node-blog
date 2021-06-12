$('document').ready(() => {
  if (!document.cookie.split('; ').find((row) => row.startsWith('_cookie-accepted'))) {
    $('#cookie-banner').toggleClass('invisible');
  }

  $('#cookie-banner button').click(() => {
    document.cookie = '_cookie-accepted=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; Secure';
    $('#cookie-banner').toggleClass('invisible');
  });
});
