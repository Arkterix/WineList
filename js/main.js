// wait for the document to be loaded
$(document).ready(function() {

    // Display initial total sales price of $0.00
    var totalDiv = document.getElementById('totalAmount');
    totalDiv.innerHTML = "$0.00";


    // ===============Sorting Categories===============
    document.getElementById('sort').onchange = function() {
        sortChange();
    }

    function sortChange() { 
        var whichSort = document.getElementById("sort").value; // Determine which sort from dropdown list
        var availableArray = {} // Only sort the wine items that are currently visible (Saves time)
        var outputArray = {} // Sorted array containing order of wine items to be reproduced (key,category selected)
        var tempKey; // Will hold the key to generate wine item

        // Determine which wine products are not hidden, create array that contains all visible products
        for(key in listOfAvailableWines){
            if($('#wine'+key).is(':visible'))
            {
                availableArray[key] = listOfAvailableWines[key];
            }
        }
       
        // Determine which sort has been selected
        switch(whichSort){
            case "Name-Up":
                outputArray = mapOP(availableArray,"getName"); // Only need the attribute and key for outputArray (outputArray will be sorted by this attribute)
                outputArray.sort(compareInc);
                break;
            case "Name-Down":
                outputArray = mapOP(availableArray,"getName");
                outputArray.sort(compareDec);
                break;
            case "Category-Up":
                outputArray = mapOP(availableArray,"getCategory");
                outputArray.sort(compareInc);
                break;
            case "Category-Down":
                outputArray = mapOP(availableArray,"getCategory");
                outputArray.sort(compareDec);
                break;
            case "Price-Up":
                outputArray = mapOP(availableArray,"getPrice");
                outputArray.sort(compareInc);
                break;
            case "Price-Down":
                outputArray = mapOP(availableArray,"getPrice");
                outputArray.sort(compareDec);
                break;
            case "Volume-Up":
                outputArray = mapOP(availableArray,"getVolume");
                outputArray.sort(compareInc);
                break;
            case "Volume-Down":
                outputArray = mapOP(availableArray,"getVolume");
                outputArray.sort(compareDec);
                break;
            case "Country-Up":
                outputArray = mapOP(availableArray,"getCountry");
                outputArray.sort(compareInc);
                break;
            case "Country-Down":
                outputArray = mapOP(availableArray,"getCountry");
                outputArray.sort(compareDec);
                break;
            case "Producer-Up":
                outputArray = mapOP(availableArray,"getProducer");
                outputArray.sort(compareInc);
                break;
            case "Producer-Down":
                outputArray = mapOP(availableArray,"getProducer");
                outputArray.sort(compareDec);
                break;
        }// END switch
        
        // OutputArray has been sorted, we now know the new order of wine items
        
        hideAll(); // Need to construct new wine items display, delete all cardHolder divs
    
        // Produce new wine items display in new order
        for (var i = 0; i < outputArray.length; i++) {
            tempKey = outputArray[i][0] // Assigns the key to tempKey
            generate(tempKey); // Create wine item object
        }
    }; //END function sortChange()

    // Sorts outputArray by ascending order
    function compareInc(a,b) {
        if (a[1] < b[1])
          return -1;
        if (a[1] > b[1])
          return 1;
        return 0;
    }

    // Sorts outputArray by descending order
    function compareDec(a,b) {
        if (a[1] > b[1])
          return -1;
        if (a[1] < b[1])
          return 1;
        return 0;
    }
    
    // Create key/value pairs for outputArray 
    function mapOP (inputArray,property)
    {
        var items = Object.keys(inputArray).map(function(key) {
            switch(property){
                case "getCategory":
                    return [key, inputArray[key].getCategory()]; // Returns key and category of item
                    break;

                case "getName":
                    return [key, inputArray[key].getName()]; // Returns key and name of item
                    break;

                case "getVolume":
                    return [key, inputArray[key].getVolume()]; // Returns key and volume of item
                    break;

                case "getPrice":
                    return [key, inputArray[key].getPrice()]; // Returns key and unit price of item
                    break;

                case "getCountry":
                    return [key, inputArray[key].getCountry()]; // Returns key and country of item
                    break;

                case "getProducer":
                    return [key, inputArray[key].getProducer()]; // Returns key and producer of item
                    break;
            }
        });
        return items;
    } // END function mapOP
    
    // ===============Search Wine Items===============
    // Does not consider if any category or sort is done
    $('#search').on("keyup", function(e) {
        if (e.keyCode == 13) { // Search is only performed when user presses enter key
            hideAll(); // Need to construct new wine items display, delete all cardHolder divs
            var input = $("#search")[0].value.toLowerCase(); // case insensitive search
            
            // Searching to see if input matches with any wine names
            for(key in listOfAvailableWines){
                if(listOfAvailableWines[key].getName().toLowerCase().indexOf(input) != -1) // Matched
                {
                    generate(key); // If matched, display wine item
                }
                else{
                    continue;
                }
            }
        }
    }); // END function


    // ===============Wine Item Categories===============
    $('#All').on('click', function() { // Show all categories
        showAll();
    });

    // Show only Red Wines
    $('#Red-Wine').on('click', function() { 
        hideAll();
        for (var key in listOfAvailableWines)
        {
            if(listOfAvailableWines[key].getCategory() == 'RED'){
                generate(key);
            }
            else{
                continue;
            }
        }
    });
    
    // Show only White Wines
    $('#White-Wine').on('click', function() {
        hideAll();
        for (var key in listOfAvailableWines)
        {
            if(listOfAvailableWines[key].getCategory() == 'WHITE'){
                generate(key);
            }
            else{
                continue;
            }
        }
    });

    // Show only Rose Wines
    $('#Rose-Wine').on('click', function() {
        hideAll();
        for (var key in listOfAvailableWines)
        {
            if(listOfAvailableWines[key].getCategory() == 'ROSE'){
                generate(key);
            }
            else{
                continue;
            }
        }
    });

    // Show only Champagne Wines
    $('#Champagne').on('click', function() {
        hideAll();
        for (var key in listOfAvailableWines)
        {
            if(listOfAvailableWines[key].getCategory() == 'CHAMPAGNE'){
                generate(key);
            }
            else{
                continue;
            }
        }
    });

    // Show only Sparkling Wines
    $('#Sparkling-Wine').on('click', function() {
        hideAll();
        for (var key in listOfAvailableWines)
        {
            if(listOfAvailableWines[key].getCategory() == 'SPARKLING'){
                generate(key);
            }
            else{
                continue;
            }
        }
    });

    // Show only Dessert Wines
    $('#Dessert').on('click', function() {
        hideAll();
        for (var key in listOfAvailableWines)
        {
            if(listOfAvailableWines[key].getCategory() == 'DESSERT'){
                generate(key);
            }
            else{
                continue;
            }
        }
    });

    // Show only Ice Wines
    $('#Icewine').on('click', function() {
        hideAll();
        for (var key in listOfAvailableWines)
        {
            if(listOfAvailableWines[key].getCategory() == 'ICEWINE'){
                generate(key);
            }
            else{
                continue;
            }
        }
    });

    // Show only Fortified Wines
    $('#Fortified-Wines').on('click', function() {
        hideAll();
        for (var key in listOfAvailableWines)
        {
            if(listOfAvailableWines[key].getCategory() == 'FORTIFIED'){
                generate(key);
            }
            else{
                continue;
            }
        }
    });

    // Show only Specialty Wines
    $('#Specialty-Wines').on('click', function() {
        hideAll();
        for (var key in listOfAvailableWines)
        {
            if(listOfAvailableWines[key].getCategory() == 'SPECIALTY'){
                generate(key);
            }
            else{
                continue;
            }
        }
    });

    // ====================Start Shopping Cart JS=======================

    var toggleClosed = true; // Keep track of if shopping cart is open or not
    var panelRight = document.getElementById('rightPanel');
    var toggleButton = document.getElementById('shopcartToggle');
    
    $('#shopcartToggle').on('click', function() // Toggle Shopping Cart
    {
        if(toggleClosed) // Open shopping cart
        {
            panelRight.style.animation = 'toggleOpen .5s linear forwards'
            toggleButton.innerHTML = "&#9654;"
            toggleClosed = false;
        }
        else // Close shopping cart
        {
            panelRight.style.animation = 'toggleClose .5s linear forwards'
            toggleButton.innerHTML = "&#9664;"
            toggleClosed = true;
        }
    });
});//end document ready

