export interface Component {
    attachTo(parent: HTMLElement, postion?: InsertPosition): void;
    removeFrom(parent: HTMLElement): void;
    attach(component: Component, position?: InsertPosition): void;
}

//Encapsulate the HTML element creattion

//element를 받아와서 템플릿에 추가한다음. 부모요소에 추가한다.
export class BaseComponent<T extends HTMLElement> implements Component {
    protected readonly element: T;

    constructor(htmlString: string) {
        const template = document.createElement('template');
        template.innerHTML = htmlString;
        this.element = template.content.firstElementChild! as T;
    }

    attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin') {
        parent.insertAdjacentElement(position, this.element);
    }

    removeFrom(parent: HTMLElement) {
        if (parent !== this.element.parentElement) {
            throw new Error('Parent mismatch');
        }
        parent.removeChild(this.element);
    }

    attach(component: Component, position?: InsertPosition) {
        component.attachTo(this.element, position);
    }
}