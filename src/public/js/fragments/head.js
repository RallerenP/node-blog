async function setup() {
  const loggedInResponse = await fetch('/api/auth/me', {
    method: 'GET',
  });

  const loggedIn = await loggedInResponse.json();

  if (loggedIn.email) {
    const selectButtonGroup = $('#auth-buttons');
    selectButtonGroup[0].children[0].style.display = 'none';
    selectButtonGroup[0].children[1].style.display = 'none';
    selectButtonGroup.append(`
        <a href="/api/auth/logout"><button class="btn btn-danger mr-2">Logout</button></a>
        <a href="/users" class="btn btn-secondary mr-2" type="button"> Logged in as ${loggedIn.email} </a>
      `);
  }
}
setup();
