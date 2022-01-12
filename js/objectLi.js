class ListItem {
    constructor(parentElement, inputValue) {

        
        this.parent = parentElement;

        this.li = document.createElement('li');

        this.container = document.createElement('div');
        this.checkBox = document.createElement('input');
        this.saveBtn = document.createElement('button');
        this.textFieldValue = inputValue;
        this.textField = document.createElement('input');
        this.iconContainer = document.createElement('div');
        this.edit = document.createElement('i');
        this.erase = document.createElement('i');

        this.setupElements();

    }

    setupElements() {
        this.hideElements();
        this.parent.append(this.li);
        this.li.append(
            this.container
        );
        this.container.append(
            this.saveBtn,
            this.checkBox,
            this.textField,
            this.iconContainer
        );
        this.iconContainer.append(
            this.edit,
            this.erase
        );

        let addNewListItem = new CreateNewListItem(this.li);

        if (this.parent == toDoList) {
            this.container.classList.add('li-container');
            this.li.setAttribute('data-level', '0');
        } else {
            this.container.classList.add('li-container-sublist');
            let level = parseInt(this.parent.parentElement.parentElement.getAttribute('data-level'));
            level++;
            this.li.setAttribute('data-level', level.toString());

            let opacity = Math.pow((1*0.5), level);

            this.container.style.cssText = `background-color: rgba(255, 255, 255, ${opacity});`;
        }

        this.container.draggable = true;

        this.container.classList.add('li-container');

        this.textField.type = 'text';
        this.textField.classList.add('list-item-text-input');
        this.textField.value = this.textFieldValue;
        this.textField.addEventListener('click', () => {
            this.textField.focus();
            if (this.textField.value != '') {
                this.showElements();
                addNewListItem.container.style.cssText = 'display: block;';
                this.checkBox.classList.add('hidden');
            }
            else this.saveBtn.classList.remove('hidden');
        })

        this.textField.addEventListener('keypress', (e) => {
            if (e.keyCode === 13) {
                e.preventDefault();
                this.saveBtn.click();
            }
        })


        let isTextFieldActive = 'no';

        this.saveBtn.innerText = 'Save';
        this.saveBtn.addEventListener('click', () => {
            if (this.textField.value == '') {
                this.saveBtn.classList.add('hidden');
                return;
            }

            this.textField.blur();

            if (addNewListItem.ul.innerHTML != '')
                addNewListItem.container.style.cssText = 'display: block;';
            else
                addNewListItem.container.style.cssText = 'display: none;';

            this.hideElements();
            this.checkBox.classList.remove('hidden');
        })

        this.iconContainer.classList.add('icon-container');
        
        this.attrInput(this.checkBox, 'checkbox', 'check-list-item', 'check-list-item');

        this.edit.classList.add('bi', 'bi-pencil-fill');

        this.edit.addEventListener('click', () => {
            this.textField.click();
        })

        this.erase.classList.add('bi', 'bi-x-lg');

        addNewListItem.container.style.cssText = 'display: none;';

        document.addEventListener('click', (event) => {
            
            if (isTextFieldActive == 'yes') {

                if (event.target != addNewListItem.createNewItemTextInput 
                    && event.target != this.edit
                    && event.target != this.saveBtn
                    && event.target != this.textField) {
                    this.saveBtn.click();
                    isTextFieldActive = 'no';
                } 
            }

            if (event.target == this.textField) {
                isTextFieldActive = 'yes';
            }
        })
        
        this.eraseParent();
        this.checked();
        this.dragAndDrop();
    }

    hideElements() {
        this.saveBtn.classList.add('hidden');
        this.iconContainer.classList.add('hidden');
    }

    showElements() {
        this.saveBtn.classList.remove('hidden');
        this.checkBox.classList.remove('hidden');
        this.iconContainer.classList.remove('hidden');
    }

    attrInput(chosenInput, type, name, id, booleanDisabled, value) {
        chosenInput.type = type;
        chosenInput.name = name;
        chosenInput.id = `${id}-${counterIdNames}`;
        if (chosenInput.type == 'text') {
            chosenInput.disabled = booleanDisabled;
            chosenInput.value = value;
        }
    }

    eraseParent() {
        this.erase.addEventListener('click', () => {
            this.li.remove();
        })
    }

    checked() {
        this.checkBox.addEventListener('click', () => {
            if (this.checkBox.checked) {
                this.li.classList.add('greyed-out');
                if (this.li.lastElementChild.firstElementChild.innerHTML != '') {
                    for (let childListItem of this.li.lastElementChild.firstElementChild.children) {
                        if (!childListItem.firstElementChild.children[1].checked) {
                            childListItem.firstElementChild.children[1].click();
                            childListItem.firstElementChild.children[1].setAttribute('data-status', 'not-checked');
                        }
                    }
                }
            } else if (!this.checkBox.checked) {
                this.li.classList.remove('greyed-out');
                if (this.li.lastElementChild.firstElementChild.innerHTML != '') {
                    for (let childListItem of this.li.lastElementChild.firstElementChild.children) {
                        if (childListItem.firstElementChild.children[1].getAttribute('data-status') == 'not-checked') {
                            childListItem.firstElementChild.children[1].click();
                            childListItem.firstElementChild.children[1].removeAttribute('data-status');
                        }
                    }
                }
            }
        })
    }

    dragAndDrop() {
        let mainContainer = this.parent;

        this.container.addEventListener('dragstart', () => {
            this.li.id = 'dragged';
            
        })

        this.container.addEventListener('dragend', () => {
            this.li.id = '';
        })
        
        mainContainer.addEventListener('dragover', (event) => {
            event.preventDefault();

            let dragged = document.getElementById('dragged');

            for (let listItem of dragged.parentElement.children) {

                let halfHeight = this.container.offsetHeight / 2;

                let top = listItem.getBoundingClientRect().top;
                let bottom = listItem.getBoundingClientRect().bottom;

                let spanBeforeTop = top - 6;
                let spanBeforeBottom = top + halfHeight;

                let spanAfterTop = bottom - halfHeight;
                let spanAfterBottom = bottom + 6;

                if (event.clientY >= spanBeforeTop 
                    && event.clientY <= spanBeforeBottom) {
                        dragged.parentElement.insertBefore(dragged, listItem)
                }

                if (event.clientY >= spanAfterTop 
                    && event.clientY <= spanAfterBottom) {
                        if (listItem.nextElementSibling) {
                            dragged.parentElement.insertBefore(dragged, listItem.nextElementSibling)
                        } else if (!listItem.nextElementSibling) {
                            dragged.parentElement.append(dragged);
                        }
                }
            }
        })

    }
}
