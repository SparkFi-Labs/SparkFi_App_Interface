import { isAddress } from "@ethersproject/address";
import Joi from "joi";
import { isNil } from "lodash";

// export const binarySchema = Joi.binary().encoding("base64");
export const ethereumAddressSchema = Joi.string()
  .custom((value, helpers) => {
    if (isNil(value)) return helpers.error("any.invalid");

    if (!isAddress(value)) throw new Error("invalid ethereum address");

    return value;
  }, "eth_address_validation")
  .required();
export const dateIsoSchema = Joi.date().iso();
export const validURISchema = Joi.string().uri().required();
export const validNumberSchema = (name: string) => Joi.number().label(name).greater(0).required();
export const saleIPFSMetadataSchema = Joi.object({
  name: Joi.string().required(),
  genre: Joi.string().required(),
  projectLogoURI: Joi.string()
    .uri({ scheme: ["https", "http", "git", /git\+https?/] })
    .required(),
  tokenLogoURI: Joi.string()
    .uri({ scheme: ["https", "http", "git", /git\+https?/] })
    .required(),
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
  projectValuation: Joi.string().optional(),
  team: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        role: Joi.string().required(),
        description: Joi.string().required()
      })
    )
    .required(),
  tokenomics: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        value: Joi.number().max(100),
        description: Joi.string().allow(" ").optional()
      })
    )
    .required(),
  roadmap: Joi.string().required(),
  softcap: Joi.number().optional()
});
