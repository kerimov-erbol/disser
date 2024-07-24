import {Application, Group, Subject, User}  from '../dataBaseMoedls.js'
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { BOOLEAN } from 'sequelize';


function genearateJwt(id, email, role){
    return jwt.sign(
        {id, email, role },
        process.env.SECRET_KEY,
        {expiresIn:"10h"}
    )

}









class UserController{

    async registration(req,res){
        const {subject,name,email,password,telnum,role,} = req.body

            console.log(req.body)

        const candidate =await User.findOne({where:{email}})
        if(candidate){
            return res.send("email уже есть")
            // return next(ApiError.badRequest("email уже есть"))
        }

        const hachpassword=await bcrypt.hash(password,5)
        const user= await User.create({name,email,password:hachpassword,telnum,role,subjectId:subject})
        const token =genearateJwt(user.id, email, user.role)


        res.cookie('Token', token);
        res.cookie('Role',user.role);
        res.cookie('Id', user.id);
        return res.redirect('/')


        
    }
    async login(req,res){
        try {

            let {email, password} = req.body
            const user =await User.findOne({where:{email}})
            if(!user){
                // return next(ApiError.badRequest("User not found"))
                return res.redirect('/login.html')
            }
            let comparepassword = await bcrypt.compare(password, user.password)
            if(!comparepassword){
                return res.redirect('/login.html')
                // return next(ApiError.badRequest("Wrong password"))
            } 
            const token=genearateJwt(user.id, user.email, user.role)
            res.cookie('Token', token);
            res.cookie('Role',user.role);
            res.cookie('Id', user.id);
            return res.redirect('/')
        
            
        } catch (e) {
            console.log(e)
            
        }
       
    }
    async auth(req,res){

       
    }
    async logut(req,res){
        try {
            res.clearCookie('Token');
            res.clearCookie('Role');
            res.clearCookie('Id');
            res.redirect('/')
        } catch (error) {
            console.log(error)
        }
        
  
    }

    async gettutor(req,res,next){
            
        try {
            const id = req.params.id.replace(":", "")
            const user = await User.findAll({
                where: {
                    id: id
                },
                attributes: {
                    exclude: ['password']
                },
                include: [
                    {
                        model: Subject,
                        required: true,
                    }
                ]
            });
            

            res.send(JSON.stringify(user, null, 2))

        }catch (e) {
            console.log(e)
        }
    }


    async getstudent(req,res,next){
            
        try {
            const id = req.params.id.replace(":", "")
            const user = await User.findAll({
                where: {
                    id: id
                },
                attributes: {
                    exclude: ['password']
                },
            });
            

            res.send(JSON.stringify(user, null, 2))

        }catch (e) {
            console.log(e)
        }
    }


    async gettutorbysubjet(req,res){
        const subjectid = req.params.id.replace(":", "");
            
        try {
            const id = req.params.id.replace(":", "")
            const user = await User.findAll({
                attributes: {
                    exclude: ['password']
                },
                include: [
                    {
                      model: Subject,
                      required: true,
                      where:{id:subjectid},
                    }
                  ]
            });

            res.send(JSON.stringify(user, null, 2))

        }catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }


    


    async updateprofile(req, res,) {
        try {
        var userid = req.params.id.replace(":", "");
        var { img } = req.files || {}; // Ensure req.files is defined
        let { experience, education, about, name} = req.body;

        let updateData = {};
        if (name) updateData.name = name;
        if (experience) updateData.experience = experience;
        if (education) updateData.education = education;
        if (about) updateData.about = about;

        if (img) {
            // Image uploaded
            console.log('Image uploaded');
            var fileName = uuidv4() + ".jpg";
            img.mv(path.resolve('wwwroot','..','static', fileName)); // Ensure 'static' directory is correctly resolved
            updateData.img = fileName;
        }

        if (Object.keys(updateData).length === 0) {
            return res.status(400).send({ message: 'No data provided for update' });
        }

        await User.update(updateData, {
            where: {
                id: userid,
            },
        });

        // res.status(200).send({ message: 'Profile updated successfully' });
        res.redirect('/tutor-cabinet.html')
        } catch (error) {
            console.error('Error updating profile:', error);
            res.status(500).send({ message: 'An error occurred while updating the profile' });
        }
    }

