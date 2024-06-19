const express = require("express");
const fs = require("node:fs");
const { spawn } = require("child_process");
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const appPath = "./unirender-app-vue";
// const destinationFolder = "./components";

// const appFolderExists = fs.readdirSync(appPath);
// const componentFolderExists = fs.readdirSync(destinationFolder);

// if (!appFolderExists.length || !componentFolderExists.length) {
//   console.error(`Volumes error`);
//   // res.status(500).send(`Volumes error`);
//   return;
// }

app.post("/build", (req, res) => {
  const component = req.body.component;
  const version = req.body.version || 0;
  const format = req.body.format || "umd-min";
  const destination = req.body.destination || "dev";

  const stdout = [];
  const stderr = [];

  if (!component) {
    console.error(`No component to build`);
    res.status(500).send(`No component to build`);
    return;
  }

  const comm = spawn(
    `npx vue-cli-service build --target lib --formats ${format} --clean --dest ../components/${destination}/${component} --name ${component}-v${version} src/components/${component}.vue`,
    {
      shell: true,
      cwd: "unirender-app-vue",
    }
  );

  comm?.stdout?.on("data", (data) => {
    stdout.push(`${data}`);
  });

  comm?.stderr?.on("data", (data) => {
    stderr.push(`${data}`);
  });

  comm?.on("close", (code) => {
    if (code === 0) {
      res.status(200).send(stdout);
    } else {
      res.status(500).send(stderr);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
