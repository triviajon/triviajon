function filterArticles() {
    const selectedTags = Array.from(document.querySelectorAll('#tag-filters input:checked')).map(tag => tag.value);
    const articles = document.querySelectorAll('#article-list .article');

    console.log(selectedTags)

    articles.forEach(article => {
        const articleType = article.getAttribute('data-type');
        if (selectedTags.includes(articleType) || selectedTags.length === 0) {
            article.style.display = 'block';
        } else {
            article.style.display = 'none';
        }
    });
}

function toggleTag(tagElement) {
    tagElement.classList.toggle('selected');
    filterArticles();
}