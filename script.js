const libraryEl = document.getElementById('library');
const dialogEl = document.getElementById('dialog');
const newBookBtn = document.getElementById('new-book');
const closeBtn = document.getElementById('close-btn');
const addBook = document.getElementById('add-book');
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const read = document.getElementById('isRead');

const myLibrary = [];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);

  myLibrary.push(book);
}

function renderBook() {
  libraryEl.textContent = '';
  for (const book of myLibrary) {
    const bookCardEl = document.createElement('div');
    bookCardEl.classList.add('card');
    const titleEl = document.createElement('h2');
    titleEl.textContent = book.title;

    const authorEl = document.createElement('h3');
    authorEl.textContent = book.author;

    const numOfPagesEl = document.createElement('p');
    numOfPagesEl.textContent = `${book.pages} pages`;

    const isReadEl = document.createElement('p');
    isReadEl.textContent = book.read;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'x';

    removeBtn.addEventListener('click', () => {
      const index = myLibrary.findIndex((b) => b.id === book.id);

      myLibrary.splice(index, 1);

      renderBook();
    });

    bookCardEl.append(
      titleEl,
      authorEl,
      numOfPagesEl,
      isReadEl,
      removeBtn,
      readBtn,
    );
    libraryEl.appendChild(bookCardEl);
  }
}

newBookBtn.addEventListener('click', () => {
  dialogEl.showModal();
});

closeBtn.addEventListener('click', () => {
  dialogEl.close();
});

addBook.addEventListener('click', (e) => {
  e.preventDefault();

  const titleValue = title.value;
  const authorValue = author.value;
  const pagesValue = pages.value;
  const readValue = read.checked === true ? 'Read' : 'not read yet';

  addBookToLibrary(titleValue, authorValue, pagesValue, readValue);

  renderBook();

  dialogEl.close();
});
