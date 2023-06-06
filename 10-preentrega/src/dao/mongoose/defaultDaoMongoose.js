function toPojo(object) {
  return JSON.parse(JSON.stringify(object));
}

function linker(str, apg, sel) {
  const arrstr = str.split(`page=${apg}`);
  const nextPage = arrstr[0].concat(`page=${apg + 1}`).concat(arrstr[1]);
  const prevPage = arrstr[0].concat(`page=${apg - 1}`).concat(arrstr[1]);
  if (sel === "prev") {
    return prevPage;
  } else if (sel === "next") {
    return nextPage;
  }
  throw new Error("invalid page");
}

export class DaoMongoose {
  #modelDb;
  constructor(mongooseModel) {
    this.#modelDb = mongooseModel;
  }

  async add(element) {
    console.log(element);
    const pojo = toPojo(await this.#modelDb.create(element));
    console.log(pojo);
    delete pojo._id;
    return pojo;
  }

  async findOne(condition) {
    const serched = await this.#modelDb
      .findOne(condition)
      .select({ _id: 0 })
      .lean();
    return serched;
  }

  async findOneById(condition) {
    const serched = await this.#modelDb
      .findOne({ id: condition })
      .select({ _id: 0 })
      .lean();
    if (!serched) throw new Error("Not Found");
    return serched;
  }

  //if you want to read all condition={}
  async findMany(condition) {
    const serched = await this.#modelDb
      .find(condition)
      .select({ _id: 0 })
      .lean();
    return serched;
  }

  async updateOne(condition, data) {
    const finder = await this.#modelDb.findOneById(condition);
    if (!finder) {
      throw new Error("Not Found");
    }
    const updated = await this.#modelDb
      .findByIdAndUpdate(finder._id, data)
      .lean();
    delete updated._id;
    return updated;
  }

  async updateMany(condition, data) {
    await this.#modelDb.updateMany(condition, data);
  }

  async deleteOne(condition) {
    const deleted = await this.#modelDb
      .findOneAndDelete({ id: condition }, { projection: { _id: 0 } })
      .lean();
    if (!deleted) throw new Error("NOT FOUND");
    delete deleted._id;
    return deleted;
  }

  async deleteMany(condition) {
    await this.#modelDb.deleteMany(condition);
  }

  //PAGINATION
  async getPaginatedElements(options, data) {
    const optDefault = {
      limit: options.limit || 10,
      page: options.page || 1,
      sort: { price: null },
      lean: true,
      projection: { _id: 0 },
    };

    const optQuery = {
      stock: { $gt: -1 },
    };

    for (const [key, value] of Object.entries(options)) {
      if (key !== "limit" && key !== "page" && key !== "sort")
        optQuery[key] = value;
      if (key === "sort" && (value === "asc" || value === "1")) {
        // @ts-ignore
        optDefault.sort.price = "ascending";
      } else if (key === "sort" && (value === "desc" || value === "-1")) {
        // @ts-ignore
        optDefault.sort.price = "descending";
      }
      if (key === "stock" && (value === "disp" || value === "1")) {
        optQuery.stock = { $gt: 0 };
      }
    }

    const result = await this.#modelDb.paginate(optQuery, optDefault);

    return {
      // @ts-ignore
      payload: result.docs,
      // @ts-ignore
      status: result.status_code,
      // @ts-ignore
      totalPages: result.totalPages,
      // @ts-ignore
      prevPage: result.prevPage,
      // @ts-ignore
      nextPage: result.nextPage,
      // @ts-ignore
      page: result.page,
      // @ts-ignore
      hasPrevPage: result.hasPrevPage,
      // @ts-ignore
      hasNextPage: result.hasNextPage,
      // @ts-ignore
      prevLink:
        // @ts-ignore
        result.hasPrevPage === false
          ? "Not Exist"
          : // @ts-ignore
            linker(data, result.page, "prev"),
      // @ts-ignore
      nextLink:
        // @ts-ignore
        result.hasNextPage === false
          ? "Not Exist"
          : // @ts-ignore
            linker(data, result.page, "next"),
    };
  }
}