    async addgroup(req, res) {
        try {
            var userid = req.params.id.replace(":", "");
            const {groupname,description,price,adress,mon,tue,wen,thur,fri,sat,sun}=req.body
            console.log(groupname,description,price,adress,mon,tue,wen,thur,fri,sat,sun)
            const user= await Group.create({groupname,description,price,adress,mon,tue,wen,thur,fri,sat,sun,userId:userid})
            res.redirect('/tutor-cabinet.html')
        } catch (error) {
            res.send(error)
            
        }
   }
   async gettallgrups(req, res) {
    try {
        var id = req.params.id.replace(":", "");
        const user = req.cookies['Id']
        
       const grups= await Group.findAll({
        where: {
            userId:id
        },include: [
            {
                model: Application,
                required: false,
                where:{userId:user}
            }
        ]
    });

       res.send(JSON.stringify(grups, null, ))
    //    res.send("ok")
        } catch (error) {
            res.send(error)
            
        }
    }


    
    async  gettausergrups(req, res) {
        try {
            const userId = req.cookies['Id'];
            
            const groups = await Group.findAll({
                include: [
                    {
                        model: Application,
                        required: true,
                        where: { userId: userId }
                    },
                    {
                        model: User,
                        attributes: {
                            exclude: ['password']
                        },
                        include: [
                            {
                                model: Subject
                            }
                        ]
                    }
                ]
            });
            
            
    
            res.json(groups);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
    








    async updategroup(req, res) {
       

            try {
                const groupid = req.params.id.replace(":", "");
                const { groupname, description, price, adress, mon, tue, wen, thur, fri, sat, sun } = req.body;
                console.log(groupid)
                let updateData = {};
    
                if (groupname) updateData.groupname = groupname;
                if (description) updateData.description = description;
                if (price) updateData.price = price;
                if (adress) updateData.adress = adress;
                updateData.mon = mon;
                updateData.tue = tue;
                updateData.wen = wen;
                updateData.thur = thur;
                updateData.fri = fri;
                updateData.sat = sat;
                updateData.sun = sun;
    
                if (Object.keys(updateData).length === 0) {
                    return res.status(400).send({ message: 'No data provided for update' });
                }

                const updatedGroup = await Group.update(updateData, {
                    where: {
                        id: groupid,
                    },
                });

                if (updatedGroup[0] === 0) { // No rows updated
                    return res.status(404).send({ message: 'Group not found' });
                }
                res.redirect('/tutor-cabinet.html')
                // res.send(JSON.stringify(updatedGroup, null, 2));
            } catch (error) {
                res.status(500).send({ message: 'Error updating group', error: error.message });
            }

        }

        


        async deletegroup(req, res) {
           
    
            try {
    
                const groupid = req.params.id.replace(":", "");
                await Group.destroy({
                    where: {
                      id:groupid,
                    },
                  });
                res.send("ok")
             
                // res.send(JSON.stringify(updatedGroup, null, 2));
            } catch (error) {
                res.status(500).send({ message: 'Error updating group', error: error.message });
            }

        }


        async applytogrup(req, res) {
            try {
                const groupid = req.params.id.replace(":", "");
                const user = req.cookies['Id']
                await Application.find
                const candidate = await Application.findOne({
                    where: {
                      userId: user,
                      groupId: groupid
                    }
                  });
                  
                  if (candidate) {
                    return res.send("already exists");
                  } else {
                    const application = await Application.create({ userId: user, groupId: groupid });
                  }



                res.send("ok")
             
                // res.send(JSON.stringify(updatedGroup, null, 2));
            } catch (error) {
                // res.status(500).send({ message: 'Error updating group', error: error.message });
            }

        }
    

        async studentacept(req, res) {
            try {
                const appid = req.params.id.replace(":", "");
                console.log(appid)
                
                const candidate = await Application.findOne({
                    where: {
                        id: appid,
                    }
                });
                // console.log(candidate)
                
            
                if (candidate) {
                    const candidate = await Application.update(
                        { staus: true },
                        {
                            where: {
                                id: appid,
                            }
                        }
                    );
                    console.log(candidate)
                    res.send("ok");
                } else {
                    res.status(404).send("Application not found");
                }
            } catch (error) {
                res.status(500).send("Internal Server Error");
            }
            

        }



        async studentDelete(req, res) {
            try {
                const appid = req.params.id.replace(":", "");
                console.log(appid);
                
                const candidate = await Application.findOne({
                    where: {
                        id: appid, // Use appid instead of id
                    }
                });
                console.log(candidate)
                    await Application.destroy({
                        where: {
                          id:appid,
                        },
                      });
                    res.send("ok");

        
            } catch (error) {
                console.error(error); // Log the error for debugging
                res.status(500).send("Internal Server Error");
            }
        }
        





        async getstudents(req, res) {
            try {
                const groupid = req.params.group.replace(":", "");
                await Application.find
                const candidate = await Application.findAll({
                    where: {
                      groupId: groupid
                    },include: [
                        {
                            model: User,
                            required: true,
                            attributes: {
                                exclude: ['password']
                            },
                        }
                    ]
                  });
                  


                  res.send(JSON.stringify(candidate, null, 2))
             
                // res.send(JSON.stringify(updatedGroup, null, 2));
            } catch (error) {
                // res.status(500).send({ message: 'Error updating group', error: error.message });
            }

        }

        

        

}


export default new UserController()
