const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const bigInt = require("big-integer");
const { isNil, isString, assign } = require("lodash");
const assert = require("assert");

require("dotenv").config();

// Global variables for zk computations
const p = bigInt("0x2527"); // 9511 to base 16
const q = bigInt("0x13D"); // Prime factor of p - 1
const t = bigInt("0xA"); // 10 to base 16
const g = bigInt[32]; // 7032 to base 16

function _computeZKChallenge() {
  return bigInt.randBetween(bigInt.zero, bigInt[2].pow(t.minus(1)));
}

function zkMiddleware(req, res, next) {
  try {
    const { zky, zkv, zkchallenge } = req.headers;
    assert.ok(!isNil(zky) && !isNil(zkv) && !isNil(zkchallenge), "critical headers not present in request");

    const zks = bigInt(zkv)
      .plus(bigInt(process.env.SECRET).times(bigInt(zkchallenge)))
      .mod(q);
    const w = g.pow(bigInt(zkv)).mod(p);
    const w2 = g
      .pow(zks)
      .times(bigInt(zky).pow(bigInt(zkchallenge)))
      .mod(p);

    assert.ok(w.equals(w2), "you cannot access this resource");

    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const tokenList = {
  84531: require("./swap/base-goerli-tokenlist.json"),
  8453: require("./swap/base-mainnet-tokenlist.json")
};

app.use(express.json());
app.use(require("morgan")("combined"));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/challenge", (req, res) => {
  try {
    const e = _computeZKChallenge();
    const result = "0x".concat(e.toString(16));
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

app.get("/tokenlist/:chainId", (req, res) => {
  try {
    const { chainId } = req.params;
    const parsedChainId = chainId.startsWith("0x") ? parseInt(chainId, 16) : parseInt(chainId);
    const result = tokenList[parsedChainId].sort((a, b) => (a.symbol < b.symbol ? -1 : a.symbol > b.symbol ? 1 : 0));
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

app.post("/update-whitelist", zkMiddleware, (req, res) => {
  try {
    const location = path.join(__dirname, "./.whitelist-store");

    if (!fs.existsSync(location)) fs.writeFileSync(location, Buffer.from(JSON.stringify({})).toString("hex"));

    const { whitelist, presaleId } = req.body;
    let fileContent = JSON.parse(Buffer.from(fs.readFileSync(location).toString(), "hex").toString());

    assert.ok(!isNil(whitelist), "whitelist not present in body");
    assert.ok(isString(whitelist), "whitelist must be a string");
    assert.ok(!isNil(presaleId), "presale id is required");
    assert.ok(isString(presaleId), "presale id must be required");

    fileContent = assign(fileContent, {
      [presaleId]: whitelist
    });

    fs.writeFileSync(location, Buffer.from(JSON.stringify(fileContent)).toString("hex"));

    return res.status(200).json({
      result: fileContent
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

app.get("/get-whitelist/:presaleId", zkMiddleware, (req, res) => {
  try {
    const { presaleId } = req.params;
    const location = path.join(__dirname, "./.whitelist-store");

    assert.ok(fs.existsSync(location), "whitelist file not found");

    const fileContent = JSON.parse(Buffer.from(fs.readFileSync(location).toString(), "hex").toString());
    const result = fileContent[presaleId];

    assert.ok(!isNil(result), "presale doesn't have a whitelist");

    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

app.listen(9700, () => console.log("Server is running"));
