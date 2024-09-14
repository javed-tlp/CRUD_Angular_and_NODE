const express=require('express')
const router=express.Router()
const controller=require('../controllers/user_controller')

router.post('/post',controller.postData)
router.get('/get',controller.getData)
router.get('/get/:id',controller.getDatabyid)
router.put('/update/:id',controller.updateData)
router.post('/delete/:id',controller.deleteData)

module.exports=router 