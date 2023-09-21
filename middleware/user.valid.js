const Joi = require("joi");
let schema = Joi.object({
  name: Joi.string().required().min(3).max(10),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  repeat_password: Joi.ref("password"),
  age: Joi.number().min(16).max(50).required(),
});
module.exports.userValidation = (req, res, next) => {
  let errorArray = [];
  let { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    error.details.map((msg) => {
      errorArray.push(msg.message);
    });
    res.json(errorArray);
  } else {
    next();
  }
};
