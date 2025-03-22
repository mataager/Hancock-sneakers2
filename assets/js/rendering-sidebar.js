const sidebarContent = `<div class="filter-header">
                            <h3>Filters</h3>
                            <button type="button" id="closeBtn" class="close-btn">
                                <i class="bi bi-x-lg"></i>
                            </button>
                        </div>
                        <div class="filter-options">
                            <!-- Sort By Section -->
                            <h4>Sort By</h4>
                            <div class="sort-options">
                                <button class="sort-option">Price low to high</button>
                                <button class="sort-option">Price high to low</button>
                                <button class="sort-option">New Arrival</button>
                            </div>

                            <!-- Gender Section -->
                            <h4>Gender</h4>
                            <div class="gender-options">
                                 <button id="Men-option" class="sort-option ${
                                   showMen ? "" : "hidden"
                                 }">Men</button>
                                <button id="Women-option" class="sort-option ${
                                  showWomen ? "" : "hidden"
                                }">Women</button>
                                <button id="Kids-option" class="sort-option ${
                                  showKids ? "" : "hidden"
                                }">Kids</button>
                            </div>

                            <!-- Size Section -->
                            <h4>Size</h4>
                            <div class="size-options">
                                <button>XXS</button>
                                <button>XS</button>
                                <button>S</button>
                                <button>M</button>
                                <button>L</button>
                                <button>XL</button>
                                <button>XXL</button>
                                <button>XXXL</button>
                            </div>

                            <!-- Footwear Size Section -->
                            <h4>Footwear</h4>
                            <div class="footwear-options">
                                <button>16</button>
                                <button>17</button>
                                <button>18</button>
                                <button>19</button>
                                <button>20</button>
                                <button>21</button>
                                <button>22</button>
                                <button>23</button>
                                <button>24</button>
                                <button>25</button>
                                <button>26</button>
                                <button>27</button>
                                <button>28</button>
                                <button>29</button>
                                <button>30</button>
                                <button>31</button>
                                <button>32</button>
                                <button>33</button>
                                <button>34</button>
                                <button>35</button>
                                <button>36</button>
                                <button>37</button>
                                <button>38</button>
                                <button>39</button>
                                <button>40</button>
                                <button>41</button>
                                <button>42</button>
                                <button>43</button>
                                <button>44</button>
                                <button>45</button>
                                <button>46</button>
                                <button>47</button>
                                <button>48</button>
                            </div>

                            <!-- Color Section -->
                            <h4>Color</h4>
                            <div class="color-options">
                                <div class="color-circle" style="background-color: #000000;" data-color-name="black">
                                </div>
                                <div class="color-circle" style="background-color: #808080;" data-color-name="grey">
                                </div>
                                <div class="color-circle" style="background-color: #FFFFFF;" data-color-name="white">
                                </div>
                                <div class="color-circle" style="background-color: #bd7575;" data-color-name="pink">
                                </div>
                                <div class="color-circle" style="background-color: #008000;" data-color-name="green">
                                </div>
                                <div class="color-circle" style="background-color: #FF0000;" data-color-name="red">
                                </div>
                                <div class="color-circle" style="background-color: #FFFF00;" data-color-name="yellow">
                                </div>
                                <div class="color-circle" style="background-color: #0000FF;" data-color-name="blue">
                                </div>
                            </div>


                            <!-- Action Buttons -->
                            <button class="action-btn" id="seeSelection">SEE SELECTION</button>
                            <button class="clear-btn">CLEAR FILTERS</button>
                        </div>`;
// Set the sidebar content
document.getElementById("sidebar").innerHTML = sidebarContent;
