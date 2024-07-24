import { Router } from "express";
import UserController from "../controlers/userControllers.js";

const router = new Router


router.post('/api/user/registration',UserController.registration)
router.post('/api/user/login',UserController.login)
// router.get('/api/user/logout',UserController.logut)
router.get('/api/user/getinfo/:id',UserController.gettutor)
router.get('/api/user/getstudent/:id',UserController.getstudent)
router.get('/api/user/gettutorbysubjet/:id',UserController.gettutorbysubjet)
router.post('/api/user/updateprofile/:id',UserController.updateprofile)
router.post('/api/user/applytogrup/:id',UserController.applytogrup)
router.post('/api/user/stuentacept/:id',UserController.studentacept)
router.delete('/api/user/stuentdelete/:id',UserController.studentDelete)
router.post('/api/user/updategroup/:id',UserController.updategroup)
router.get('/api/user/getstudents/:group',UserController.getstudents)
router.post('/api/user/addgroup/:id',UserController.addgroup)
router.get('/api/user/gettallgrups/:id',UserController.gettallgrups)
router.get('/api/user/gettallgroup',UserController.gettausergrups)
router.delete('/api/user/gettallgrup/:id',UserController.deletegroup)

export default router
