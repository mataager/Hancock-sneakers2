const showMen = storeGender.includes("Men");
const showWomen = storeGender.includes("Women");
const showKids = storeGender.includes("Kids");


function renderMegaMenu() {
  const megaMenu = document.getElementById("mega-menu");
  megaMenu.innerHTML = `
    <div class="flex center">
      <p class="m-5 pointer underline ${
        showMen ? "" : "hidden"
      }" id="men-label">Men</p>
      <p class="m-5 pointer underline ${
        showWomen ? "" : "hidden"
      }" id="women-label">Women</p>
      <p class="m-5 pointer underline ${
        showKids ? "" : "hidden"
      }" id="kids-label">Kids</p>
    </div>
    <div class="flex col-u-991 hidden ${showMen ? "" : "hidden"}" id="men-menu">
      <div class="menu-category">
        <h4>Top</h4>
        <ul>
          <li><a onclick="changeFrameSrc('./Category.html?&category=men&piece=T-Shirt')">T-Shirts</a></li>
          <li><a onclick="changeFrameSrc('./Category.html?&category=men&piece=Polo-Shirt')">Polo-shirt</a></li>
          <li><a onclick="changeFrameSrc('./Category.html?&category=men&piece=Shirt')">Shirt</a></li>
          <li><a onclick="changeFrameSrc('./Category.html?&category=men&piece=Tank-top')">Tank-top</a></li>
          <li><a onclick="changeFrameSrc('./Category.html?&category=men&piece=Sweatshirt')">Sweatshirt</a></li>
          <li><a onclick="changeFrameSrc('./Category.html?&category=men&piece=Hoodie')">Hoodie</a></li>
          <li><a onclick="changeFrameSrc('./Category.html?&category=men&piece=Jacket')">Jacket</a></li>
          <li><a onclick="changeFrameSrc('./Category.html?&category=men&piece=Pullover')">Pullover</a></li>
        </ul>
      </div>
      <div class="menu-category">
        <h4>Bottom</h4>
        <ul>
          <li><a onclick="changeFrameSrc('./Category.html?&category=men&piece=Trousers')">Trousers</a></li>
          <li><a onclick="changeFrameSrc('./Category.html?&category=men&piece=Jeans')">Jeans</a></li>
          <li><a onclick="changeFrameSrc('./Category.html?&category=men&piece=Jogger')">Jogger</a></li>
          <li><a onclick="changeFrameSrc('./Category.html?&category=men&piece=Sweatpants')">Sweatpants</a></li>
          <li><a onclick="changeFrameSrc('./Category.html?&category=men&piece=Short')">Short</a></li>
          <li><a onclick="changeFrameSrc('./Category.html?&category=men&piece=Swimwear')">Swimwear</a></li>
          <li><a onclick="changeFrameSrc('./Category.html?&category=men&piece=Socks')">Socks</a></li>
        </ul>
      </div>
      <div class="menu-category">
        <h4>Footwear</h4>
        <ul>
          <li><a onclick="changeFrameSrc('./Category.html?&category=men&piece=Shoes')">Shoes</a></li>
          <li><a onclick="changeFrameSrc('./Category.html?&category=men&piece=Slipper')">Slipper</a></li>
        </ul>
      </div>
      <div class="menu-category">
        <h4>Accessories</h4>
        <ul>
          <li><a onclick="changeFrameSrc('./Category.html?&category=men&piece=Belts')">Belts</a></li>
          <li><a onclick="changeFrameSrc('./Category.html?&category=men&piece=Caps')">Caps</a></li>
          <li><a onclick="changeFrameSrc('./Category.html?&category=men&piece=Hats')">Hats</a></li>
          <li><a onclick="changeFrameSrc('./Category.html?&category=men&piece=Watches')">Watches</a></li>
        </ul>
      </div>
    </div>
    <div class="flex col-u-991 hidden ${
      showWomen ? "" : "hidden"
    }" id="women-menu">
      <div class="menu-category">
    <h4>Top</h4>
    <ul>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=T-Shirt')">T-Shirts</a>
        </li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Polo-Shirt')">Polo-shirt</a>
        </li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Shirt')">Shirt</a>
        </li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Tank-top')">Tank-top</a>
        </li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Sweatshirt')">Sweatshirt</a>
        </li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Hoodie')">Hoodie</a>
        </li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Jacket')">Jacket</a>
        </li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Pullover')">Pullover</a>
        </li>
    </ul>
</div>
<div class="menu-category">
    <h4>Bottom</h4>
    <ul>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Trousers')">Trousers</a>
        </li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Jeans')">Jeans</a>
        </li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Jogger')">Jogger</a>
        </li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Sweatpants')">Sweatpants</a>
        </li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Skirt')">Skirt</a>
        </li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Short')">Short</a>
        </li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Swimwear')">Swimwear</a>
        </li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Socks')">Socks</a>
        </li>
    </ul>
</div>
<div class="menu-category">
    <h4>body suits</h4>
    <ul>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Dress')">Dress</a>
        </li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Pyjama')">Pyjama</a>
        </li>
         <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=lingerie')">lingerie</a>
        </li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Borkeni')">Borkeni</a>
        </li>
    </ul>
</div>
<div class="menu-category">
    <h4>Footwear</h4>
    <ul>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Shoes')">Shoes</a>
        </li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Heels')">Heels</a>
        </li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Slipper')">Slipper</a>
        </li>
    </ul>
</div>
<div class="menu-category">
    <h4>Accessories</h4>
    <ul>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Belts')">Belts</a></li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Caps')">Caps</a></li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Hats')">Hats</a></li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Watches')">Watches</a></li>
    </ul>
</div>
    </div>
    <div class="flex col-u-991 hidden ${
      showKids ? "" : "hidden"
    }" id="kids-menu">
      <div class="menu-category">
    <h4>Top</h4>
    <ul>
        <li><a onclick="changeFrameSrc('./Category.html?&category=kids&piece=T-Shirt')">T-Shirts</a>
        </li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=kids&piece=Polo-Shirt')">Polo-shirt</a>
        </li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=kids&piece=Shirt')">Shirt</a></li>
        <li><a href="#">Tank-top</a></li>
        <li><a href="#">Sweatshirt</a></li>
        <li><a href="#">Hoodie</a></li>
        <li><a href="#">Jacket</a></li>
        <li><a href="#">Pullover</a></li>
    </ul>
</div>
<div class="menu-category">
    <h4>Bottom</h4>
    <ul>
        <li><a href="#">Trousers</a></li>
        <li><a href="#">Jeans</a></li>
        <li><a href="#">Jogger</a></li>
        <li><a href="#">Sweatpants</a></li>
        <li><a href="#">Short</a></li>
        <li><a href="#">Swimwear</a></li>
        <li><a href="#">Socks</a></li>
    </ul>
</div>
<div class="menu-category">
    <h4>Pajamas</h4>
    <ul>
        <li><a href="#">Boy’s Pajamas</a></li>
        <li><a href="#">Girl’s Pajamas</a></li>
    </ul>
</div>
<div class="menu-category">
    <h4>New Born</h4>
    <ul>
        <li><a href="#">Baby Showers</a></li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=kids&piece=Bodysuits')">Bodysuits</a></li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=kids&piece=Rompers')">Rompers</a></li>
    </ul>
</div>

<div class="menu-category">
    <h4>Footwear</h4>
    <ul>
        <li><a href="#">Shoes</a></li>
        <li><a href="#">Slipper</a></li>
    </ul>
</div>
<div class="menu-category">
    <h4>Accessories</h4>
    <ul>
        <li><a href="#">Belts</a></li>
        <li><a href="#">Caps</a></li>
        <li><a href="#">Hats</a></li>
        <li><a href="#">Watches</a></li>
    </ul>
</div>
    </div>
  `;
}

// Call the function to render the menu
renderMegaMenu();
