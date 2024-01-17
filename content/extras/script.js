// See https://fontawesome.com/search?o=r&m=free&s=solid
const JOURNAL_ICON = "fa-pencil";
const PUBLISHED_ICON = "fa-book";
const MUSIC_ICON = "fa-music";
const CODE_ICON = "fa-code";

function createIcons(article) {
    const dataTypes = article.getAttribute('data-types').split(' ');
    
    dataTypes.forEach(type => {
        const icon = document.createElement('span');
        icon.className = 'icon';
        icon.setAttribute('data-type', type);

        const iconContent = document.createElement('i');
        iconContent.className = 'fas';
        switch (type) {
            case 'journal':
                iconContent.classList.add(JOURNAL_ICON);
                break;
            case 'published':
                iconContent.classList.add(PUBLISHED_ICON);
                break;
            case 'music':
                iconContent.classList.add(MUSIC_ICON);
                break;
            case 'code':
                iconContent.classList.add(CODE_ICON);
                break;
        }

        icon.appendChild(iconContent);
        article.insertBefore(icon, article.firstChild);
    });
}

function filterArticles() {
    const selectedTags = Array.from(document.querySelectorAll('.tag-filter.selected')).map(tag => tag.id);
    const articles = document.querySelectorAll('#article-list .article');

    articles.forEach(article => {
        const articleTypes = article.getAttribute('data-types').split(' ');
        console.log(article, articleTypes);
        const displayArticle = selectedTags.some(tag => articleTypes.includes(tag));
        article.style.display = displayArticle ? 'block' : 'none';
    });
}

function toggleTag(tagElement) {
    tagElement.classList.toggle('selected');
    filterArticles();
}

// Run once page is done loading:
document.addEventListener('DOMContentLoaded', () => {
    const articles = document.querySelectorAll('#article-list .article');
    articles.forEach(article => {
        console.log(article);
        createIcons(article);
    }
)});