Lampa.Plugins.add({
    title: "YouTube Трейлери",
    version: "1.0",
    description: "Додає трейлери з YouTube українською та російською",
    onStart: function() {
        console.log('Plugin started');
        Lampa.Listener.follow('full', function(e) {
            if (e.type === 'complete') {
                let movieTitle = e.data.movie.title;
                let youtubeSearchURL = `https://www.youtube.com/results?search_query=${encodeURIComponent(movieTitle + " трейлер українською")}`;

                Lampa.Modal.open({
                    title: "Виберіть трейлер",
                    html: `
                        <button class="trailer-btn" data-url="${youtubeSearchURL}">Трейлер українською</button>
                        <button class="trailer-btn" data-url="https://www.youtube.com/results?search_query=${encodeURIComponent(movieTitle + " трейлер російською")}">Трейлер російською</button>
                    `,
                    onSelect: function(element) {
                        let url = element.getAttribute("data-url");
                        Lampa.Activity.push({
                            url: url,
                            title: "Трейлер",
                            component: "browser"
                        });
                    }
                });
            }
        });
    }
});
