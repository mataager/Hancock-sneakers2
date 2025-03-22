//render category

function rendersearch() {
  const search = document.getElementById("search-li");
  search.innerHTML = ` <button id="search-btn" class="nav-action-btn">
                            <ion-icon name="search-outline" aria-hidden="true" role="img"
                                class="md hydrated"></ion-icon>
                            <span class="nav-action-text">Search</span>
                        </button>

                        <!-- Floating search input field, initially hidden -->
                        <div id="search-box" class="floating-search hidden-search-box">
                            <div class="search-input-container">
                                <input type="text" id="search-input" placeholder="Search products..." />
                                <button id="search-btn" class="search-btn black-font">
                                    <ion-icon name="search-outline"></ion-icon>
                                </button>
                                <ul id="suggestions" class="suggestion-list"></ul>
                            </div>
                        </div>`;
}
// Call the function to render the menu when needed
rendersearch();

//
