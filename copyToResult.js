"use strict";
const fsPromise = require("fs/promises");
(async () => {
    await fsPromise.rm("./result", { recursive: true }).catch(() => { });
    await fsPromise.cp("./dist", "./result/dist", { force: true, preserveTimestamps: true, recursive: true }).catch(() => { });
    await fsPromise.cp("./image", "./result/image", { force: true, preserveTimestamps: true, recursive: true }).catch(() => { });
    await fsPromise.cp("./index.html", "./result/index.html", { force: true, preserveTimestamps: true, recursive: true }).catch(() => { });
})();