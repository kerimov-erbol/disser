// /* в этот файл добавляет скрипты*/
const loginLink =document.querySelector(".header__login-link");
const popupLoginOverlay = document.querySelector(".new-group-overlay");
const popupLogin = document.querySelector(".new-group-popup");


const displayStudentsBtn=document.querySelectorAll(".tutor-info__students-display")


const editinforLink =document.querySelector(".tutor-info__btn");
const editinforOverlay = document.querySelector(".editinfo-overlay");
const editinforLogin = document.querySelector(".editinfo-popup");





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
 




function getCookie(name) { 
   var re = new RegExp(name + "=([^;]+)"); 
   var value = re.exec(document.cookie); 
   return (value != null) ? unescape(value[1]) : null; 
 }



function popupFunction (btn,overlay,popup){

   btn.addEventListener("click",function(evn){
      console.log('works')
   evn.defaultPrevented

   overlay.classList.remove("visually-hidden");
   popup.classList.remove("visually-hidden");
   document.body.style.overflow="hidden"
   });

   overlay.addEventListener("click",function(){
   overlay.classList.add("visually-hidden");
   popup.classList.add("visually-hidden");
   document.body.style.overflow="auto"
   })


   // window.addEventListener("click",function(event){
   // console.dir(event.target)
   // })

}


popupFunction(editinforLink,editinforOverlay,editinforLogin)
popupFunction(loginLink,popupLoginOverlay,popupLogin)


function displayStuentList(btns){
 
      btns.forEach((btn)=>{
         btn.addEventListener("click",()=>{
            // fetch

         })
         
      })
}

function profeisonalProfile(item){

   const tutor=(item[0])
   console.log(tutor)
   document.querySelector('.header__link-list-inter-item').textContent = item[0].name+"'s Page";
      document.querySelector('.tutor-section__info-item-name').textContent = tutor.name;
      document.querySelector('.tutor-section__info-item-subjet').textContent =`Subject:  ${tutor.subject.subject}` ;
      document.querySelector('.tutor-info__img').src = `${tutor.img}`;
      document.querySelector('.tutor-section__info-item-experience').textContent = `Expirince:  ${tutor.experience}`;
      document.querySelector('.tutor-section__info-item-telno').textContent =`Number:  ${tutor.telnum}`;
      document.querySelector('.tutor-section__info-item-education').textContent =`Education:  ${tutor.education}`;
      document.querySelector('.tutor-section__info-item-about').textContent = tutor.about;
      document.querySelector('.editinfo__form').action = `api/user/updateprofile/${getCookie('Id')}`
      document.querySelector('.new-grup__form').action = `api/user/addgroup/${getCookie('Id')}`

      // document.querySelector('.item-description').textContent = item.description;



}


function deletegroup(){

   const deleteButtons = document.querySelectorAll('.btn-delete-group-unique');
    const popup = document.querySelector('.popup-overlay-custom-class');
    const confirmDelete = document.querySelector('.btn-confirm-delete-class');
    const cancelDelete = document.querySelector('.btn-cancel-delete-class');
    let groupIdToDelete = null;

    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            groupIdToDelete = button.getAttribute('data-group-id');
            popup.style.display = 'flex';
        });
    });

    cancelDelete.addEventListener('click', () => {
        popup.style.display = 'none';
        groupIdToDelete = null;
    });

    confirmDelete.addEventListener('click', () => {
        if (groupIdToDelete) {
            // Send AJAX request to delete the group from the database
            fetch(`api/user/gettallgrup/${groupIdToDelete}`, {
                method: 'DELETE'
            })
            .then(response => {
                popup.style.display = 'none';
                groupIdToDelete = null;
                location.reload() 

            })
            .catch(error => {
                console.error(`Error deleting group ${groupIdToDelete}:`, error);
                popup.style.display = 'none';
                groupIdToDelete = null;
            });
        } else {
            popup.style.display = 'none';
        }
    });
}





function editButtonActivator(groups){
   
   const editButtons =document.querySelectorAll(".tutor-info__btn-edit")
   const editGroupOverlay = document.querySelector(".edit-group-overlay");
   const editGroupLogin = document.querySelector(".edit-group-popup");
   const editGroupContainer = document.querySelector(".edit-group__container");
   console.log(editButtons)
   editButtons.forEach((button)=>{
      popupFunction(button,editGroupOverlay,editGroupLogin)
      button.addEventListener("click", () =>{

      editGroupContainer.innerHTML=` 
      <div class="edit-grup__container">
           
         <form class="edit-grup__form" method="post" action="api/user/updategroup/${button.getAttribute('data-groupId')}">
            <input class="new-grup__input" type="text" name="groupname"  placeholder="Grop name">
            <input class="new-grup__input" type="text" name="description"  placeholder="About group">
            <input class="new-grup__input" type="number" name="price"  placeholder="Price">
            <input class="new-grup__input" type="tel" name="adress"  placeholder="Adress">

            <div class="new-grup__week">
               <div class="new-grup__wrap">
                     <label class="new-grup__week-lable">Monday</label>
                     <input class="new-grup__week-input" type="time"name="mon">

               </div>
               <div  class="new-grup__wrap">
                     <label class="new-grup__week-lable" >Tusday </label>
               <input class="new-grup__week-input" type="time"  name="tue">

               </div>
               <div class="new_grup__separator"></div>
               <div  class="new-grup__wrap">
                     <label class="new-grup__week-lable" for="wen">Wensday </label>
               <input class="new-grup__week-input" type="time"  name="wen">

                     
               </div>
               <div  class="new-grup__wrap">
                     <label class="new-grup__week-lable" >Thursday </label>
               <input class="new-grup__week-input" type="time" name="thur">

               </div>
               <div  class="new-grup__wrap">
                     
               <label class="new-grup__week-lable" >Friday </label>
               <input class="new-grup__week-input" type="time" name="fri">

                     
               </div>
               <div  class="new-grup__wrap">
                     
               <label class="new-grup__week-lable" >Saturday</label>
               <input class="new-grup__week-input" type="time" name="sat">

               </div>
               <div  class="new-grup__wrap">
                     <label  class="new-grup__week-lable" >Sundaу</label>
                     <input class="new-grup__week-input" type="time"  name="sun">      
                     
               </div>

               
               
               
            </div>  
            <button type="submit">Edit group</button>
            <button type="button"  class="btn-delete-group-unique" data-group-id="${button.getAttribute('data-groupId')}">Delete group</button>
         </form>
         
            
      
      </div>`
      deletegroup()
      })
      








      
      
      
   })
}



