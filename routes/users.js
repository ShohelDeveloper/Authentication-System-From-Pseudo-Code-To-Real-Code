const router = require('express').Router()
const userController = require('../controller/user')
/**
 * Get user by id or email
 */

router.get('/:userId', userController.getUserByID)

/**
 * Update user by id 
 */

router.put('/:userId', () => {})


/**
 * Update user by id 
 */
// Put & Patch is same, but we can update many items in patch route

router.patch('/:userId', userController.patchUserByID)
 

/**
 * Delete user by id
 */

router.delete('/:userId',userController.deleteUserByID)




/**
 * Get All Users, include
 *  - Filter
 *  - Sort
 *  - Pagination
 *  - Select Properties
 */

router.get('/', userController.getUsers)

/**
 * Create a new user 
 */
router.post('/', userController.postUser)



module.exports = router