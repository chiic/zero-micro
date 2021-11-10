export function fetchAPI(url: string): Promise<any> {
    const xhr = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
        xhr.open('GET', url);
        xhr.send();
        xhr.onload = (e) => {
            resolve(xhr.responseText)
        }
    })
}

export function collectLink(html) {}

export function collectScript(html) {
    const reg = /<script[\s\S]+?src="(.+?\.js)"[\s\S]*?>[\s\S]*?<\/script>/g;
    const scripts = [];
    while(true) {
        const result = reg.exec(html);
        if(result) {
            scripts.push(result[1]);
        } else {
            return scripts;
        }
    }
}