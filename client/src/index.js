const loginLink=document.querySelector(".login-link")
const registrationLink=document.querySelector(".registration-link")
const userCabinetLink=document.querySelector(".user-cabinet-link")
const tutorCabinetLink=document.querySelector(".tutor-cabinet-link")
const adminCabinetLink=document.querySelector(".admin-cabinet-link")
const logOut=document.querySelector(".log-out")
const subjectBtns=document.querySelectorAll(".tutor-section__filter-item")

function getCookie(name) { 
    var re = new RegExp(name + "=([^;]+)"); 
    var value = re.exec(document.cookie); 
    return (value != null) ? unescape(value[1]) : null; 
  }
  document.querySelector('.logoutBtn').addEventListener('click', () => {
    console.log('asfseafasefasefsafe')
    function clearAllCookies() {
        const cookies = document.cookie.split(";");
    
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        }
    }
    
    // Call the function to clear all cookies
    clearAllCookies();

    window.location.replace('/');

    
    
  });
  


  function disableLinks(){
    const links=document.querySelectorAll(".tutor-section__tutor-item-img-link")
    if(getCookie("Role")==undefined){
        links.forEach(link=>link.href="/login.html")
    
    }
    
    if(getCookie("Role")=='tutor'){
        links.forEach(link=>{link.href='#'})
      
    }
    if(getCookie("Role")=='student'){

      
    }
   
  }

console.log()
console.log(getCookie("Id"))

function reloadpg(){
    if(getCookie("Role")==undefined){
        userCabinetLink.classList.toggle("visually-hidden")
        tutorCabinetLink.classList.toggle("visually-hidden")
        adminCabinetLink.classList.toggle("visually-hidden")
        logOut.classList.toggle("visually-hidden")
    }
    
    if(getCookie("Role")=='tutor'){
        loginLink.classList.toggle("visually-hidden")
        registrationLink.classList.toggle("visually-hidden")
        userCabinetLink.classList.toggle("visually-hidden")
        adminCabinetLink.classList.toggle("visually-hidden")
    }
    if(getCookie("Role")=='student'){
        loginLink.classList.toggle("visually-hidden")
        registrationLink.classList.toggle("visually-hidden")
        tutorCabinetLink.classList.toggle("visually-hidden")
        adminCabinetLink.classList.toggle("visually-hidden")
    }
    
}
reloadpg()





// const getAllgrups=fetch(`api/user/gettallgrups/${getCookie("Id")}`)
// .then(groups=>groups.json())
// .then(groups=>generateHTML(groups))
// .then(groups=>renderGroups(groups))
// .then(groups=>editButtonActivator(groups))
// .then(studentListrender)



function generateHTML(arrayOfObjects) {
    return arrayOfObjects.map(obj => `
    
        <div class="tutor-section__tutor-item">
            <a class="tutor-section__tutor-item-img-link" href="tutor.html?id=${obj.id}"class="tutor-section__link">
                <img class="tutor-section__img" width="60px" height="60px" style="object-fit: cover;" src="${obj.img}" alt="">
            </a>
            <div class="tutor-section__tutor-item-info">
                <div class="tutor-section__info-item  tutor-section__info-item-name">
                    ${obj.name}
                </div>
                <div class="tutor-section__tutor-item-separator">
                    
                </div>

                <div class="tutor-section__info-item tutor-section__info-item-subject">
                    Subject: ${obj.subject.subject}
                </div>
                <div class="tutor-section__info-item tutor-section__info-item-expirience">
                    Expirience:   ${obj.experience}
                </div>
                <div class="tutor-section__info-item tutor-section__info-item-education">
                    Education:   ${obj.education}
                </div>
                <div class="tutor-section__tutor-item-separator">
                </div>
                <div class="tutor-section__info-item tutor-section__info-item-about">
                About:  
                </div>
                <div class="tutor-section__info-item tutor-section__info-item-about">
                ${obj.about} 
                </div>
            </div>
        </div>
                         
 
      
    `).join('');
 }


function renderGroups(tutors){

    const container = document.querySelector('.tutor-section__tutor-list');
    container.innerHTML = tutors;
 }
 


subjectBtns.forEach((btn)=>{
    btn.addEventListener("click",()=>{

        const getTutuorbySuject=fetch(`api/user/gettutorbysubjet/${btn.getAttribute("data-subjetId")}`)
        .then(tutors=>tutors.json())
        // .then(tutors=>console.log(tutors))
        .then(tutors=>generateHTML(tutors))
        .then(tutors=>renderGroups(tutors))
        .then(disableLinks)

    })
    
 })
 