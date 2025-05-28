
class CustomHeader extends HTMLElement {
    connectedCallback() {
        this.classList.add('header');

        this.innerHTML = `
            <h1>TwitchTrolling</h1>
            <p>by <a href="https://solo.to/crithaxxog" target="_blank">CritHaxXoG</a> for <a href="https://www.twitch.tv/psychohypnotic" target="_blank">PsychoHypnotic</a></p>
        `;
    }
}

class CustomCard extends HTMLElement {
    connectedCallback() {
        const name = this.getAttribute('name') || 'Unnamed';
        const image = this.getAttribute('image') || './images/empty.png';
        const price = this.getAttribute('price') || '0';

        this.classList.add('card');
        
        this.innerHTML = `
            <div class="card-title">
                <p>${name}</p>
            </div>
            <div class="card-image">
                <img src="${image}" class="card-image">
            </div>
            <div class="card-price">
                <img src="./images/bits.png" alt="bits">
                <p>${price}</p>
            </div>
        `;
    }
}

// Register all custom elements
customElements.define('custom-header', CustomHeader);
customElements.define('custom-card', CustomCard);