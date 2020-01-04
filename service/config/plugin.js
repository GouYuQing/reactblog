'use strict';

/** @type Egg.EggPlugin */
// module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
// };
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
// eslint-disable-next-line eol-last
};
exports.cors = {
  enable: true,
  package: 'egg-cors',
};
