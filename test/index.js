const cdnCache = require("../src");
const { AccessKeyID, AccessKeySecret } = process.env;
cdnCache(
  {
    AccessKeyID,
    AccessKeySecret,
  },
  {
    operateType: "refresh",
    objectPath: "http://cdn.alijam.top/",
  }
);
