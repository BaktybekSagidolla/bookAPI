document.addEventListener('DOMContentLoaded', function() {
    var selectElement = document.getElementById('search-history');
    if(selectElement && selectElement.options.length > 0) {
        selectElement.selectedIndex = selectElement.options.length - 1;
    }
});
$(document).ready(function() {
    $('#search_books').click(function() {
        var searchQuery = $('input[name="author"]').val(); // Adjusted to use the author or book title for search
        var fullText = $('#username').text();
        var username = fullText.split(':')[1].trim();

        console.log(`Username: ${username}`);
        if (searchQuery == '') {
            alert("Please enter an author name or book title");
            return;
        }

        $.ajax({
            type: 'POST',
            url: '/books/search', // Ensure this endpoint is correctly set up on your server
            data: {
                query: searchQuery, // Changed to a more generic 'query' to accommodate both author and title searches
                username: username
            },
            success: function(data) {
                // Assuming 'data' is an array of book objects
                console.log(data);
                var booksHtml = '';
                data.forEach(book => {
                    // Make sure to adjust paths according to your data structure
                    // This structure assumes a response similar to Google Books API
                    booksHtml += `<div class="col-md-4">
                        <div class="card mb-4 box-shadow">
                            <img class="card-img-top" src="${book.volumeInfo.imageLinks.thumbnail}" alt="Book cover">
                            <div class="card-body">
                                <h5 class="card-title">${book.volumeInfo.title}</h5>
                                <p class="card-text">${book.volumeInfo.authors.join(", ")}</p>
                                <p class="card-text">${book.volumeInfo.description}</p>
                            </div>
                        </div>
                    </div>`;
                });

                $('#books_list').html(booksHtml); // Display results in the books list container
            },
            error: function(error) {
                console.error("Error fetching books: ", error);
                alert("Failed to fetch books. Please try again.");
            }
        });
    });
});
