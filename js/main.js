let btnCreateListItem = document.getElementById('add-list-item-btn'),
    btnEraseAllItems = document.getElementById('erase-all-items'),
    createListItemTextInput = document.querySelector('#add-list-item-container > input'),
    createListItemBtn = document.querySelector('#add-list-item-container > button'),
    createListItem = document.getElementById('add-list-item'),
    toDoListContainer = document.getElementById('to-do-container'),
    toDoList = document.getElementById('ul-to-do'),
    doneList = document.getElementById('ul-done'),
    errorEmptyListItem = document.getElementById('error-message'),
    btnEraseCheckbox = document.getElementById('activate-erase'),
    counterIdNames = 0;




/* btnEraseAllItems.addEventListener('click', () => {
    toDoList.innerHTML = '';
    doneList.innerHTML = '';
    errorEmptyListItem.innerHTML = '';
    inputCreateListItem.value = '';
}) */

/* createListItemTextInput.addEventListener('click', () => {
    createListItemBtn.classList.remove('hidden');
})

createListItemBtn.addEventListener('click', () => {
    createListItemBtn.classList.add('hidden');
    let listItemObject = new ListItem(toDoList, createListItemTextInput.value);
    createListItemTextInput.value = '';
}) */

class CreateNewListItem {
    constructor(parentElement) {

        this.parent = parentElement;

        this.container = document.createElement('div');
        this.ul = document.createElement('ul');
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
            this.ul,
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

        
        this.createNewItemBtn.innerText = 'Save';
        this.createNewItemBtn.classList.add('add-list-item-btn', 'hidden');

        this.createNewItemTextInput.type = 'text';
        this.createNewItemTextInput.classList.add('add-list-item-text-input');

        this.createNewItemTextInput.addEventListener('click', () => {
            this.createNewItemBtn.classList.remove('hidden');
            this.isTextFieldClicked = 'yes';
/*             if (this.parent != toDoListContainer) {
                this.pare
            } */
        })

        this.addNewListSubListBtn.classList.add('add-new-list-object-sublist');
        this.addNewListSubListBtn.innerText = '+';

        this.addListItem();
    }

    addListItem() {

        this.createNewItemBtn.addEventListener('click', () => {

            this.createNewItemBtn.classList.add('hidden');

            
            if (this.createNewItemTextInput.value == '') {
                if (this.ul.innerHTML == '') 
                    return;
                else {
                    this.createNewItemContainer.classList.add('hidden');
                    this.addNewListSubListBtn.style.cssText = 'display: grid;';
                    return;
                }
                
            }
            
            if (this.parent == toDoListContainer) {
                let newListItem = new ListItem(this.container.previousElementSibling, this.createNewItemTextInput.value);
            }
            else {
                let newListItem = new ListItem(this.ul, this.createNewItemTextInput.value);

                this.createNewItemContainer.classList.add('hidden');
                this.addNewListSubListBtn.style.cssText = 'display: grid;';

            }

            this.createNewItemTextInput.blur();
            this.createNewItemTextInput.value = '';
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

}


let addListItem = new CreateNewListItem(toDoListContainer);


// createListItem.addEventListener('click', () => {
//     let saveBtn = document.getElementById('save-btn');

//     saveBtn.style.cssText = 'display: inline-block;';

//     saveBtn.addEventListener('click', () => {
//         /*     if (inputCreateListItem.value == '') {
//                 errorEmptyListItem.innerHTML = "Du kan ej lägga till tomt listobjekt";
//                 return;
//             } */
            
//             errorEmptyListItem.innerHTML = '';
            
//             let listItemObject = new ListItem(toDoList);
// /*             listItemObject.setupElements();
//             listItemObject.eraseParent();
//             listItemObject.updateList();
//             listItemObject.checked(doneList);
//             listItemObject.createSubList(); */
        
//             counterIdNames++;
//             createListItem.value = '';
//             saveBtn.style.cssText = 'display: none;';
//         })
// })

/* btnCreateListItem.addEventListener('click', () => {
    if (inputCreateListItem.value == '') {
        errorEmptyListItem.innerHTML = "Du kan ej lägga till tomt listobjekt";
        return;
    }
    
    errorEmptyListItem.innerHTML = '';
    
    let listItemObject = new ListItem(toDoList);
    listItemObject.setupElements();
    listItemObject.eraseParent();
    listItemObject.updateList();
    listItemObject.checked(doneList);
    listItemObject.createSubList();

    counterIdNames++;
    inputCreateListItem.value = '';
}) */