function studentAnswerButton(){
   const editButtons =document.querySelectorAll(".student-answer-button-yes")
   const deletestudetButtons =document.querySelectorAll(".student-answer-button-no")



   editButtons.forEach((button)=>{
       button.addEventListener("click", () =>{
           console.log(button.getAttribute('data-groupid'))
           
           fetch(`/api/user/stuentacept/${button.getAttribute('data-groupid')}`, {
               method: 'POST'

           })
           .then(response => {
             
               location.reload() 

           }).catch(error => {
            console.log(error)
           });
 
  
       })
   
    })

    deletestudetButtons.forEach((button)=>{
      button.addEventListener("click", () =>{
          console.log(button.getAttribute('data-groupid'))
          
          fetch(`/api/user/stuentdelete/${button.getAttribute('data-groupid')}`, {
              method: 'DELETE'

          })
          .then(response => {
            
              location.reload() 

          }).catch(error => {
           console.log(error)
          });

 
      })
  
   })


}


function generatestudentlist(arrayOfObjects) {
   return arrayOfObjects.map(obj => `
   <div class="student-list-item">
      <div>
         ${obj.user.name}
         </div>
         <div>

         Tel-num: ${obj.user.telnum}
         </div>
         <div class="student-list__btn-wrap">
         ${obj.staus === true
         ? `<div class="student-is-acsepted" >Student is accepted</div>
            <button class="student-answer-button-no" data-groupId="${obj.id}">Delete</button>`
         : `<button class="student-answer-button-yes" data-groupId="${obj.id}">Accept</button>
            <button class="student-answer-button-no" data-groupId="${obj.id}">Decline</button>`
            
      }
      </div> 
   </div>
      `).join('');
}


function renderstuensts(groups){

   const container = document.querySelector('.student-list__container');
   container.innerHTML = groups;
}



function studentListrender(){
   const studentListButtons =document.querySelectorAll(".tutor-info__students-display")
   const editStudentspOverlay = document.querySelector(".student-list-overlay");
   const editstudentLogin = document.querySelector(".student-list-popup");
   studentListButtons.forEach((button)=>{
      popupFunction(button,editStudentspOverlay,editstudentLogin)
      button.addEventListener("click", (ev) =>{

         
         const getwatingStudents=fetch(`api/user/getstudents/${button.getAttribute('data-groupID')}`)
      .then(student=>student.json())
      // .then(student=>console.log(student))
      .then(student=>generatestudentlist(student))
      .then(student=>renderstuensts(student))
      .then(groups=>studentAnswerButton(groups))

      })
      

      





   })
}



function generateHTML(arrayOfObjects) {
   return arrayOfObjects.map(obj => `
   
   <div class="tutor-info__info-courses-item">
      <div class="tutor-info__info-courses-heading">
         Group: ${obj.groupname}
      </div>
       <div class="tutor-info__info-courses">
         ${obj.description}
      </div>
      <div class="tutor-info__info-courses-body">
         <div class="tutor-info__info-courses-name"></div>
         <div class="tutor-info__info-courses-schedule">
            Schedule: <br>

 
            Mon ${obj.mon===""?'--:--':obj.mon}
            Tus ${obj.tue===""?'--:--':obj.tue}<br>
            Wen ${obj.wen===""?'--:--':obj.wen}
            Thur${obj.thur===""?'--:--':obj.thur}<br>
            Fri ${obj.fri===""?'--:--':obj.fri}
            Sat ${obj.sat===""?'--:--':obj.sat}<br>
            Sun ${obj.sun===""?'--:--':obj.sun}
         </div>
         <div class="tutor-info__info-courses-adress">
            Adress:${obj.adress}
         </div>
         <div class="tutor-info__info-courses-adress">
            Price: ${obj.price}$
         </div>
      </div>
      <div class="tutor-info__btn-wrap">
         <button class="tutor-info__btn tutor-info__btn-edit" data-groupId="${obj.id}">Edit</button>
         <button class="tutor-info__btn tutor-info__students-display"data-groupId="${obj.id}">Studnets</button>
      </div>
   </div>
                        

     
   `).join('');
}


function renderGroups(groups){

   const container = document.querySelector('.tutor-info__info-courses-list');
   container.innerHTML = groups;
}

const getTutorInfor=fetch(`api/user/getinfo/${getCookie("Id")}`)
.then(tutor=>tutor.json()).then(tutor=>profeisonalProfile(tutor))

//l
const getAllgrups=fetch(`api/user/gettallgrups/${getCookie("Id")}`)
.then(groups=>groups.json())
.then(groups=>generateHTML(groups))
.then(groups=>renderGroups(groups))
.then(groups=>editButtonActivator(groups))
.then(studentListrender)





