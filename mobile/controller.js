import { BusModel } from "../models/bus.js ";

export async function insertLatLng(req, res) {
  const { driverId, latitude, longitude } = req.body;
  try {
    const bus = await BusModel.findOne({ busDriverId: driverId });
    if (!bus) {
      return res.status(400).json({ message: "Bus Not Found" });
    }
    const busId = bus._id;
    const newUpdatedBus = await BusModel.findByIdAndUpdate(
      { _id: busId },
      { $set: { latitude, longitude } },
      { new: true, runValidators: true },
    );
    console.log(newUpdatedBus);
    return res.status(201).json({ message: "updates sucessfully" });
  } catch (error) {
    return res.status(400).json({ message: "cannot updated latLng" });
  }
}

export async function reveiveLatLng(req, res) {
  const { id } = req.query;
  try {
    const latlng = await BusModel.findById(id);
    return res
      .status(200)
      .json({
        message: "Your Are Here",
        latitude: latlng.latitude,
        longitude: latlng.longitude,
      });
  } catch (error) {
    return res.status(400).json({ message: "cannot fetch latLng" });
  }
}