// !!!!!Not enough photos for all wine items, assuming that I only display wines with picture associated with it!!!!!
// The folder images does not contain a wine photo for each catalog items in global variable Catalog (in catalog.js)

var listOfAvailablePics = ["284547", "291211", "297101", "306019", "328294", "370361", "387661", "387703", "396804", "431923", "438746", "453084", "471150", "471184", "471192", 
    "477547", "480756", "482026", "485128", "485995", "506519", "506691", "514737", "522508", "522904", "537605", "539049", "557553", "557587", "558288", "565861", "566174", "588053",
    "589028", "593855", "609719", "661249", "729392", "897702", "924654"];

var listOfAvailableWines = {} // This will be new Catalog variable, containing information about only the wine items with photos associated with them
var overLapStatusTracker = {} // Tracks the status of overlap in each wine item (closed or openned)

for (var key in Catalog) // Producing listOfAvailableWines
{
    if(listOfAvailablePics.includes(key)){
        listOfAvailableWines[key] = Catalog[key];
    }
    else{
        continue;
    }
}

// Generate initial display of list of wine products when initializing page
for (var key in listOfAvailableWines){
    generate(key);
}

// Function for regenerating all of the wine list items
function showAll(){
    hideAll();
    for (var key in listOfAvailableWines){
        generate(key);
    }
}

