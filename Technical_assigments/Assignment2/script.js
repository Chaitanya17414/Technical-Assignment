$(document).ready(function () {
    let cityName = $("#citySelect");
    $.getJSON("config.json", function (data) {

        $.each( data, function( key, val ) {
        let showdata=`
            <option value="`+val.cityName+`">`+ val.cityName+`</option>
        `;
        cityName.append(showdata);
        });
  
    });
    $("#submit").click(function (e) {
        let validate = Validate();
        $("#message").html(validate);
        if (validate.length == 0) {
            let cityId = $("#citySelect").val().toLowerCase();
           
            //ajax call
            //_________________________________________________
            $.ajax({
                type: "GET",
                url: "https://api.openweathermap.org/data/2.5/weather?q="+cityId+"&appid=4d8fb5b93d4af21d66a2948710284366&units=metric",
                dataType: "json",
                data:{},
                success: function (result, status, xhr) {
                    setTimeout(function(){$(".ajax-list").show();
                        let icon = 'https://openweathermap.org/img/wn/'+ result["weather"][0]["icon"] +'.png';
                        let sunsetTime = NumToTime(result["sys"]["sunset"]);
                        let sunriseTime = NumToTime(result["sys"]["sunrise"]);
                        let temp = parseInt(result["main"]["temp"],10);
                        let feelsLike = parseInt(result["main"]["feels_like"],10);
                        let li = $("<li></li>").addClass("city-data"); 


                        let showData = `<div class="name-section">
                        <p class="country-name">
                        <span>` + result["name"] + `, </span><span>` + result["sys"]["country"] + `</span>
                        </p>
                        <div class="icon-adjust">
                            <i class="fa-solid fa-trash"></i>
                        </div></div>
                        <div class="city-desc">
                            <img src="`+ icon +`"/>
                            <div>`+ result["weather"][0]["description"] +`</div></div>
                        <div>
                            <div class="city-temp">` + temp + `<span class="celcius">C</span></div>
                            <p class="city-feels-temp">Feels like: `+ feelsLike +`C</p>
                        </div>
                        <div class="sun-position">
                            <div>
                                <div class="sunrise">
                                    <img src="images/sunrise.png" width=50 height=50 />
                                </div>
                                <span class="sunrise-data">Sunrise: `+sunriseTime+`</span>
                            </div>
                            <div>
                                <div class="sunset">
                                 <img src="images/sunset1.jpg" width= 35 height=45>
                                </div>
                                <span class="sunset-data">Sunset: `+sunsetTime+`</span>
                            </div>
                        </</div>`;
                            
                        li.html(showData);
                        $(".ajax-list .weather-city-list").append(li);
                     },3000);
                },
                error: function (xhr, status, error) {
                    alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
                }
            });
           
        }
    });
 
    //button click events
    //_________________________________________________

    $(document).on("click",".fa-solid.fa-trash", function() {
        $(this).closest(".city-data").remove();
    });
    $(document).on("click",".reload-page", function() {
        window.location.reload();
    });

    // Validations
    //_____________________________________________________

    function NumToTime(num) { 
        var time = new Date(num * 1000).toLocaleTimeString(); 
        return time;
    }
    function Validate() {
        let errorMessage = "";
        if ($("#citySelect").val() == "city") {
            errorMessage += "Please Select City name";
        }
        return errorMessage;
    }
});