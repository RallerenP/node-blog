$('#alert').on('close.bs.alert', (e) => {
  e.preventDefault();
  e.stopPropagation();

  $('#alert').toggleClass('show');
});

async function login() {
  const email = $('#email').val();
  const password = $('#password').val();

  const data = {
    email,
    password,
  };

  const response = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 401) {
    $('#email').addClass('border border-danger');
    $('#password').addClass('border border-danger');
    $('#alert').addClass('show');
  } else {
    location.href = '/';
  }
}

$('#submitButton').click(login);
$('.form-group').on('keydown', (e) => {
  if (e.key === 'Enter') login();
})
