window.addEventListener('load', () => {
    
    convert.addEventListener('click', () => {
        let text = element.value;

        let a = [...text.matchAll(/<([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g)].map(item => item[1]);
        let b = [...text.matchAll(/<\/([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g)].map(item => item[1]);


        const div = createHTMLElementFromString(text);
        console.log(getItems(div));

    });

    function createHTMLElementFromString(htmlString) {
        const template = document.createElement('template');
        template.innerHTML = htmlString.trim(); // Eliminar espacios en blanco al principio y al final
        return template.content.firstChild;
    }

    function getDirectTextContent(element) {
        let text = '';
        element.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                text += node.textContent.trim() + ' ';
            }
        });
        return text.trim().replace('\n', '').replace('\t');
    }

    function getItems(parent) {
        let result = '';
        if (parent.children.length > 0) {
            let clases = parent.className ? `, {class: '${parent.className}'}` : '';
            result += `$('<${parent.nodeName.toLowerCase()}>'${clases}).append(${secondlevel(parent)})`;
        }

        function secondlevel(parent) {
            let innercontent = '';
            [...parent.children].forEach((item, index) => {
                let clases = item.className ? `, {class: '${item.className}'}` : '';
                let text = '';

                text = getDirectTextContent(item) !== '' ? `.text('${getDirectTextContent(item)}')` : '';

                if (parent.children.length > 0 && index < parent.children.length && index > 0) {
                    innercontent += `, $('<${item.nodeName.toLowerCase()}>'${clases})${text}`;
                } else {
                    innercontent += `$('<${item.nodeName.toLowerCase()}>'${clases})${text}`;
                }

                if (item.children.length > 0 && index < parent.children.length - 1) {
                    innercontent += `.append(${secondlevel(item)})`;
                }
            });
            return innercontent;
        }

        return result;
    }
});