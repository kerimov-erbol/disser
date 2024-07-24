import jwt from "jsonwebtoken"

export function checktoken() {

    return function afaf(req, res, next,error) {


       if (req.method === "OPTIONS") {
        return res.redirect('/')
       }else{

            if(!token){
                
                return res.redirect('/loginpage.html')
            }else{

                try {
                    const token = req.cookies['Token']
                    const decoded=jwt.verify(token, process.env.SECRET_KEY)
                    next()
                } catch (e) {
                    return res.redirect('/loginpage.html')
                }
               

            }
            console.log(error)
       }
       
   };

}
// const token = req.cookies['Token']
