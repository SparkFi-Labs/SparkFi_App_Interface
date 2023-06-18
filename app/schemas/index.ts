import Joi from "joi";

export const binarySchema = Joi.binary().encoding("base64");
export const saleIPFSMetadataSchema = Joi.object({
  tokenImageURI: Joi.string()
    .uri({ scheme: ["https", "http", "git", /git\+https?/] })
    .required(),
  bannerURI: Joi.string()
    .uri({ scheme: ["https", "http", "git", /git\+https?/] })
    .required(),
  media: Joi.object({
    type: Joi.string().valid("image", "video").required(),
    uri: Joi.string()
      .uri({ scheme: ["https", "http", "git", /git\+https?/] })
      .required()
  }).optional(),
  description: Joi.string().min(20).required(),
  team: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        role: Joi.string().required(),
        socials: Joi.array()
          .items(
            Joi.object({
              linkedin: Joi.string()
                .uri()
                .pattern(/https:\/\/linkedin.com\/in\/\w+/)
                .optional(),
              twitter: Joi.string()
                .uri()
                .pattern(/https:\/\/twitter.com\/\w+/)
                .optional(),
              facebook: Joi.string()
                .uri()
                .pattern(/https:\/\/facebook.com\/\w+/)
                .optional(),
              telegram: Joi.string()
                .uri()
                .pattern(/https:\/\/t.me\/\w+/)
                .optional(),
              discord: Joi.string().uri().optional()
            })
          )
          .optional(),
        description: Joi.string().min(20).required()
      })
    )
    .optional(),
  links: Joi.array()
    .items(
      Joi.object({
        linkedin: Joi.string()
          .uri()
          .pattern(/https:\/\/linkedin.com\/in\/\w+/)
          .optional(),
        twitter: Joi.string()
          .uri()
          .pattern(/https:\/\/twitter.com\/\w+/)
          .optional(),
        facebook: Joi.string()
          .uri()
          .pattern(/https:\/\/facebook.com\/\w+/)
          .optional(),
        telegram: Joi.string()
          .uri()
          .pattern(/https:\/\/t.me\/\w+/)
          .optional(),
        discord: Joi.string().uri().optional(),
        website: Joi.string().uri().optional()
      })
    )
    .optional()
});
