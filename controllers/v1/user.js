const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const multer = require("multer");

const editRole = async (req, res) => {
  try {
    let { id } = req.user;
    let { role } = req.body;
    console.log(role);

    const gantiRole = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        rolesId: role,
      },
    });
    if (!gantiRole) {
      return res
        .status()
        .json({ success: true, msg: "Internal Server error..." });
    }
    const token = await jwt.sign(
      {
        id: gantiRole.id,
        nama: gantiRole.nama,
        email: gantiRole.email,
        roles: gantiRole.rolesId,
        desc: gantiRole.deskripsi,
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: 86400, //24h expired
      }
    );
    return res.status().json({ success: true, msg: token });
  } catch (e) {
    console.log(e);
  }
};

const editDeskripi = async (req, res) => {
  try {
    let { deskripsi } = req.body;
    let { id } = req.user;
    console.log(id);
    const gantiDeskripsi = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        deskripsi: deskripsi,
      },
    });
    console.log(gantiDeskripsi);
    if (!gantiDeskripsi) {
      return res
        .status()
        .json({ success: true, msg: "Internal Server error..." });
    }
    const token = await jwt.sign(
      {
        id: gantiDeskripsi.id,
        nama: gantiDeskripsi.nama,
        email: gantiDeskripsi.email,
        roles: gantiDeskripsi.rolesId,
        desc: gantiDeskripsi.deskripsi,
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: 86400, //24h expired
      }
    );
    return res.status().json({ success: true, msg: token });
  } catch (e) {
    console.log(e);
  }
};

const changePassword = async (req, res) => {
  try {
    let { id } = req.user;
    let { oldpassword, newpassword } = req.body;
    const isPasswordValid = await bcrypt.compare(
      oldpassword,
      findUser.password
    );
    if (!isPasswordValid) {
      return res
        .status(403)
        .json({ success: false, msg: "password is not the same" });
    }
    const hashedPassword = await bcrypt.hash(newpassword, 10);
    const updatePassword = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        password: hashedPassword,
      },
    });
    if (!updatePassword) {
      return res
        .status(400)
        .json({ success: false, msg: "update password is not succesful" });
    }
    return res
      .status(200)
      .json({ success: true, msg: "password has been updated" });
  } catch (e) {
    console.log(e);
  }
};
const editAvatar = async (req, res) => {
  let folderName = req.user;
  let avatar = req.avatar;
  if (!avatar) {
    const storage = multer.diskStorage({
      destination: `../../uploads/${folderName}`,
      filename: (req, file, cb) => {
        cb(null, `${folderName}-avatar.jpg`);
      },
    });
  }
};

const getUserById = async (req, res) => {
  try {
    let { id } = req.params;
    let userDetail = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        nama: true,
        email: true,
        noTelpon: true,
        avatar: true,
        deskripsi: true,
        roles: {
          select: {
            nama: true,
            deskripsi: true,
          },
        },
      },
    });
    console.log(userDetail);
    if (!userDetail) {
      return res
        .status(400)
        .json({ success: false, msg: "Error on our backend" });
    }
    return res.status(200).json({ success: true, data: userDetail });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  editRole,
  editDeskripi,
  changePassword,
  getUserById,
};
