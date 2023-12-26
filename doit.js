// ▀██▀▀█▄                 ▀██▀   ▄      ▀██▀       ██           ▄   
//  ██   ██    ▄▄▄          ██  ▄██▄      ██       ▄▄▄   ▄▄▄▄  ▄██▄  
//  ██    ██ ▄█  ▀█▄        ██   ██       ██        ██  ██▄ ▀   ██   
//  ██    ██ ██   ██  ████  ██   ██       ██        ██  ▄ ▀█▄▄  ██   
// ▄██▄▄▄█▀   ▀█▄▄█▀       ▄██▄  ▀█▄▀    ▄██▄▄▄▄▄█ ▄██▄ █▀▄▄█▀  ▀█▄▀ 


// 1. GET REFERENCE TO ELEMENTS. AUTO SEND FORM
const form = document.querySelector('#item-form');
const input = document.querySelector('#item-input');
const list = document.querySelector('#item-list');
const clearButton = document.querySelector('#clear');
const filterInput = document.querySelector('#filter');

// START APP WITH RIGHT SETTINGS
const initApp = () => {
  updateUI();
};

// 2. CREATE EVENT HANDLER
const handleAddDoit = (e) => {
  e.preventDefault();

  // 4. GET VALUE FROM INPUT (text field)
  const doit = input.value;

  // Check empty field or only space
  if (doit.trim().length === 0) {
    const errorMsg = createErrorMessage('Fill in something.');
    document.querySelector('.error-message').appendChild(errorMsg);

    setTimeout(() => {
      document.querySelector('#error-message').remove();
    }, 3000);

    updateUI();
    return;
  }

  // SAVE TO LOCAL STORAGE
  addToStorage(doit);
  updateUI();
};

// CLEAR LIST
const handleClearList = () => {
  clearStorage();
  updateUI();
};

const handleClickDoit = (e) => {
  if (e.target.parentElement.classList.contains('btn-link')) {
    removeFromStorage(e.target.parentElement.parentElement.textContent);
  }
  updateUI();
};

const handleFilterDoits = (e) => {
  const doits = document.querySelectorAll('#item-list li');
  const value = e.target.value.toLowerCase();

  doits.forEach((item) => {
    const itemValue = item.firstChild.textContent.toLowerCase();
    if (itemValue.includes(value)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
};

// ADD TO DOM
const addDoitToDOM = (doit) => {
  const item = document.createElement('li');
  item.appendChild(document.createTextNode(doit));
  item.appendChild(createIconButton('btn-link text-red'));
  list.appendChild(item);
};

const createIconButton = (classes) => {
  const button = document.createElement('button');
  const classList = classes.split(' ');
  classList.forEach((c) => button.classList.add(c));
  button.appendChild(createIcon('fa-regular fa-octagon-check'));
  return button;
};

const createIcon = (classes) => {
  const icon = document.createElement('i');
  const classList = classes.split(' ');
  classList.forEach((c) => icon.classList.add(c));
  return icon;
};

// ERROR MESSAGE
const createErrorMessage = (text) => {
  const div = document.createElement('div');
  div.id = 'error-message';
  div.classList.add('error-message');
  div.appendChild(document.createTextNode(text));
  return div;
};

const updateUI = () => {
  input.value = '';
  // If no entries, stop search and clear all button.
  // Erase the DOM list before
  while (list.firstChild) list.removeChild(list.firstChild);

  const doitList = getFromStorage();
  doitList.forEach((doit) => addDoitToDOM(doit));

  if (doitList.length === 0) {
    clearButton.style.display = 'none';
    filterInput.style.display = 'none';
  } else {
    clearButton.style.display = 'block';
    filterInput.style.display = 'block';
  }
};

// SETUP LOCAL STORAGE
// ADD TO LOCAL STORAGE
const addToStorage = (doit) => {
  const doits = getFromStorage();
  doits.push(doit);
  localStorage.setItem('doits', JSON.stringify(doits));
};

// FETCH FROM LOCAL STORAGE
const getFromStorage = () => {
  let doits;

  if (localStorage.getItem('doits') === null) {
    doits = [];
  } else {
    doits = JSON.parse(localStorage.getItem('doits'));
  }

  return doits;
};

// REMOVE FROM LOCAL STORAGE
const removeFromStorage = (doit) => {
  let doits = getFromStorage();
  doits = doits.filter((item) => item !== doit);
  localStorage.setItem('doits', JSON.stringify(doits));
};

// EMPTY LOCAL STORAGE
const clearStorage = () => {
  localStorage.removeItem('doits');
};

// 3. CONNECT EVENT TO HTML. EVENT (e) LISTENER
document.addEventListener('DOMContentLoaded', initApp);
form.addEventListener('submit', handleAddDoit);
clearButton.addEventListener('click', handleClearList);
list.addEventListener('click', handleClickDoit);
filterInput.addEventListener('input', handleFilterDoits);