// Function for deleting all wine items (Delete all cardHolder divs in wrapperItem)
function hideAll(){
    var myNode = document.getElementById("wrapperItem");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    overLapStatusTracker = {};
}

// =======================Generate Wine Item=======================
// This function generates a wine item for display
function generate(key){
    var wineImgURL = './images/catalog/'+key+'.png'
    var wineCat = listOfAvailableWines[key].getCategory(); // Need to translate the attribute to proper notation Ex: "RED" -> "Red Wine", uses CATEGORY_LABELS
    var winePrice = listOfAvailableWines[key].getPrice(); 
    var cardHolderDiv = document.createElement("div");
    var wrapper = document.getElementById('wrapperItem')

    var cent = parseFloat(Math.abs(winePrice).toString().split('.')[1]); // Need to get dollar and cent values to be displayed in wine item
    var dollar = Math.floor(winePrice); // Dollar and cent will have different css stylign, so need to split wine price

    var wineHTML = '<h1 class = "priceStyleDollar">$'+dollar+'</h1>' //Constructing innerHTML of cardHolder
                    
    wineHTML += '<h1 class = "priceStyleCent">'+cent+'</h1>'
    wineHTML += '<div id= "greyLayer'+key+'" class = "cardHolderOverlay"></div>'
    wineHTML += '<button id="toggle'+key+'" class="toggle">&#43;</button>'
    wineHTML += '<div id="img'+key+'" class = "wineIMG"></div>';
    wineHTML += '<div id="overlap'+ key +'" class="overlap">';
    wineHTML += '<button id = "overlapBTN'+key+'" class = "overlapBTN">&#9650;</button>';
    wineHTML += '<h1 class= "infoHeader">'+listOfAvailableWines[key].getName()+'</h1>';
    wineHTML += '<h1 id="dividerHeader'+key+'" class= "dividerHeader">______________________</h1>';
    wineHTML += '<h1 id="catHeader'+key+'" class= "infoCatHeader">Category</h1>';
    wineHTML += '<h1 id="cat'+key+'" class= "infoHeader">'+outputCat(wineCat)+'</h1>'; // Ex: "RED" -> "Red Wine", uses CATEGORY_LABELS
    wineHTML += '<h1 id="volHeader'+key+'" class= "infoCatHeader">Volume</h1>';
    wineHTML += '<h1 id="vol'+key+'" class= "infoHeader">'+listOfAvailableWines[key].getVolume()+'</h1>';
    wineHTML += '<h1 id="countryHeader'+key+'" class= "infoCatHeader">Country</h1>';
    wineHTML += '<h1 id="country'+key+'" class= "infoHeader">'+listOfAvailableWines[key].getCountry()+'</h1>';
    wineHTML += '<h1 id="producerHeader'+key+'" class= "infoCatHeader">Producer</h1>';
    wineHTML += '<h1 id="producer'+key+'" class= "infoHeader">'+listOfAvailableWines[key].getProducer()+'</h1>';
    wineHTML += '</div>'
    wineHTML += '</div>'
    
    overLapStatusTracker[key] = false; // Set initial overlap status to false (Closed overlap)

    cardHolderDiv.id = "wine"+key; // Set unique id for each displayed wine item
    cardHolderDiv.className = "cardHolder";
    cardHolderDiv.innerHTML = wineHTML;
    wrapper.appendChild(cardHolderDiv);

    //set initially to hidden to prepare for animation when overlap is openned
    $("#cat"+key).css({visibility:"visible", opacity: 0.0});
    $("#dividerHeader"+key).css({visibility:"visible", opacity: 0.0});
    $("#catHeader"+key).css({visibility:"visible", opacity: 0.0});
    $("#volHeader"+key).css({visibility:"visible", opacity: 0.0});
    $("#vol"+key).css({visibility:"visible", opacity: 0.0});
    $("#countryHeader"+key).css({visibility:"visible", opacity: 0.0});
    $("#country"+key).css({visibility:"visible", opacity: 0.0});
    $("#producerHeader"+key).css({visibility:"visible", opacity: 0.0});
    $("#producer"+key).css({visibility:"visible", opacity: 0.0});

    $('#img'+key).css('background-image','url('+wineImgURL+')'); // Set the wine image for wine item
    
    $('#toggle'+key).click(function(event) { // Add listener for wine toggle button (Adding wine item to shopping cart)
        event.stopPropagation(); // Stop Event Bubbling
        addClick(key);
    });

    $('#overlapBTN'+key).click(function(event) { // Add listener for wine overlap button (Toggling the overlap)
        event.stopPropagation(); // Stop Event Bubbling
        toggleOverlap(key);
    });
} // END function generate

