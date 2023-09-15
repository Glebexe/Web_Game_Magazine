// Load data
fetch("/JSON/news_data.json")
    .then((res) => {
    return res.json();
})
.then((data) => createHTML(data));