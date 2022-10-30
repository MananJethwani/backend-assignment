const validateEmail = (email) => {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const validateCredentials = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).send("All input are required");
    }

    if (!validateEmail(email)) {
      return res.status(400).send("Invalid Email Address");
    }
    next();
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

module.exports = validateCredentials;