// ====================Start Wine Item Overlap JS=======================
// The animations for closing and openning overLap are located here. Called when wine toggle button is clicked.
function toggleOverlap (key){
    var overlapOpen = overLapStatusTracker[key];
    var overlap = document.getElementById('overlap'+key)
    var toggle = document.getElementById('overlapBTN'+key)
    var greyLayer = document.getElementById('greyLayer'+key)
    var small={width: "80px" , height: "120px"}; // Wine image size when overlap is closed
    var large={width: "84px",height: "126px"}; // Wine image size when overlap is openned
    var img = $('#img'+key);

    if (!overlapOpen){
      img.animate(large,400,function() {
        overlap.style.animation = 'overlapOpen .5s linear forwards'
        $('#overlap'+key).animate({ 'opacity': '0.7' },500);

        $("#cat"+key).animate({opacity: 1.0},500); // Animate info text appearing
        $("#dividerHeader"+key).animate({opacity: 1.0},500);
        $("#catHeader"+key).animate({opacity: 1.0},500);
        $("#volHeader"+key).animate({opacity: 1.0},500);
        $("#vol"+key).animate({opacity: 1.0},500);
        $("#countryHeader"+key).animate({opacity: 1.0},500);
        $("#country"+key).animate({opacity: 1.0},500);
        $("#producerHeader"+key).animate({opacity: 1.0},500);
        $("#producer"+key).animate({opacity: 1.0},500);
            
        toggle.innerHTML = "&#9660;" // Change triangle of button
          overLapStatusTracker[key] = true
      });
    }
    else{
      overlap.style.animation = 'overlapClose .5s linear forwards';
      overLapStatusTracker[key] = false;
      toggle.innerHTML = "&#9650;" // Change triangle of button
      $('#overlap'+key).animate({ 'opacity': '0.5' },500);
        
      $("#cat"+key).animate({opacity: 0.0},500); // Animate info text disappearing
      $("#dividerHeader"+key).animate({opacity: 0.0},500);
      $("#catHeader"+key).animate({opacity: 0.0},500);
      $("#volHeader"+key).animate({opacity: 0.0},500);
      $("#vol"+key).animate({opacity: 0.0},500);
      $("#priceHeader"+key).animate({opacity: 0.0},500);
      $("#price"+key).animate({opacity: 0.0},500);
      $("#countryHeader"+key).animate({opacity: 0.0},500);
      $("#country"+key).animate({opacity: 0.0},500);
      $("#producerHeader"+key).animate({opacity: 0.0},500);
      $("#producer"+key).animate({opacity: 0.0},500);
      
      setTimeout(function() { // Only animate img shrink when overlap animation is complete
          img.animate(small,200);
      }, (500));
  
    }
}// END function toggleOverlap 

