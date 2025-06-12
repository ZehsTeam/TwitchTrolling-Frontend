const twitchChannel = document.querySelector('#twitch-channel');
const expireCountdown = document.querySelector('#expire-countdown');
const enemyCardContainer = document.querySelector('#enemy-card-container');
const eventCardContainer = document.querySelector('#event-card-container');

let pageId = undefined;
let expirationTime = null;
let countdownInterval = null;

let eventSource = null;
let sseClosed = false;

const enemyImages = {
    randomenemy: './images/random.png',

    animal: "./images/Enemies/Animal.png",
    apexpredator: "./images/Enemies/Apex Predator.png",
    banger: "./images/Enemies/Banger.png",
    bowtie: "./images/Enemies/Bowtie.png",
    chef: "./images/Enemies/Chef.png",
    clown: "./images/Enemies/Clown.png",
    gnome: "./images/Enemies/Gnome.png",
    headman: "./images/Enemies/Headman.png",
    hidden: "./images/Enemies/Hidden.png",
    huntsman: "./images/Enemies/Huntsman.png",
    mentalist: "./images/Enemies/Mentalist.png",
    peeper: "./images/Enemies/Peeper.png",
    reaper: "./images/Enemies/Reaper.png",
    robe: "./images/Enemies/Robe.png",
    rugrat: "./images/Enemies/Rugrat.png",
    shadowchild: "./images/Enemies/Shadow Child.png",
    spewer: "./images/Enemies/Spewer.png",
    trudge: "./images/Enemies/Trudge.png",
    upscream: "./images/Enemies/Upscream.png",

    zombie: "./images/Enemies/Zombie.png",
    puppet: "./images/Enemies/Puppet.png",
    gusher: "./images/Enemies/Gusher.png",
    voodoo: "./images/Enemies/Voodoo.png",
    freddyfazbear: "./images/Enemies/Freddy Fazbear.png",
    driller: "./images/Enemies/Driller.png",
    weepingangel: "./images/Enemies/Weeping Angel.png",
    roaster: "./images/Enemies/Roaster.png",
    lostdroid: "./images/Enemies/Lost droid.png",
    soldier: "./images/Enemies/Soldier.png",
    lostdestroyer: "./images/Enemies/Lost Destroyer.png",
};

const eventImages = {
    randomevent: './images/random.png',

    animalcrate: '../images/Valuables/Animal Crate.png',
    bottle: '../images/Valuables/Bottle.png',
    chompbook: '../images/Valuables/Chomp Book.png',
    clown: '../images/Valuables/Clown.png',
    ducttapedgrenades: '../images/Items/Duct Taped Grenades.png',
    dumgolfsstaff: '../images/Valuables/Wizard Dumgolfs Staff.png',
    fan: '../images/Valuables/Fan.png',
    flamethrower: '../images/Valuables/Arctic Flamethrower.png',
    frog: '../images/Valuables/Frog.png',
    icesaw: '../images/Valuables/Ice Saw.png',
    minefield: '../images/Items/Explosive Mine.png',
    playerspeed: '../images/Items/Sprint Speed Upgrade.png',
    propanetank: '../images/Valuables/Arctic Propane Tank.png',
    psycho: '../images/Valuables/Psycho.png',
    rolldrone: '../images/Items/Roll Drone.png',
    rubberduck: '../images/Items/Rubber Duck.png',
    zerogravityorb: '../images/Items/Zero Gravity Orb.png',
};

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

            if (eventSource) {
                eventSource.close();
                sseClosed = true;
            }

            throw new Error('Failed to fetch page.');
        }

        const page = await res.json();
        handlePageData(page);
    }
    catch (error) {
        console.error('Error fetching page: ', error);
    }
};

const startPageSSE = () => {
    if (sseClosed) return;

    eventSource = new EventSource(`${apiOrigin}/api/pages/${pageId}/sse`);

    eventSource.onopen = () => {
        console.log(`Connected to page ${pageId} SSE`);
    };

    eventSource.onerror = () => {
        console.error(`Error with SSE.`);
    };

    eventSource.addEventListener('update', (event) => {
        const data = JSON.parse(event.data);
        handlePageData(data);
    });

    eventSource.addEventListener('delete', () => {
        alert('This page has been deleted.');
        eventSource.close();
        sseClosed = true;
    });
};

const handlePageData = (page) => {
    if (page.channel) {
        twitchChannel.innerText = page.channel;
    }

    if (page.expiresAt) {
        expirationTime = new Date(page.expiresAt);
        startCountdown();
    }

    if (page.enemies) {
        renderCards('enemy', enemyCardContainer, page.enemies);
    }

    if (page.events) {
        renderCards('event', eventCardContainer, page.events);
    }
};

const startCountdown = () => {
    if (countdownInterval) clearInterval(countdownInterval);

    updateCountdown();

    countdownInterval = setInterval(() => {
        updateCountdown();
    }, 1000);
};

const updateCountdown = () => {
    const now = new Date();
    const diff = expirationTime - now;

    if (diff <= 0) {
        expireCountdown.innerText = 'Expired';
        clearInterval(countdownInterval);

        if (eventSource && !sseClosed) {
            eventSource.close();
            sseClosed = true;
        }

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
};

const renderCards = (type, container, data) => {
    container.innerHTML = '';

    data.forEach(item => {
        const card = document.createElement('custom-card');
        card.setAttribute('name', item.name);
        card.setAttribute('price', item.price);

        const imageKey = item.name.toLowerCase().replace(/\s+/g, '');
        let cardImages;

        if (type === "enemy") {
            cardImages = enemyImages;
        }

        if (type === "event") {
            cardImages = eventImages;
        }

        if (cardImages && cardImages[imageKey]) {
            card.setAttribute('image', cardImages[imageKey]);
        } else if (item.image) {
            card.setAttribute('image', item.image);
        } else {
            card.setAttribute('image', '../images/empty.png');
        }

        container.appendChild(card);
    });
};
