const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({});
const jwt = require("jsonwebtoken");

let getAllEvent = async (req, res) => {
  try {
    let events = await prisma.event.findMany({
      select: {
        id: true,
        nama: true,
        deskripsi: true,
        createdAt: true,
        doneAt: true,
        startAt: true,
        finishAt: true,
        user: true,
        categories: true,
        eventImages: true,
        user: {
          select: {
            id: true,
            nama: true,
            email: true,
            noTelpon: true,
            avatar: true,
            deskripsi: true,
            roles: true,
          },
        },
      },
      where: {
        isDone: false,
      },
    });
    if (!events) {
      return res
        .status(400)
        .json({ success: false, msg: "error on our backend" });
    }
    return res.status(200).json({ success: true, data: events });
  } catch (e) {
    console.log(e);
  }
};

let getEventById = async (req, res) => {
  try {
    let { id } = req.params;
    let event = await prisma.event.findMany({
      where: {
        id: id,
      },
      select: {
        id: true,
        nama: true,
        deskripsi: true,
        proposal: true,
        alamat: true,
        isDone: true,
        createdAt: true,
        doneAt: true,
        startAt: true,
        finishAt: true,
        user: true,
        categories: true,
        eventImages: true,
        listKeperluan: true,
        user: {
          select: {
            id: true,
            nama: true,
            email: true,
            noTelpon: true,
            avatar: true,
            deskripsi: true,
            roles: true,
          },
        },
      },
      where: {
        isDone: false,
      },
    });
    if (!event) {
      return res
        .status(400)
        .json({ success: false, msg: "error on our backend" });
    }
    return res.status(200).json({ success: true, data: event });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getAllEvent,
  getEventById,
};
