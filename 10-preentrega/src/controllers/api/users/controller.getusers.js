import { userRepository } from "../../../repositories/users.repository.js";

export async function getUsersController(req, res, next) {
  const users = await userRepository.findMany();
  res.json(users);
}