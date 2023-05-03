export async function postSesiones(req, res, next) {
  res.sendStatus(201);
}

export async function deleteSesiones(req, res, next) {
  req.logout(async (err) => {
    res.sendStatus(200);
  });
}
