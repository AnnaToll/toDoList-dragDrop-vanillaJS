class ListItem {
    constructor(parentElement, inputValue) {
        
        this.parent = parentElement;

        this.li = document.createElement('li');

        this.container = document.createElement('div');
        this.checkBox = document.createElement('input');
        this.saveBtn = document.createElement('button');
        this.textField = document.createElement('input');
        this.textFieldValue = inputValue;
        this.iconContainer = document.createElement('div');
        this.addSubListItem = document.createElement('button');
        this.edit = document.createElement('i');
        this.erase = document.createElement('i');

        this.isTextFieldActive = 'no';
        this.addNewListItem = {};

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
            this.addSubListItem,
            this.edit,
            this.erase
        );

        if (this.parent == toDoList) {
            this.container.classList.add('li-container');
            this.li.setAttribute('data-level', '0');
        } else {
            this.container.classList.add('li-container-sublist');
            this.container.style.cssText = this.generateBgColorListItem();
        }

        this.container.draggable = true;
        this.container.classList.add('li-container');

        this.saveBtn.innerText = 'Save';
        this.checkBox.type = 'checkbox';
        this.textField.type = 'text';
        this.textField.value = this.textFieldValue;
        this.textField.addEventListener('keyup', () => {
            this.textField.style.cssText += ` width: ${this.textField.value.length}ch;`
        })

        this.iconContainer.classList.add('icon-container');
        this.addSubListItem.innerText = '+ add sublist';
        this.addSubListItem.classList.add('add-sublist-btn');
        this.edit.classList.add('bi', 'bi-pencil-fill');
        this.erase.classList.add('bi', 'bi-x-lg');

        this.addNewListItem = new CreateNewListItem(this.li);
        
        this.eraseParent();
        this.checked();
        this.dragAndDrop();
        this.editListItem();
        this.addSublist();
        this.saveListItem();
    }

    generateBgColorListItem() {
        let level = parseInt(this.parent.parentElement.parentElement.getAttribute('data-level'));
        level++;
        this.li.setAttribute('data-level', level.toString());

        let opacity = Math.pow((1*0.5), level);
        return `background-color: rgba(255, 255, 255, ${opacity});`;
    }

    editListItem() {
        
        this.textField.addEventListener('click', () => {
            this.textField.focus();
            if (this.textField.value != '') {
                this.showElements();
                this.addNewListItem.showContainer();
                this.checkBox.classList.add('hidden');
            } else this.saveBtn.classList.remove('hidden');
        })

        this.edit.addEventListener('click', () => {
            this.textField.click();
        })

    }

    addSublist() {
        this.addSubListItem.addEventListener('click', () => {
            this.addNewListItem.showContainer();
            this.addNewListItem.addNewListSubListBtn.click();
        })
    }

    saveListItem() {

        this.saveBtn.addEventListener('click', () => {
            if (this.textField.value == '') {
                this.saveBtn.classList.add('hidden');
                return;
            }

            this.addNewListItem.hideShowContainerWhenSave();
            
            this.textField.blur();
            this.hideElements();
            this.checkBox.classList.remove('hidden');
        })

        this.textField.addEventListener('keypress', (e) => {
            if (e.keyCode === 13) {
                e.preventDefault();
                this.saveBtn.click();
            }
        })

        document.addEventListener('click', (event) => {
            
            if (this.isTextFieldActive == 'yes') {

                if (event.target != this.addNewListItem.createNewItemTextInput 
                    && event.target != this.edit
                    && event.target != this.saveBtn
                    && event.target != this.textField) {
                    this.saveBtn.click();
                    this.isTextFieldActive = 'no';
                } 
            }

            if (event.target == this.textField || event.target == this.edit) {
                this.isTextFieldActive = 'yes';
            }
        })
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

    eraseParent() {
        this.erase.addEventListener('click', () => {
            this.li.remove();
        })
    }

    checked() {
        let clickedCheckboxIdentifier = 0;
        this.checkBox.addEventListener('click', () => {
            if (this.checkBox.checked) {
                this.textField.disabled = true;
                this.addSubListItem.disabled = true;
                if (clickedCheckboxIdentifier == 0) {
                    this.checkBox.setAttribute('data-is-clicked', 'yes');
                    setTimeout(function() {
                        clickedCheckboxIdentifier = 0;
                    }, 500);
                }
                clickedCheckboxIdentifier++;
                console.log(clickedCheckboxIdentifier);
                this.li.classList.add('greyed-out');
                if (this.li.lastElementChild.firstElementChild.innerHTML != '') {
                    for (let childListItem of this.li.lastElementChild.firstElementChild.children) {
                        if (!childListItem.firstElementChild.children[1].checked) {
                            childListItem.firstElementChild.children[1].click();
                            childListItem.firstElementChild.children[1].setAttribute('data-status', 'not-checked');
                        }
                        childListItem.firstElementChild.children[1].disabled = true;
                        childListItem.firstElementChild.children[2].disabled = true;
                        childListItem.firstElementChild.children[3].firstElementChild.disabled = true;
                    }
                }
            } else if (!this.checkBox.checked) {
                this.textField.disabled = false;
                this.addSubListItem.disabled = false;
                this.li.classList.remove('greyed-out');
                if (this.checkBox.getAttribute('data-is-clicked') == 'yes') {
                    this.checkBox.removeAttribute('data-is-clicked');
                }
                if (this.li.lastElementChild.firstElementChild.innerHTML != '') {
                    for (let childListItem of this.li.lastElementChild.firstElementChild.children) {
                        if (childListItem.firstElementChild.children[1].getAttribute('data-status') == 'not-checked') {
                            childListItem.firstElementChild.children[1].disabled = false;
                            childListItem.firstElementChild.children[2].disabled = false;
                            childListItem.firstElementChild.children[3].firstElementChild.disabled = false;
                            childListItem.firstElementChild.children[1].click();
                            childListItem.firstElementChild.children[1].removeAttribute('data-status');
                        }
                        if (childListItem.firstElementChild.children[1].getAttribute('data-is-clicked') == 'yes') {
                            childListItem.firstElementChild.children[1].disabled = false;
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