// Determines the correct category name to be displayed in UI Ex: "RED" -> "Red Wine", uses CATEGORY_LABELS
function outputCat(inputCategory){
    var outputCategory;

    outputCategory = CATEGORY_LABELS[inputCategory];
    
    return outputCategory;
}// END outputCat

// ====================Start Shopping Cart JS=======================

var cartList = []; // Contains information of current items in Shopping Cart -> key:[qty, wine name, wine unit price, wine total price]
var tempArray = [];
var backgroundColorCounter = 0; // Determine background color of shopping cart item
var totalSalePrice = 0; // Total amount of items in shopping cart, initially 0

// Function for determining new state of shopping cart after user addes wine item
function addClick(key){
    var itemPrice = listOfAvailableWines[key].getPrice();

    if (!(key in cartList)){ // If the wine item is not in shopping cart, add to cartList
        cartList[key] = [1,listOfAvailableWines[key].getName(), itemPrice, itemPrice];
    }
    
    else{ // If the wine item is already in shopping cart, add quantity by 1
        var currentQTY = cartList[key][0];
        var currentTotalPrice = cartList[key][3];

        currentQTY++; // Increment QTY by 1
        currentTotalPrice += listOfAvailableWines[key].getPrice(); // Update total price of wine item
        
        cartList[key][0] = currentQTY; 
        cartList[key][3] = currentTotalPrice; // New currentTotalPrice set

    }
    totalSalePrice = totalSalePrice + itemPrice; // Update new totalSalePrice (Total Amount)

    // State of shopping cart has changed, delete all visible cart items and reconstruct
    deleteCart();

    backgroundColorCounter = 0;
    for (var key in cartList){ // Generate new shopping cart display list
        generateCartItem(key,cartList[key][0],cartList[key][1],cartList[key][2],cartList[key][3].toFixed(2),totalSalePrice.toFixed(2));
    }
} // END function addClick

// Function for deleting all present cart items 
function deleteCart(){
    var myNode = document.getElementById("cartList");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

var itemWrapper = document.getElementById('cartList')

// This function generates a cart item for display in shopping cart
function generateCartItem(key,itemQTY,itemName,itemUnitPrice,itemTotalPrice,totalSalePrice){

    var cartItemHTML = '<button id="delete'+key+'" class="deleteButton">X</button>'
    cartItemHTML += '<h2 class="itemQTY">'+itemQTY+'</h2>'
    cartItemHTML += '<h2 class="itemDesc">'+itemName+'</h2>'
    cartItemHTML += '<h2 class="itemPrice">$'+itemUnitPrice+'</h2>'
    cartItemHTML += '<h2 class="itemTotalPrice">$'+itemTotalPrice+'</h2>'

    var itemDiv = document.createElement("div");
    itemDiv.id = "item"+key;
    itemDiv.className = "cartItem";
    itemDiv.innerHTML = cartItemHTML;
    itemWrapper.appendChild(itemDiv);

    if(backgroundColorCounter == 1){ // Alternate background color of cart item
        $('#item'+key).css('background-color','rgb(51,51,51');
        backgroundColorCounter--;
    }
    else{
        backgroundColorCounter++;
    }

    $('#delete'+key).click(function(event) {
        event.stopPropagation();
        deleteItemClick(key);
    });

    var totalDiv = document.getElementById('totalAmount');
    totalDiv.innerHTML = "$"+totalSalePrice; // Update total amount
}

// This function determines the state of shopping cart if a cart item is deleted
function deleteItemClick(key){
    var currentItemTotal = cartList[key][3]; // Need the total amount for a wine item. This will be subtracted from the total amount

    delete cartList[key]; // Delete the wine item from list
    deleteCart();
    
    totalSalePrice = totalSalePrice - currentItemTotal;

    if (totalSalePrice < 0.01){ // If all wine items deleted, set to $0.00
        var totalDiv = document.getElementById('totalAmount');
        totalDiv.innerHTML = "$0.00";
    }
    else{ // If only one wine item is deleted, update shopping cart
        for (var key in cartList){
            generateCartItem(key,cartList[key][0],cartList[key][1],cartList[key][2],cartList[key][3].toFixed(2),totalSalePrice.toFixed(2));
        }
    }
}// END function deleteItem
