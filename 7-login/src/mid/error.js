export const errorFn = (error, req, res, next) => {
  switch (error.message) {
    case "Product already exist" || "Not Found":
      res.status(404);
      break;
    case "Some imput is empty":
      res.status(400);
      break;
    default:
      res.status(500);
  }

  res.json({ message: error.message });
};
