import { Router } from 'express'
import { viewAllCityName } from '../controllers/city.js'
export const CityRouter = Router()
CityRouter.get('/viewcity', viewAllCityName)