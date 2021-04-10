import { Component } from './components/component.js';
import { InputDialog, MediaData, TextData } from './components/dialog/dialog.js';
import { MediaSectionInput } from './components/dialog/input/media-input.js';
import { TextSectionInput } from './components/dialog/input/text-input.js';
import { ImageComponent } from './components/item/image.js';
import { NoteComponent } from './components/item/note.js';
import { TodoComponent } from './components/item/todo.js';
import { VideoComponent } from './components/item/video.js';
import { Composable, PageComponent, PageItemComponent } from "./components/page/page.js";



// < T = MediaSectionInput | TextSectionInput >
type InputComponentConstructor<T = (MediaData | TextData) & Component> = {
    new(): T;
}

class App {
    private readonly page: Component & Composable;
    constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
        this.page = new PageComponent(PageItemComponent); //PageComponent는 Ul Element를 추가
        this.page.attachTo(appRoot); //attachTo함수는 BaseCompoent함수인데 element를 추가해줌


        // const imageBtn = document.querySelector('#new-image')! as HTMLButtonElement;
        // imageBtn.addEventListener('click', () => {
        //     const dialog = new InputDialog();
        //     const inputSection = new MediaSectionInput();
        //     dialog.addChild(inputSection);
        //     dialog.attachTo(dialogRoot);

        //     dialog.setOncloseListener(() => {
        //         dialog.removeFrom(dialogRoot);
        //     });
        //     dialog.setOnsubmitListener(() => {
        //         const image = new ImageComponent(inputSection.title, inputSection.url);
        //         this.page.addChild(image);
        //         dialog.removeFrom(dialogRoot);
        //     });
        // });
        //위의 코드를 아래와 같이 함수를 사용하여 리팩토링 함..
        this.bindElementToDialog<MediaSectionInput>(
            '#new-image',
            MediaSectionInput,
            (input: MediaSectionInput) => new ImageComponent(input.title, input.url)
        );

        this.bindElementToDialog<MediaSectionInput>(
            '#new-video',
            MediaSectionInput,
            (input: MediaSectionInput) => new VideoComponent(input.title, input.url)
        );

        this.bindElementToDialog<TextSectionInput>(
            '#new-note',
            TextSectionInput,
            (input: TextSectionInput) => new NoteComponent(input.title, input.body)
        );

        this.bindElementToDialog<TextSectionInput>(
            '#new-todo',
            TextSectionInput,
            (input: TextSectionInput) => new TodoComponent(input.title, input.body)
        );

        this.page.addChild(new ImageComponent('Image Title', 'https://picsum.photos/800/400'));
        this.page.addChild(new VideoComponent('Video Title', 'https://youtu.be/D7cwvvA7cP0'));
        this.page.addChild(new NoteComponent('Note Title', "Don't forget to code your dream"));
        this.page.addChild(new TodoComponent('Todo Title', 'TypeScript Course!'));
        this.page.addChild(new ImageComponent('Image Title', 'https://picsum.photos/800/400'));
        this.page.addChild(new VideoComponent('Video Title', 'https://youtu.be/D7cwvvA7cP0'));
        this.page.addChild(new NoteComponent('Note Title', "Don't forget to code your dream"));
        this.page.addChild(new TodoComponent('Todo Title', 'TypeScript Course!'));
    }

    private bindElementToDialog<T extends (MediaData | TextData) & Component>(
        selector: string,
        InputComponent: InputComponentConstructor<T>,
        makeSection: (input: T) => Component
    ) {
        const element = document.querySelector(selector)! as HTMLButtonElement;
        element.addEventListener('click', () => {
            const dialog = new InputDialog();
            const inputSection = new InputComponent();
            dialog.addChild(inputSection);
            dialog.attachTo(this.dialogRoot);

            dialog.setOncloseListener(() => {
                dialog.removeFrom(this.dialogRoot);
            });
            dialog.setOnsubmitListener(() => {
                const image = makeSection(inputSection);
                this.page.addChild(image);
                dialog.removeFrom(this.dialogRoot);
            });
        });
    }
}

new App(document.querySelector('.document')! as HTMLElement, document.body);



// const image = new ImageComponent('Image Title', 'https://picsum.photos/600/300');
        // this.page.addChild(image);

        // const video = new VideoComponent('Video Title', 'https://youtu.be/GOqqWcE-WW4');
        // this.page.addChild(video);

        // const note = new NoteComponent('Note Title', 'Note Body');
        // this.page.addChild(note);

        // const todo = new TodoComponent('Todo Title', 'Todo Item');
        // this.page.addChild(todo);