var product_total_amt = document.getElementById('product_total_amt');
var shipping_charge = document.getElementById('shipping_charge');
var total_cart_amt = document.getElementById('total_cart_amt');
var discountCode = document.getElementById('discount_code1');



// Hide both divs
var succ = document.getElementById('success');
var error = document.getElementById('error');



const updateDeliveryDate = () => {
    const selectedQuantity = Array.from(document.querySelectorAll('.page-item input')).some(input => input.value !== '0');
    const deliveryDateElement = document.getElementById('deliveryDate');
    
    if (selectedQuantity) {
        // Calculate delivery dates
        const currentDate = new Date();
        const deliveryDateStart = new Date(currentDate);
        const deliveryDateEnd = new Date(currentDate);
        deliveryDateStart.setDate(currentDate.getDate() + 2); // Add 2 days
        deliveryDateEnd.setDate(currentDate.getDate() + 4);   // Add 4 days
        
        // Format dates
        const formattedStartDate = deliveryDateStart.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        const formattedEndDate = deliveryDateEnd.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        
        // Update delivery date element
        deliveryDateElement.textContent = formattedStartDate + ' - ' + formattedEndDate;
    } else {
        // If no quantity is selected, hide the delivery date
        deliveryDateElement.textContent = 'Delivery Date: Not available';
    }
};

// Call updateDeliveryDate initially to set the default delivery date
updateDeliveryDate();

// Add event listeners to quantity inputs to update delivery date on change
const quantityInputs = document.querySelectorAll('.page-item input');
quantityInputs.forEach(input => {
    input.addEventListener('input', updateDeliveryDate);
});



const decreaseNumber = (incdec, itemprice) => {
   
    var itemval = document.getElementById(incdec);
    var itemprice = document.getElementById(itemprice);
    console.log(itemprice.innerHTML);
    // console.log(itemval.value);
    if (itemval.value <= 0) {
        itemval.value = 0;
        alert('Negative quantity not allowed');
    } else {
       
        itemval.value = parseInt(itemval.value) - 1;
        itemval.style.background = '#fff';
        itemval.style.color = '#000';
        itemprice.innerHTML = parseInt(itemprice.innerHTML) - 300.00;
        product_total_amt.innerHTML = parseInt(product_total_amt.innerHTML) - 300.00;
        total_cart_amt.innerHTML = parseInt(product_total_amt.innerHTML) + parseInt(shipping_charge.innerHTML);
        updateDeliveryDate();
    }
}
const increaseNumber = (incdec, itemprice) => {
  
    var itemval = document.getElementById(incdec);
    var itemprice = document.getElementById(itemprice);
    // console.log(itemval.value);
    if (itemval.value >= 5) {
        itemval.value = 5;
        alert('max 5 allowed');
        itemval.style.background = 'red';
        itemval.style.color = '#fff';
    } else {
        
        itemval.value = parseInt(itemval.value) + 1;
        itemprice.innerHTML = parseInt(itemprice.innerHTML) + 300.00;
        product_total_amt.innerHTML = parseInt(product_total_amt.innerHTML) + 300.00;
        total_cart_amt.innerHTML = parseInt(product_total_amt.innerHTML) + parseInt(shipping_charge.innerHTML);
        updateDeliveryDate();
    }
}

const discount_code = () => {
    let totalamtcurr = parseInt(total_cart_amt.innerHTML);
    let error_trw = document.getElementById('error_trw');
    if (discountCode.value === 'harsh') {
        let newtotalamt = totalamtcurr - 60;
        total_cart_amt.innerHTML = newtotalamt;
        error_trw.innerHTML = "Hurray! code is valid";
    } else {
        error_trw.innerHTML = "Try Again! Valid code is harsh";
    }
}

const payment = () => {

    if(parseInt(product_total_amt.innerHTML) > 0) {
        succ.style.display = "block";
        error.innerHTML = "";
        error.style.display = "none";
        
        succ.style.padding = "10px";
        document.getElementById('breaks').innerHTML = "<br/>"
        succ.innerHTML = "Redirecting to payment page...";
    }
    else{
        succ.style.display = "none";
        succ.innerHTML = "";
        error.style.display = "block";
        error.style.padding = "10px";
        document.getElementById('breaks').innerHTML = "<br/>"
       error.innerHTML = "Please select a product to continue...";
    }
}