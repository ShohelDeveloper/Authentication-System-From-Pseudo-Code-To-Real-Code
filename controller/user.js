const User = require('../models/User')
const userService = require('../service/user')
const error = require('../util/error')
const authService = require('../service/auth')

const getUsers = async (req, res, next) => {

  try {
    const users = await userService.findUsers()
    return res.status(200).json(users)
  } catch (e) {
    next(e)
  }
}

const getUserByID = async (req, res, next) => {

  const userId = req.params.userId

  try {
    const user = await userService.findUserByProperty('_id', userId)

    if (!user) {
      throw error('User Not Found', 400)
    }

    return res.status(200).json(user)

  } catch (e) {
    next(e)
  }
}

const postUser = async (req, res, next) => {
  const {
    name,
    email,
    password,
    roles,
    accountStatus
  } = req.body;
  //  console.log(req.body)
  try {
    const user = await authService.registerService({
      name,
      email,
      password,
      roles,
      accountStatus
    })
    // console.log(user)
    return res.status(201).json(user)
  } catch (e) {
    next(e)
  }
}


const putUserByID = (req, res, next) => {}

const patchUserByID = async(req, res, next) => {

  const userId = req.params.userId
  const {
    name,
    roles,
    accountStatus
  } = req.body

  try {
    const user = await userService.findUserByProperty('_id', userId)
    
    if (!user) {
      throw error('User Not Found',404)
    }

    user.name = name ?? user.name
    user.roles = roles ?? user.roles
    user.accountStatus = accountStatus ?? user.accountStatus

    await user.save()
    return res.status(200).json(user)
  } catch (e) {
    next(e)
  }
}

const deleteUserByID = async (req, res, next) => {
  const userId = req.params.userId

  try {
    const user = await userService.findUserByProperty('_id', userId)

    if (!user) {
      throw error('User Not Found', 404)
    }

    user.remove()
    return res.status(203).send()
  } catch (e) {
    next(e)
  }
}

module.exports = {
  getUsers,
  getUserByID,
  postUser,
  putUserByID,
  patchUserByID,
  deleteUserByID

}