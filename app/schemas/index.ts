import { isAddress } from "@ethersproject/address";
import Joi from "joi";
import { isNull } from "lodash";

// export const binarySchema = Joi.binary().encoding("base64");
export const ethereumAddressSchema = Joi.string()
  .custom((value, helpers) => {
    if (isNull(value) || typeof value === "undefined") return helpers.error("any.invalid");

    if (!isAddress(value)) throw new Error("invalid ethereum address");

    return value;
  }, "eth_address_validation")
  .required();
export const dateIsoSchema = Joi.date().iso();
export const validURISchema = Joi.string().uri().required();
export const saleIPFSMetadataSchema = Joi.object({
  name: Joi.string().required(),
  genre: Joi.string().required(),
  logoURI: Joi.string()
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
  links: Joi.object({
    linkedin: Joi.string().uri().optional(),
    twitter: Joi.string().uri().optional(),
    telegram: Joi.string().uri().optional(),
    discord: Joi.string().uri().optional(),
    website: Joi.string().uri().optional(),
    github: Joi.string().uri().optional(),
    gitbook: Joi.string().uri().optional(),
    medium: Joi.string().uri().optional()
  }).optional(),
  initialMarketCap: Joi.string().optional(),
  projectValuation: Joi.string().optional()
});
