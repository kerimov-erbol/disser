const url = window.location.href;

// Create a URL object
const urlObject = new URL(url);

// Get the search parameters
const searchParams = new URLSearchParams(urlObject.search);

// Extract the 'id' parameter
const id = searchParams.get('id');





function profeisonalProfile(item){

    const tutor=(item[0])
    console.log(tutor)
 
       document.querySelector('.tutor-section__info-item-name').textContent = tutor.name;
       document.querySelector('.tutor-section__info-item-subjet').textContent =`Subject:  ${tutor.subject.subject}` ;
       document.querySelector('.tutor-info__img').src = `${tutor.img}`;
       document.querySelector('.tutor-section__info-item-experience').textContent = `Expirince:  ${tutor.experience}`;
       document.querySelector('.tutor-section__info-item-telno').textContent =`Number:  ${tutor.telnum}`;
       document.querySelector('.tutor-section__info-item-education').textContent =`Education:  ${tutor.education}`;
       document.querySelector('.tutor-section__info-item-about').textContent = tutor.about;
    
 
       // document.querySelector('.item-description').textContent = item.description;
 
 
 
 }







 function generateHTML(arrayOfObjects) {
    console.log(arrayOfObjects)
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
             Price :${obj.price}
          </div>
 
          <div class="tutor-info__info-courses-all-list">
             Students: 14 
          </div>
          <div class="tutor-info__info-courses-waitng-list">
             Waiteing: 12 
          </div>
       </div>
       <div class="tutor-info__btn-wrap">
          <button class="tutor-info__btn tutor-info__btn-apply" data-groupId="${obj.id}" > ${obj.applications.length==0?"Apply":obj.applications[0].staus.toString()=="true"?"You are in group":"Wating for response" }</button>
       </div>
    </div>
                         
      
    `).join('');
 }
//  

 function renderGroups(groups){

    const container = document.querySelector('.tutor-info__info-courses-list');
    container.innerHTML = groups;
 }





function applyButtno(){
    const editButtons =document.querySelectorAll(".tutor-info__btn-apply")




    editButtons.forEach((button)=>{
        button.addEventListener("click", () =>{
            console.log(button.getAttribute('data-groupid'))
            
            fetch(`/api/user/applytogrup/${button.getAttribute('data-groupid')}`, {
                method: 'POST'

            })
            .then(response => {
              
                location.reload() 

            }).catch(error => {
            });
  
   
        })
        
  
  
  
  
  
  
  
  
        
        
        
     })


}
const getTutorInfor=fetch(`api/user/getinfo/${id}`)
.then(tutor=>tutor.json()).then(tutor=>profeisonalProfile(tutor))


const getAllgrups=fetch(`api/user/gettallgrups/${id}`)
.then(groups=>groups.json())
.then(groups=>generateHTML(groups))
.then(groups=>renderGroups(groups))
.then(applyButtno)
// .then(studentListrender)
