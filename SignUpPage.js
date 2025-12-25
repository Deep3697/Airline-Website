document.addEventListener("DOMContentLoaded", function() {
    let form = document.querySelector("form");
    document.getElementById("close_alert").addEventListener("click", function(e) {
        document.getElementById("mainalert").style.display = "none";
        e.preventDefault();
    });
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        if(validateForm()) {
            let fname = document.getElementById("firstname").value;
            sessionStorage.setItem("profileName", fname);
            window.location.href = "index.html"; 
        }
    });
    
    
});


function validateForm(){
    let fname=document.getElementById("firstname").value;
    let lname=document.getElementById("lastname").value;
    let email=document.getElementById("email").value;
    let password=document.getElementById("password").value;
    let confirmPassword=document.getElementById("confirmPassword").value;
    let date=document.getElementById("birthdate").value;
    let gender = document.querySelector('input[name="gender"]:checked');
    let mobNo=document.getElementById("phone").value;
    


    let namePattern=/^[A-Za-z]+$/;
    let emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let passwordPattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,16}$/;
    let Mobpattern=/^\d{10}$/;
    let mainalert=document.getElementById("mainalert");
    let alert_Message=document.getElementById("alertMessage");
    let alertname=document.getElementById("name_alert");
    let alertdate=document.getElementById("date_alert");
    let alertgender=document.getElementById("gender_alert");
    let alertmob=document.getElementById("mob_alert");
    let alertemail=document.getElementById("email_alert");
    let alertpassword=document.getElementById("password_alert");
    let alertCpassword=document.getElementById("Cpassword_alert");
    let alerts=document.querySelectorAll(".alert");
    
    // For removing that alert after it corrected we run that loop for each alert class elements which is given to personal ID also.
    alerts.forEach(alert => {
        alert.style.display = "none";
        alert.textContent = "";
    });

    //main alert box does not need loop becase it is for only one div has personal ID.
    mainalert.style.display = "none";
    mainalert.style.height = "0";
    

    if(fname===""||lname===""||email===""||password===""||confirmPassword===""||date===""||mobNo===""){
        mainalert.style.height="50px";
        mainalert.style.width="auto";
        mainalert.style.display="flex";
        mainalert.style.border="3px solid red";
        mainalert.style.color="red";
        mainalert.style.padding="10px";
        mainalert.style.backgroundColor="rgb(225, 135, 135)";
        alert_Message.textContent = "You have to fill all required details.";
        return false;
    }

    if(!gender){
        mainalert.style.height="50px";
        mainalert.style.width="auto";
        mainalert.style.display="flex";
        mainalert.style.border="3px solid red";
        mainalert.style.color="red";
        mainalert.style.padding="10px";
        mainalert.style.backgroundColor="rgb(225, 135, 135)";
        alert_Message.textContent = "You have to fill all required details.";
        alertgender.style.display="block";
        alertgender.textContent = "*Please enter a gender.*";
        return false;
    }

    if(!date){
        mainalert.style.height="50px";
        mainalert.style.width="auto";
        mainalert.style.display="flex";
        mainalert.style.border="3px solid red";
        mainalert.style.color="red";
        mainalert.style.padding="10px";
        mainalert.style.backgroundColor="rgb(225, 135, 135)";
        alert_Message.textContent = "You have to fill all required details.";
        alertdate.style.display="block";
        alertdate.textContent = "*Enter your Date of Birth.*";
        return false;
    }


    if (!namePattern.test(fname)||!namePattern.test(lname)){
        alertname.style.display="block";
        alertname.textContent = "*Name Should not contain digits.*";
        return false;
    }
    if (!emailPattern.test(email)){
        alertemail.style.display="block";
        alertemail.textContent = "*You had entered invalid email patten.*";
        return false;
    }

    if(!Mobpattern.test(mobNo)){
        alertmob.style.display="block";
        alertmob.textContent = "*Mobile Contains only 10 digits.*";
        return false;
    }

    if (!passwordPattern.test(password)){
        alertpassword.style.display="block";
        alertpassword.textContent = "*Password belongs to length ot 8-16 and Should contain both letters,numbers and a special character.*";
        return false;
    }
    if (password!==confirmPassword){
        mainalert.style.height="50px";
        mainalert.style.width="auto";
        mainalert.style.display="flex";
        mainalert.style.border="3px solid red";
        mainalert.style.color="red";
        mainalert.style.padding="10px";
        mainalert.style.backgroundColor="rgb(225, 135, 135)";
        alert_Message.textContent = "Password do not match.";
        alertCpassword.style.display="block";
        alertCpassword.textContent = "*Password do not match.*";
        return false;
    }


    fname = document.getElementById("firstname").value;
    sessionStorage.setItem("profileName", fname);
    return true;

}