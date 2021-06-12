$('#submitButton').click(async () => {
  const email = $('#email').val();
  const password = $('#password').val();

  const data = {
    email,
    password,
  };

  await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  location.href = '/';
});
