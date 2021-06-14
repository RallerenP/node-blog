let loggedIn = null;

function generatePost(post, index) {
  $('#post-section').append(`
        <div class="card post" id="post-${index}">
            <img class="card-img-top" src="${post.imageUrl}">
            <div class="card-body">
                <h5 class="card-title">${post.title}</h5>
                <p class="card-text">${post.description}</p>
                <a class="btn btn-primary" href="/posts/${post._id}">Read More</a>
                ${
                  loggedIn && loggedIn.isAdmin ? 
                    `<button class="edit btn btn-secondary" data-post-id="${post._id}"><i class="fas fa-edit"></i></button>
                     <button class="delete btn btn-danger" data-post-id="${post._id}"><i class="fas fa-trash"></i></button>
                    `
                    : ''
                }
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

  loggedIn = await loggedInResponse.json();

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

  $('.delete').click((e) => {
    const modal = `
      <div class="modal fade" id="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Delete post?</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
              <button id="confirmDelete" type="button" class="btn btn-danger"><i class="fas fa-trash"></i> Delete</button>
            </div>
          </div>
        </div>
      </div>`;

    const postId = e.currentTarget.attributes['data-post-id'].nodeValue;

    $('body').append(modal);
    $('#modal').modal();
    $('#confirmDelete').click(async () => {
      await fetch(`/api/posts/${postId}`, { method: 'DELETE' });
      location.reload();
    });
  });
}

setup();
