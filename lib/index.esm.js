function fetchAPI(url) {
    const xhr = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
        xhr.open('GET', url);
        xhr.send();
        xhr.onload = (e) => {
            resolve(xhr.responseText);
        };
    });
}
function collectScript(html) {
    const reg = /<script[\s\S]+?src="(.+?\.js)"[\s\S]*?>[\s\S]*?<\/script>/g;
    const scripts = [];
    while (true) {
        const result = reg.exec(html);
        if (result) {
            scripts.push(result[1]);
        }
        else {
            return scripts;
        }
    }
}

class CustomeApp extends HTMLElement {
    static get observedAttributes() {
        return ['url', 'name'];
    }
    connectedCallback() {
        this.mount();
    }
    mount() {
        document.createDocumentFragment();
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
        if (newValue) {
            this[`microApp_${key}`] = newValue;
        }
    }
    handlerHtml(html) {
        let scripts = collectScript(html);
        if (scripts.length) {
            scripts = scripts.map(v => this.microApp_url + v);
            const apiArr = [];
            scripts.forEach(script => apiArr.push(fetchAPI(script)));
            Promise.all(apiArr).then(res => {
                res.forEach(source => Function(source)());
            });
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

export { start };
