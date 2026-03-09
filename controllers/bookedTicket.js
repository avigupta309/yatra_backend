import { BookingModel } from "../models/booking.js";

export async function handleBookedTiicket(req, res) {
  const { busId, seat, userId, ticketAmount, useremail } = req.body;
  await BookingModel.create({
    user: userId,
    busId: busId,
    seats: seat,
    totalAmount: ticketAmount,
    useremail: useremail,
  });
  return res.status(200).json({ res: "ticket booked confirmed by server " });
}

export async function viewTicketDetails(req, res) {
  const {  userEmail } = req.body;
  const response = await BookingModel.find({ useremail: userEmail }).populate("busId");
  return res
    .status(201)
    .json({ res: "look this all ticket by server", ticketBooked: response });
}
