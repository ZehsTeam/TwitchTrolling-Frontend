
class CustomCard extends HTMLElement {
    connectedCallback() {
        const name = this.getAttribute('name') || 'Unnamed';
        const image = this.getAttribute('image') || './images/placeholder.png';
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
customElements.define('custom-card', CustomCard);