let authContainer = document.getElementById("authContainer");
let profileDropdown = document.getElementById("profileDropdown");
let logoutBtn = document.getElementById("logoutBtn");
let signInLink = document.getElementById("signInLink");

document.addEventListener("DOMContentLoaded",function(){

    let countrySelect = document.getElementById("country");
    let currencySelect = document.getElementById("currency");
    let languageSelect=document.getElementById("languages");
    let cPopup = document.getElementById("c_popup");
    let regionalSetting = document.getElementById("regionalSetting");
    let overlay = document.getElementById("overlay");
    let closePopup = document.getElementById("closePopup");
    let closebycancel=document.getElementById("cancel");
    let savebutton=document.getElementById("save");
    let mainalert=document.getElementById("mainalert");
    let menuList=document.getElementById("menu_list");
    let options=document.getElementById("options");
    let hiddenMenu=document.getElementById("menu_hidden");
    let reigonalsetting1=document.getElementById("regionalSetting1");
    let changebtn=document.getElementById("change");
    let startval=document.getElementById("start");
    let endval=document.getElementById("end");
    let temp;



    let today = new Date();
    let yyyy = today.getFullYear();
    let mm = String(today.getMonth() + 1).padStart(2,"0");
    let dd = String(today.getDate()).padStart(2,"0");
    let formattedDate = `${yyyy}-${mm}-${dd}`;
    document.getElementById('depart').value=formattedDate;

    let allCheckbox = document.getElementById("all");
    let economyCheckbox = document.querySelector("input[value='economy']");
    let premiumCheckbox = document.querySelector("input[value='premium']");
    let businessCheckbox = document.querySelector("input[value='business']");
    let firstCheckbox = document.querySelector("input[value='first']");
    let domesticButton = document.getElementById("domestic");
    let internationalButton = document.getElementById("international");

    let flightCards = document.querySelectorAll(".card");

    function filterFlights() {
        let showEconomy=economyCheckbox.checked||allCheckbox.checked;
        let showPremium=premiumCheckbox.checked||allCheckbox.checked;
        let showBusiness=businessCheckbox.checked||allCheckbox.checked;
        let showFirst=firstCheckbox.checked||allCheckbox.checked;
        
        flightCards.forEach(card=>{
            let isDomestic=card.classList.contains("domestic");
            let isInternational=card.classList.contains("international");
            let isEconomy=card.classList.contains("economy");
            let isPremium=card.classList.contains("premium");
            let isBusiness=card.classList.contains("business");
            let isFirst=card.classList.contains("first");
            
            let classMatch=(isEconomy && showEconomy)||(isPremium && showPremium)||(isBusiness&&showBusiness)||(isFirst&&showFirst);
                
            let typeMatch=(isDomestic && domesticButton.classList.contains("active"))||(isInternational && internationalButton.classList.contains("active"))||(!domesticButton.classList.contains("active") && !internationalButton.classList.contains("active"));
            
            if(classMatch && typeMatch){
                card.style.display="flex";
            }else{
                card.style.display="none";
            }
        });
    }

    allCheckbox.addEventListener("change",filterFlights);
    economyCheckbox.addEventListener("change",function() {
        if (this.checked) allCheckbox.checked = false;
        filterFlights();
    });
    premiumCheckbox.addEventListener("change",function(){
        if (this.checked) allCheckbox.checked = false;
        filterFlights();
    });
    businessCheckbox.addEventListener("change",function() {
        if (this.checked) allCheckbox.checked = false;
        filterFlights();
    });
    firstCheckbox.addEventListener("change",function(){
        if (this.checked) allCheckbox.checked = false;
        filterFlights();
    });

    domesticButton.addEventListener("click",function() {
        this.classList.toggle("active");
        if (this.classList.contains("active")) {
            internationalButton.classList.remove("active");
        }
        filterFlights();
    });

    internationalButton.addEventListener("click",function(){
        this.classList.toggle("active");
        if (this.classList.contains("active")){
            domesticButton.classList.remove("active");
        }
        filterFlights();
    });

    filterFlights();
    
    document.querySelectorAll(".book-btn").forEach(button=>{
        button.addEventListener("click", function(e){
            e.preventDefault();
            
            if (!sessionStorage.getItem("profileName")){
                alert("Please sign in to book flights");
                window.location.href="SignUpPage.html";
                return;
            }
            
            let card=this.closest(".card");
            let airline=card.dataset.airline;
            let departure=card.dataset.departure;
            let arrival=card.dataset.arrival;
            let duration=card.dataset.duration;
            let price=card.dataset.price;
            let flightClass=card.dataset.class;
            let passengerCount=document.getElementById("count").value||1;
            
            sessionStorage.setItem("flightAirline",airline);
            sessionStorage.setItem("flightDeparture",departure);
            sessionStorage.setItem("flightArrival",arrival);
            sessionStorage.setItem("flightDuration",duration);
            sessionStorage.setItem("flightPrice",price);
            sessionStorage.setItem("flightClass",flightClass);
            sessionStorage.setItem("passengerCount",passengerCount);
            
            window.location.href="flight1.html";
        });
    });

    

    let profileName=sessionStorage.getItem("profileName");
    if(profileName){
        authContainer.innerHTML=`<button class="nav" id="profileBtn" style="height: 25px;width: 70px; margin-top: 30px;">${profileName}</button>`;
        
        let profileBtn=document.getElementById("profileBtn");
        profileBtn.addEventListener("click",function(e) {
            e.stopPropagation();
            let rect =profileBtn.getBoundingClientRect();
            profileDropdown.style.display ="block";
            profileDropdown.style.top= `${rect.bottom}px`;
            profileDropdown.style.right=`${window.innerWidth - rect.right}px`;
        });
    }

    logoutBtn.addEventListener("click",function(){
        sessionStorage.removeItem("profileName");
        window.location.reload();
    });

    document.addEventListener("click",function(e){
        if (!e.target.closest('#profileDropdown')&&!e.target.closest('#profileBtn')){
            profileDropdown.style.display="none";
        }
    });

    menuList.addEventListener("click",function(){
        profileDropdown.style.display="none";
    });




    if(localStorage.getItem("saveCountry")){
        countrySelect.value=localStorage.getItem("saveCountry");
    }
    if(localStorage.getItem("saveCurrency")){
        currencySelect.value=localStorage.getItem("saveCurrency");
    }
    if(localStorage.getItem("saveLanguage")){
        languageSelect.value=localStorage.getItem("saveLanguage");
    }

    changebtn.addEventListener("click",function(){
        var btn= document.getElementById("change");
        if (btn.style.transform== "rotate(180deg)") {
            btn.style.transform= "rotate(0deg)";
        }
        else {
            btn.style.transform="rotate(180deg)";
        }
        btn.style.transition="0.5s";
        temp=startval.value;
        startval.value=endval.value;
        endval.value=temp;
    });
    
    cPopup.addEventListener("click",function(){
        regionalSetting.style.display="block";
        overlay.style.display="block";
    });
    
    closePopup.addEventListener("click",function(){
        regionalSetting.style.display ="none";
        overlay.style.display ="none";
    });
    closebycancel.addEventListener("click",function(){
        regionalSetting.style.display ="none";
        overlay.style.display ="none";
    })
    
    overlay.addEventListener("click",function(){
        regionalSetting.style.display ="none";
        overlay.style.display ="none";
    });

    menuList.addEventListener("click",function(){
        if(options.style.display==="none"&&hiddenMenu.style.display==="none"){
            options.style.display="block";
            hiddenMenu.style.display="block";
        }
        else{
            options.style.display="none";
            hiddenMenu.style.display="none";
        }
    });

    reigonalsetting1.addEventListener("click",function(){
        options.style.display="none";
        hiddenMenu.style.display="none";
        regionalSetting.style.display ="block";
        overlay.style.display ="block";
    });

    hiddenMenu.addEventListener("click",function(){
        if(options.style.display==="block"&& hiddenMenu.style.display==="block")
        options.style.display="none";
        hiddenMenu.style.display="none";
    });

    document.getElementById("close_alert").addEventListener("click",function(e){
        document.getElementById("mainalert").style.display ="none";
        e.preventDefault();
    });


    savebutton.addEventListener("click",function(e){
        e.preventDefault();

        if(countrySelect.value===""||currencySelect.value===""||languageSelect.value===""){
            mainalert.style.height="50px";
            mainalert.style.width="auto";
            mainalert.style.display="flex";
            mainalert.style.border="3px solid red";
            mainalert.style.color="red";
            mainalert.style.padding="10px";
            mainalert.style.backgroundColor="rgb(225, 135, 135)";
            document.getElementById("alertMessage").textContent="Please Select all Settings";
            return false;
        }

        localStorage.setItem("saveCountry",countrySelect.value);
        localStorage.setItem("saveCurrency",currencySelect.value);
        localStorage.setItem("saveLanguage",languageSelect.value);
        });

    savebutton.addEventListener("click",function(e){
        e.preventDefault();
        regionalSetting.style.display = 'none';
        overlay.style.display = 'none';
        
    });

});
 


