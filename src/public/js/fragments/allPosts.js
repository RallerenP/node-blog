function generatePost(post, index) {
  $('#post-section').append(`
        <div class="card post" id="post-${index}">
            <img class="card-img-top" src="${post.imageUrl}">
            <div class="card-body">
                <h5 class="card-title">${post.title}</h5>
                <p class="card-text">${post.description}</p>
                <a class="btn btn-primary" href="/posts/${post._id}">Read More</a>
            </div>
        </div>
    `);

  $('#navigation-links').append(`
        <a href="#post-${index}"><p>${post.title}</p></a>
    `);
}

async function setup() {
  const loggedInResponse = await fetch('/api/auth/me', {
    method: 'GET',
  });

  const loggedIn = await loggedInResponse.json();

  if (loggedIn.isAdmin) {
    $('#post-section').append(`
        <a href="/posts/new"><button class="btn btn-primary">Add new post</button></a>
      `);
  }

  const postsResponse = await fetch('/api/posts', {
    method: 'GET',
  });

  const posts = await postsResponse.json();

  posts.forEach((post, index) => {
    generatePost(post, index);
  });
}

setup();
