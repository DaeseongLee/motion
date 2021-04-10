import { BaseComponent } from './../component.js';
export class PageItemComponent extends BaseComponent {
    constructor() {
        super(`<li class="page-item">
                    <section class="page-item__body"></section>
                    <div class="page-item__controls">
                        <button class="close">&times;</button>
                    </div>
                </li`);
        const closeBtn = this.element.querySelector('.close');
        closeBtn.onclick = () => {
            var _a;
            (_a = this.closeListener) === null || _a === void 0 ? void 0 : _a.call(this);
        };
    }
    addChild(child) {
        const container = this.element.querySelector('.page-item__body');
        child.attachTo(container);
    }
    setOnCloseListener(listener) {
        this.closeListener = listener;
    }
}
export class PageComponent extends BaseComponent {
    constructor(pageItemConstructor) {
        super('<ul class="page"></ul>');
        this.pageItemConstructor = pageItemConstructor;
    }
    addChild(section) {
        const item = new this.pageItemConstructor();
        console.log('item', item);
        item.addChild(section);
        item.attachTo(this.element, 'beforeend');
        item.setOnCloseListener(() => {
            item.removeFrom(this.element);
        });
    }
}
