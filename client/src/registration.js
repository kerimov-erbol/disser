
    document.querySelectorAll('.toggle-btn').forEach(button => {
        button.addEventListener('click', function() {
            const formToShow = this.getAttribute('data-form');
            
            document.querySelectorAll('.registration__form').forEach(form => {
                if (form.getAttribute('data-form') === formToShow) {
                    form.style.display = 'flex';
                } else {
                    form.style.display = 'none';
                }
            });
        });
    });





function getRawApplications(){
    const url = `api/user/getrawapplication`;
    
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json' // Specify the content type as JSON
        },
      };
      
      // Make the PUT request using fetch 
      fetch(url, options)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json(); // Parse the response as JSON
        })
        .then(data => {
            renderAppliactionList(data);
        })

        .catch(error => {
          console.error('There was a problem updating the data:', error);
        });
    }





getRawApplications()