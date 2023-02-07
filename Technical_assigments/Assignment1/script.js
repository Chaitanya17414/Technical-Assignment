$(document).ready(function () {
  let productsList = $(".products-section .products");
  $.getJSON("json/config.json", function (data) {

    $.each( data, function( key, val ) {
      var priceFormat = digitFormat(val.price);
      let showdata=`<div class="product">
      <img src="`+ val.imageUrl +`" alt="product-image" height="100"/>
      <p class="product-name">` + val.name + `</p>
      <p class="product-sku"><span class="bold">SKU: </span>` + val.sku + `</p>
      <p class="product-price">₹` + priceFormat + `</p>
      <button class="addcart-btn">Add to Cart</button></div>
      
      `;
      productsList.append(showdata);
    });
  
 });

$(document).on("click",".filter-section .filters", function() {
     $(".filter-container").toggleClass("show-filter-container")   
  });

 //Add to cart
 $(document).on("click",".product .addcart-btn", function() {
   $(".products-section .cart-section").show();
    var name = $(this).siblings(".product-name").text();
    var price = $(this).siblings(".product-price").text();
    var summaryData = $(".mycart-summary .product-data .productName");
    var summaryPrice = $(".mycart-summary .product-data .productPrice");
    var summaryHiddenPrice = $(".mycart-summary .product-data .productHiddenPrice");

    summaryData.append('<li>'+ name +'</li>');
    summaryPrice.append('<li class=>'+ price +'</li>');
    summaryHiddenPrice.append('<li class=>'+ numberFormat(price) +'</li>');

    //total

    function getSum() {
      var total = 0;
      $('.productHiddenPrice').children().each(function(index, value) {
        total += parseInt(value.innerHTML.trim(), 10);
      });
      return total;
    }
    var total = getSum();
    $(".sub-total .total-price").text('₹'+total+'');
    
    //service tax
    var totalAmount = total;
    var serviceTax = parseFloat(((totalAmount/100)*21).toFixed(2));
    var totalTaxAndPrice = serviceTax + totalAmount
    $(".sub-total .tax-amount").text('₹'+ serviceTax +'');
    $(".total .total-amount").text('₹'+ totalTaxAndPrice +'');

    //discount code

    $(document).on("click",".discount .add-btn", function() {
      $.ajax({
          type: "Get",
          url: "json/discount.json",
          dataType: "json",
          success: function(result) {
             var inputVal = $(".discount .discount-input").val();
             $.each( result, function( key, val ) {
              if (inputVal == val.discountCupon) {
                var promoval = parseFloat(((totalTaxAndPrice/100)*val.discountPercentage).toFixed(2));
                var totalPrice= (totalTaxAndPrice - promoval).toFixed(2);
            
                let discountdata =`<li class="d-flex"><p id="` + val.discountCupon+ `">Discount</p>
                <p >-`+promoval+`</p></li>`;
                  $(".sub-total .total-discount").append(discountdata);
                  $(".total .total-amount").text('₹'+ totalPrice +'');
                  totalPrice = totalTaxAndPrice;
                  $(".discount .discount-input").val('');
                  $(".error").hide();
                return true;
              }
              else if(inputVal == ''){
                $(".error").show().text('Please Enter Discount Code');
              }
              else {
                $(".error").show().text("Please Enter Valid Code");

              }
             });
            
          },
          error: function(){
              alert("json not found");
          }
      });
      //   $.getJSON("discount-coupons.json", function (data) {

      //     $.each( data, function( key, val ) {
           
      //     });
      //  });
    }); 
  });

//Price slider 

 $("#price-range").slider({
    step: 500,
    range: true, 
    min: 0, 
    max: 80000, 
    values: [0, 80000], 
    slide: function(event, ui)
    {$("#priceRange").val(ui.values[0] + " - " + ui.values[1]);}
  });
  $("#priceRange").val($("#price-range").slider("values", 0) + " - " + $("#price-range").slider("values", 1));

// function callings

  function digitFormat(num) {
        var digit= num.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        return digit;
    }
    function numberFormat(num) {
        var number= num.replace(/,/g, '').replace(/₹/g, '');
        return number;
    }
});