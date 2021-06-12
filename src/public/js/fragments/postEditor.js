$('#submitButton').click(async () => {
  const title = $('#title').val();
  const description = $('#description').val();
  const imageUrl = $('#imageUrl').val();
  const sections = [];

  const loopAmount = $('#sections')[0].children.length;

  for (i = 0; i < loopAmount; i += 1) {
    const sectionTitle = $('#sections')[0].children[i].children[0].children[1].value;
    const sectionBody = $('#sections')[0].children[i].children[1].children[1].value;
    sections.push(
      {
        sectionTitle,
        sectionBody,
      },
    );
  }

  const data = {
    title,
    description,
    imageUrl,
    sections,
  };

  await fetch('/api/posts', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  location.href = '/';
});

let sectionIndex = 0;

$('#addSectionButton').click(() => {
  $('#sections').append(`
        <div class="new-section">
            <div class="form-group">
                <label for="section-${sectionIndex}-header">Section Header</label>
                <input type="text" class="form-control" id="section-${sectionIndex}-header">
            </div>
            <div class="form-group">
                <label for="section-${sectionIndex}-body">Section Body</label>
                <input type="text" class="form-control" id="section-${sectionIndex}-body">
            </div>
            <button id="delete-${sectionIndex}" class="btn btn-primary">X</button>
        </div>
    `);

  $(`#delete-${sectionIndex}`).click((e) => {
    e.target.parentElement.remove();
  });

  sectionIndex += 1;
});
