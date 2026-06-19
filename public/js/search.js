document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('searchInput');
  const resultsContainer = document.getElementById('searchResults');
  let idx = null;
  let documents = [];

  // Fetch the pre-built search index
  fetch('/index.json')
    .then(response => response.json())
    .then(data => {
      documents = data;
      idx = lunr(function() {
        this.ref('url');
        this.field('title');
        this.field('content');
        this.field('tags');
        data.forEach(doc => this.add(doc));
      });
    });

  searchInput.addEventListener('input', function() {
    const query = this.value.trim();
    if (!query || !idx) {
      resultsContainer.innerHTML = '';
      return;
    }
    const results = idx.search(query);
    resultsContainer.innerHTML = results.length
      ? results.map(r => {
          const doc = documents.find(d => d.url === r.ref);
          return `<a href="${doc.url}" class="p-2 border-bottom d-block">${doc.title} <small class="text-muted">${doc.section || ''}</small></a>`;
        }).join('')
      : '<p class="text-muted">No results found.</p>';
  });
});