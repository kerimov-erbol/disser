
function getCookie(name) { 
    var re = new RegExp(name + "=([^;]+)"); 
    var value = re.exec(document.cookie); 
    return (value != null) ? unescape(value[1]) : null; 
  }
 




function profeisonalProfile(item){

  // const student=(item[0])
  console.log(item)
  document.querySelector('.header__link-list-inter-item').textContent = item[0].name+"'s Page";

}



const getTutorInfor=fetch(`api/user/getstudent/${getCookie("Id")}`)
.then(student=>student.json()).then(student=>profeisonalProfile(student))






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







function generateHTML(arrayOfObjects) {
  return arrayOfObjects.map(obj => `
  
  <div class="user-cabinet-cours__item">
    <div class="user-cabinet-cours-tutor">${obj.user.name}</div>
    <div class="user-cabinet-cours-staus">${obj.applications.length==0?`Declined`:
      
      obj.applications[0].staus==true
      ? `Acsepted`
      : `Waitin for response`
         
   }</div>
   <div class="user-cabinet-cours-groupname">${obj.user.subject.subject}</div>
    <div class="user-cabinet-cours-groupname">${obj.groupname}</div>
    <div class="user-cabinet-cours__day">${obj.mon}</div>
    <div class="user-cabinet-cours__day">${obj.tue}</div>
    <div class="user-cabinet-cours__day">${obj.wen}</div>
    <div class="user-cabinet-cours__day">${obj.thur}</div>
    <div class="user-cabinet-cours__day">${obj.fri}</div>
    <div class="user-cabinet-cours__day">${obj.sat}</div>
    <div class="user-cabinet-cours__day">${obj.sun}</div>


</div>
                       

    
  `).join('');
}

function renderGroups(groups){

  const container = document.querySelector('.user-cabinet-cours__list');
  container.innerHTML = groups;
}





const getAllgrups=fetch(`api/user/gettallgroup`)
.then(groups=>groups.json())
// .then(groups=>console.log(groups))

.then(groups=>generateHTML(groups))
.then(groups=>renderGroups(groups))
// .then(groups=>editButtonActivator(groups))
// .then(studentListrender)