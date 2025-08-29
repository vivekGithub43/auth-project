const Joi = require('joi');

exports.signUpSchema = Joi.object({
    name:Joi.string().min(2).max(50).required(),
    email:Joi.string().min(6)
    .max(60)
    .required()
    .email({
        tlds:{allow:['com','net']}
    }),
    password:Joi.string().required()
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$'))
})

exports.signinSchema = Joi.object({
    email:Joi.string().min(6)
    .max(60)
    .required()
    .email({
        tlds:{allow:['com','net']}
    }),
    password:Joi.string().required()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$'))
})
exports.acceptCodeSchema = Joi.object({
     email:Joi.string().min(6)
    .max(60)
    .required()
    .email({
        tlds:{allow:['com','net']}
    }),
    providedCode : Joi.number().required(),
})

exports.changePasswordSchema = Joi.object({
    newPassword : Joi.string()
    .required()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$')),
    oldPassword:Joi.string()
    .required()
     .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$'))
})
exports.acceptFPCodeSchema = Joi.object({
	email: Joi.string()
		.min(6)
		.max(60)
		.required()
		.email({
			tlds: { allow: ['com', 'net'] },
		}),
	providedCode: Joi.number().required(),
	newPassword: Joi.string()
		.required()
		.pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$')),
});
exports.createPostSchema = Joi.object({
  title: Joi.string().min(3).max(60).required().messages({
    "any.required": "title is required",
    "string.empty": "title cannot be empty",
    "string.min": "title should have at least 3 characters",
    "string.max": "title should not exceed 60 characters"
  }),
  description: Joi.string().min(3).max(600).required().messages({
    "any.required": "description is required",
    "string.empty": "description cannot be empty"
  })
});
exports.updatePostSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});