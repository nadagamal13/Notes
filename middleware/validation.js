const Joi = require("joi");
let methods = ["body", "params"];
let schema = {
  body: Joi.object({
    name: Joi.string().required().min(3).max(10),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    repeat_password: Joi.ref("password"),
    age: Joi.number().min(16).max(50).required(),
  }),
  params: Joi.object({
    id: Joi.string().required().min(4).max(4),
  }),
};
module.exports.validation = (req, res, next) => {
  let errorArray = [];
  methods.map((key) => {
    let { error } = schema[key].validate(req[key], { abortEarly: false });
    if (error) {
      error.details.map((msg) => {
        errorArray.push(msg.message);
      });
      res.json(errorArray);
    } else {
      next();
    }
  });
};
