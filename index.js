// hide error and spinner
document.getElementById("show-error").style.display = "none";
document.getElementById("loading-spinner").style.display = "none";

// Search Button Click handle
const bookContainer = document.getElementById("book-container");
const searchBookByName = () => {
  bookContainer.textContent = "";
  document.getElementById("show-error").textContent = "";
  document.getElementById("loading-spinner").style.display = "block";
  const bookInputBox = document.getElementById("book-input-box");
  const bookName = bookInputBox.value;
  bookInputBox.value = "";
  // Empty Search Error handle
  if (bookName === "") {
    document.getElementById("loading-spinner").style.display = "none";
    document.getElementById("show-error").style.display = "block";
    document.getElementById("show-error").style.color = "red";
    document.getElementById("show-error").innerText =
      "Please, Enter a book name";
    return;
  }
  const bookSearchURL = `https://openlibrary.org/search.json?q=${bookName}`;

  fetch(bookSearchURL)
    .then((response) => response.json())
    .then((data) => checkBookResult(data))
    .catch((error) => displayError());
};

// handle Server Error
const displayError = () => {
  document.getElementById("loading-spinner").style.display = "none";
  document.getElementById("show-error").style.display = "block";
  document.getElementById("show-error").style.color = "red";
  document.getElementById("show-error").innerText =
    "Something Went Wrong Try Again Later";
};

// handle no results error
const checkBookResult = (data) => {
  if (data.numFound === 0) {
    document.getElementById("show-error").style.display = "block";
    document.getElementById("show-error").style.color = "red";
    document.getElementById("show-error").innerText = "No Result Found";
    document.getElementById("loading-spinner").style.display = "none";
  } else {
    document.getElementById("show-error").style.display = "block";
    document.getElementById("show-error").style.color = "green";
    document.getElementById(
      "show-error"
    ).innerText = `Showing ${data.docs.length} from ${data.numFound} results`;
    displayBooks(data.docs);
  }
};

//display books in UI
const displayBooks = (bookList) => {
  bookList.forEach((book) => {
    const div = document.createElement("div");
    div.classList.add("col");
    let firstPublishedDate = book.first_publish_year;
    if (firstPublishedDate == null) {
      firstPublishedDate = "";
    } else {
      firstPublishedDate = book.first_publish_year;
    }
    let coverImages = book.cover_i;
    if (coverImages == null) {
      coverImages = "./images/book-placeholder.jpg";
    } else {
      coverImages = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
    }
    let publishPlace = book.publish_place;
    if (publishPlace == null) {
      publishPlace = "";
    } else {
      publishPlace = book.publish_place;
    }
    let bookContributor = book.contributor;
    if (bookContributor == null) {
      bookContributor = "";
    } else {
      bookContributor = book.contributor;
    }
    let totalEdition = book.edition_count;
    if (totalEdition == null) {
      totalEdition = "";
    } else {
      totalEdition = book.edition_count;
    }
    div.innerHTML = `
        <div class="card h-100">
                  <img height="350px" src="${coverImages}" class="card-img-top" alt="..." />
                  <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <p class="card-text"><b>Author: </b>${book.author_name}
                    </p>
                    <p class="card-text"><b>Publisher: </b> 
                      ${book.publisher}
                    </p>
                    <p class="card-text"><b>Publish Place: </b> 
                      ${publishPlace}
                    </p>
                    <p class="card-text"><b>Contributor: </b> 
                      ${bookContributor}
                    </p>
                    <p class="card-text"><b>Total Edition: </b> 
                      ${totalEdition}
                    </p>
                  </div>
                  <div class="card-footer">
        <small class="text-muted">First published in ${firstPublishedDate}</small>
      </div>
                </div>
        `;
    bookContainer.appendChild(div);
    document.getElementById("loading-spinner").style.display = "none";
  });
};
