import { BusModel } from "../models/bus.js"

export async function HandleSpecificBus(req, res) {
    const { id } = req.params
    try {
        const bus = await BusModel.findById(id).populate("busDriverId")
        return res.status(200).json({ bus: bus })
    } catch (error) {
        return res.status(400).json({ data: "we cant provide this city details" })
    }
}


export async function filterBus(req, res) {
    const { source, destination, type } = req.query
    try {
        if (type !== "" && !undefined) {
            const filterBus = await BusModel.find({ source: source, destination: destination, type: type })
            return res.status(200).json({ data: "operation pass", filterBus: filterBus })

        } else {
            const filterBus = await BusModel.find({ source: source, destination: destination })
            return res.status(200).json({ data: "operation pass", filterBus: filterBus })
        }

    } catch (error) {
        return res.status(404).json({ data: "Data not found" })
    }
}