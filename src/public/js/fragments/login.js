$('#alert').on('close.bs.alert', (e) => {
  e.preventDefault();
  e.stopPropagation();

  $('#alert').toggleClass('show');
});

function error(err) {
  $('#alert').text(err);
  $('#alert').addClass('show');
}

function emailError(err) {
  $('#email').addClass('border border-danger');
  $('#emailErr').text(err);
  $('#emailErr').removeClass('invisible');
}

function validateEmail() {
  const email = $('#email').val();

  console.log(email);

  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    emailError('Invalid email!');
    return false;
  } else {
    $('#email').removeClass('border border-danger');
    $('#emailErr').addClass('invisible');
    return true;
  }
}

async function login() {
  const email = $('#email').val();
  const password = $('#password').val();

  if (!validateEmail()) {
    error('Invalid email');
    return;
  }

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
$('#email').on('focusout', validateEmail);

$('.form-group').on('keydown', (e) => {
  if (e.key === 'Enter') login();
});

