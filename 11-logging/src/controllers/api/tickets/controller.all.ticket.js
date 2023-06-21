import { ticketsRepository } from "../../../repositories/ticket.repository.js";
import { ticketService } from "../../../services/purchease.service.js";

export async function handlePost(req, res, next) {
  try {
    const ticket = await ticketService.createTicket(req.body);
    console.log(ticket);
    res.status(200).json(ticket);
  } catch (error) {
    next(error);
  }
}

export async function handleGet(req, res) {
  const ticket = await ticketsRepository.findOneById(req.params.id);
  return ticket;
}

export async function handlePut(req, res) {
}