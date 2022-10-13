const {
    addMinutes,
    isAfter
} = require('date-fns')
const AdminAttendance = require('../models/AdminAttendance')
const error = require('../util/error')

const getEnable = async (req, res, next) => {
    try {
        const running = await AdminAttendance.findOne({
            status: 'RUNNING'
        });
        if (running) {
            throw error('Already Running', 400)

        }


        const attendance = new AdminAttendance({
            timeLimit: 1
        })
        await attendance.save()
        return res.status(200).json({
            message: 'Success',
            attendance
        })
    } catch (e) {
        next(e)
    }
}

const getRunning = async (req, res, next) => {
    try {
        const running = await AdminAttendance.findOne({
            status: 'RUNNING'
        });
        if (!running) {
            throw error('Not Running', 400)
        }



        const started = addMinutes(
            new Date(running.createdAt),
            running.timeLimit
        )

        if (isAfter(new Date(), started)) {
            running.status = 'COMPLETED'
            await running.save()
        }
        return res.status(200).json(running)
    } catch (e) {
        next(e)
    }
}

const getDisable = async (req, res, next) => {
    try {
        const running = await AdminAttendance.findOne({
            status: 'RUNNING'
        });
        if (!running) {
            throw error('Not Running', 400)

        }
        running.status = 'COMPLETED'
        await running.save()

        return res.status(200).json(running)
    } catch (e) {
        next(e)
    }
}

module.exports = {
    getDisable,
    getEnable,
    getRunning
}