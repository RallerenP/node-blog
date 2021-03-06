const url = window.location.href.split('/');
const id = url[url.length - 1];

function generatePost(post) {
  const postHtml = `
<div id="post">
    <h1 id="header">${post.title}</h1>
    <p id="description">${post.description}</p>
    <img src="${post.imageUrl}" alt="">
    <div id="content-section"></div>
    <div id="comment-section">
        <h3>Comments</h3>
    </div>
</div>
`;

  $('#post-section').append(postHtml);

  // Content Sections
  if (post.sections.length > 0) {
    post.sections.forEach((section, index) => {
      $('#content-section').append(`
<div class="content-group" id="section-${index}">
    <h3 class="content-header">${section.sectionTitle}</h3>
    <hr>
    <p class="content-body">${section.sectionBody}</p>
</div>
`);

      $('#navigation-links').append(`
<a href="#section-${index}"><p>${section.sectionTitle}</p></a>
`);
    });
  }

  // Comment section
  $('#comment-section').append(`
<div class="form-group">
    <label for="comment">Write a comment</label>
    <input type="text" class="form-control" id="comment" aria-describedby="emailHelp">
</div>
<button id="submitButton" class="btn btn-primary">Submit comment</button>
`);

  if (post.comments.length > 0) {
    post.comments.forEach((comment) => {
      const year = comment.timestamp.substr(0, 4);
      const month = comment.timestamp.substr(5, 2);
      const day = comment.timestamp.substr(8, 2);
      const time = comment.timestamp.substr(11, 5);
      const date = `${year}-${month}-${day} at ${time}`;
      $('#comment-section').append(`
<div class="comment">
    <h4>${comment.author}</h4>
    <h5>${date}</h5>
    <hr>
    <h3>${comment.text}</h3>
</div>
`);
    });
  }

  $('#submitButton').click(async () => {
    const comment = $('#comment').val();

    const data = {
      comment,
    };

    await fetch(`/api/posts/${id}/comments`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    location.reload();
  });
}

async function setup() {
  const response = await fetch(`/api/posts/${id}`, {
    method: 'GET',
  });

  const post = await response.json();
  generatePost(post);
}
setup();
