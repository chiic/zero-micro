import { fetchAPI, collectScript } from './utils';

class CustomeApp extends HTMLElement {
    microApp_url: string;
    static get observedAttributes() {
        return ['url', 'name'];
    }

    connectedCallback() {
        this.mount();
    }

    mount() {
        const fragment = document.createDocumentFragment();
        fetchAPI(this.microApp_url).then(res => {
            this.mountHtml(res);
            this.handlerHtml(res);
        });
    }

    disconnectedCallback() {
        console.log('unmounted');
    }

    attributeChangedCallback(key, oldValue, newValue) {
        console.log(this, key, oldValue, newValue);
        if(newValue) {
            this[`microApp_${key}`] = newValue;
        }
    }

    handlerHtml(html: string) {
        let scripts = collectScript(html);
        if(scripts.length) {
            scripts = scripts.map(v => this.microApp_url + v);
            const apiArr = [];
            scripts.forEach(script => apiArr.push(fetchAPI(script)));
            Promise.all(apiArr).then(
                res => {
                    res.forEach(source => Function(source)())
                }
            )
        }

    }

    mountHtml(html) {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = html;
        this.appendChild(wrapper);
    }
}

class ZeroMicro {
    start() {
        window.customElements.define('tet-oo-oo', CustomeApp);
    }
}


const { start } = new ZeroMicro();

export { start }
