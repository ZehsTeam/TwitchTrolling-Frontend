const twitchChannel = document.querySelector('#twitch-channel');
const expireCountdown = document.querySelector('#expire-countdown');
const enemyCardContainer = document.querySelector('#enemy-card-container');
const eventCardContainer = document.querySelector('#event-card-container');

let pageId = undefined;
let expirationTime = null;
let countdownInterval = null;

window.onload = () => {
    getPageId();
    fetchPageData();
    startPageSSE();
};

const getPageId = () => {
    const urlParams = new URLSearchParams(window.location.search);
    pageId = urlParams.get('id');
}

const fetchPageData = async () => {
    try {
        const res = await fetch(`${apiOrigin}/api/pages/${pageId}`);
        
        if (!res.ok) {
            alert('This page does not exist.');
            throw new Error('Failed to fetch page.');
        }

        const page = await res.json();
        handlePageData(page);
    }
    catch (error) {
        console.error('Error fetching page: ', error);
    }
}

const startPageSSE = () => {
    const eventSource = new EventSource(`${apiOrigin}/api/pages/${pageId}/sse`);

    eventSource.onopen = () => {
        console.log(`Successfully connected to page ${pageId} SSE!`);
    };

    eventSource.onerror = () => {
        console.error(`Error with page SSE.`);
    };

    eventSource.addEventListener('update', (event) => {
        const data = JSON.parse(event.data);
        handlePageData(data);
    });

    eventSource.addEventListener('delete', (event) => {
        alert('This page has been deleted.');
    });
}

const handlePageData = (page) => {
    if (page.channel) {
        twitchChannel.innerText = page.channel;
    }

    if (page.expiresAt) {
        expirationTime = new Date(page.expiresAt);
        startCountdown();
    }

    if (page.enemies) {
        renderCards(enemyCardContainer, page.enemies);
    }

    if (page.events) {
        renderCards(eventCardContainer, page.events);
    }
};

const startCountdown = () => {
    if (countdownInterval) clearInterval(countdownInterval);

    updateCoutdown();

    countdownInterval = setInterval(() => {
        updateCoutdown();
    }, 1000);
};

const updateCoutdown = () => {
    const now = new Date();
    const diff = expirationTime - now;

    if (diff <= 0) {
        expireCountdown.innerText = 'Expired';
        clearInterval(countdownInterval);
        return;
    }

    const hrs = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    let timeStr = 'Expires in: ';
    if (hrs > 0) {
        timeStr += `${hrs} hr ${mins} min ${secs} sec`;
    } else if (mins > 0) {
        timeStr += `${mins} min ${secs} sec`;
    } else {
        timeStr += `${secs} sec`;
    }

    expireCountdown.innerText = timeStr;
}

const renderCards = (container, data) => {
    container.innerHTML = '';

    data.forEach(item => {
        const card = document.createElement('custom-card');
        card.setAttribute('name', item.name);
        card.setAttribute('price', item.price);

        const image = item.image;

        if (image) {
            card.setAttribute('image', image);
        } else {
            card.setAttribute('image', '../images/empty.png');
        }
        
        container.appendChild(card);
    });
};
