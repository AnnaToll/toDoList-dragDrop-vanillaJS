let toDoListContainer = document.getElementById('to-do-container'),
    toDoList = document.getElementById('ul-to-do');


class CreateNewListItem {
    constructor(parentElement) {

        this.parent = parentElement;

        this.container = document.createElement('div');
        this.listItemsContainer = document.createElement('ul');
        this.createNewItemContainer = document.createElement('div');
        this.createNewItemBtn = document.createElement('button');
        this.createNewItemTextInput = document.createElement('input');
        this.addNewListSubListBtn = document.createElement('div');

        this.isTextFieldClicked = 'no';

        this.setupElements();

    }
    
    setupElements() {
        this.parent.append(this.container);
        this.container.append(
            this.listItemsContainer,
            this.createNewItemContainer,
            this.addNewListSubListBtn
        );
        this.createNewItemContainer.append(
            this.createNewItemBtn,
            this.createNewItemTextInput
        );

        if (this.parent == toDoListContainer) {
            this.createNewItemContainer.classList.add('new-list-item');
            this.createNewItemTextInput.placeholder = '+ Add list item';
        } else {
            this.container.classList.add('sublist-container');
            this.createNewItemContainer.classList.add('new-list-item-sublist');
            this.createNewItemTextInput.placeholder = '+ Add sublist';
        }

        if (this.parent != toDoListContainer) {
            this.container.classList.add('hidden');
        }
        
        this.createNewItemBtn.innerText = 'Save';
        this.createNewItemBtn.classList.add('add-list-item-btn', 'hidden');

        this.createNewItemTextInput.type = 'text';
        this.createNewItemTextInput.classList.add('add-list-item-text-input');

        this.createNewItemTextInput.addEventListener('click', () => {
            this.createNewItemBtn.classList.remove('hidden');
            this.isTextFieldClicked = 'yes';
        })

        this.addNewListSubListBtn.classList.add('add-new-list-object-sublist');
        this.addNewListSubListBtn.innerText = '+';

        this.addListItem();
    }

    addListItem() {

        this.createNewItemBtn.addEventListener('click', () => {
            
            this.createNewItemBtn.classList.add('hidden');
            
            if (this.parent == toDoListContainer) {
                if (this.createNewItemTextInput.value == '') {
                    return;
                } else if (this.createNewItemTextInput.value != '') {
                    let newListItem = new ListItem(this.container.previousElementSibling, this.createNewItemTextInput.value);
                }
            }


            if (this.parent != toDoListContainer) {
                if (this.createNewItemTextInput.value == '') {
                    this.hideShowContainerWhenSave();
                    return;
                } else if (this.createNewItemTextInput.value != '') {
                    let newListItem = new ListItem(this.listItemsContainer, this.createNewItemTextInput.value);
                }
            }

            this.createNewItemTextInput.value = '';
            this.createNewItemTextInput.click();
            this.createNewItemTextInput.focus();
        })

        this.addNewListSubListBtn.addEventListener('click', () => {
            this.addNewListSubListBtn.style.cssText = '';
            this.createNewItemContainer.classList.remove('hidden');
            this.createNewItemTextInput.click();
            this.createNewItemTextInput.focus();
        })

        this.createNewItemTextInput.addEventListener('keypress', (e) => {
            if (e.keyCode === 13) {
                e.preventDefault();
                this.createNewItemBtn.click();
            }
        })

        this.createNewItemTextInput.addEventListener('blur', () => {
            this.createNewItemBtn.click();
        })
    }

    showContainer() {
        this.container.classList.remove('hidden');
    }

    hideShowContainerWhenSave() {
        if (this.listItemsContainer.innerHTML == '')
        this.container.classList.add('hidden');
        else if (this.listItemsContainer.innerHTML != '') {
            this.createNewItemContainer.classList.add('hidden');
            this.addNewListSubListBtn.style.cssText = 'display: grid;';
        }
    }
}

let addListItem = new CreateNewListItem(toDoListContainer);


