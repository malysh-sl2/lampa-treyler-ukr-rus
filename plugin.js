Lampa.Plugins.add({
    title: "YouTube Трейлери",
    version: "1.0",
    description: "Додає трейлери з YouTube українською та російською",
    onStart: function() {
        console.log('Плагін YouTube Трейлери запущено');

        // Слухаємо події від Lampa TV
        Lampa.Listener.follow('full', function(e) {
            console.log('Подія full отримана', e);

            // Перевіряємо, чи подія є завершеною (complete)
            if (e.type === 'complete') {
                console.log('Подія complete обробляється');

                // Отримуємо назву фільму
                let movieTitle = e.data.movie.title;
                console.log('Назва фільму:', movieTitle);

                // Формуємо URL для пошуку трейлерів на YouTube
                let youtubeSearchURL_uk = `https://www.youtube.com/results?search_query=${encodeURIComponent(movieTitle + " трейлер українською")}`;
                let youtubeSearchURL_ru = `https://www.youtube.com/results?search_query=${encodeURIComponent(movieTitle + " трейлер російською")}`;

                // Відкриваємо модальне вікно з вибором трейлера
                Lampa.Modal.open({
                    title: "Виберіть трейлер",
                    html: `
                        <button class="trailer-btn" data-url="${youtubeSearchURL_uk}">Трейлер українською</button>
                        <button class="trailer-btn" data-url="${youtubeSearchURL_ru}">Трейлер російською</button>
                    `,
                    onSelect: function(element) {
                        // Отримуємо URL з обраної кнопки
                        let url = element.getAttribute("data-url");
                        console.log('Вибір трейлера:', url);

                        // Відкриваємо браузер з обраним трейлером
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
