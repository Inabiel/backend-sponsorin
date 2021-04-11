const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();

const verifySignUp = async (req, res) => {
  try {
    let { nama, email, notelpon, password } = req.body;
    const result = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (result) {
      return res.status(400).json({ success: false, msg: "Email telah ada!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) {
      return res
        .status(400)
        .json({ success: false, msg: "Ada Kesalahan di backend" });
    }
    const user = await prisma.user.create({
      data: {
        nama: nama,
        email: email,
        noTelpon: notelpon,
        password: hashedPassword,
      },
    });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, msg: "Ada Kesalahan di backend" });
    }

    return res
      .status(200)
      .json({ success: true, msg: "Succesfully registered to Sponsorin" });
  } catch (e) {
    console.log(e);
  }
};

const verifyLogIn = async (req, res) => {
  try {
    let { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        roles: true,
      },
    });
    if (!user) {
      return res.status(400).json({ success: false, msg: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, msg: "Password is wrong!" });
    }
    const token = await jwt.sign(
      {
        id: user.id,
        nama: user.nama,
        email: user.email,
        roles: user.rolesId,
        desc: user.deskripsi,
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: 86400, //24h expired
      }
    );
    return res.status(200).json({ success: true, jwt: token });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  verifySignUp,
  verifyLogIn,
};
