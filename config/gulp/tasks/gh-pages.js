/* global app */
import ghpages from "gh-pages";

const deployGH = (cb) => {
  ghpages.publish(app.pathes.distFolder, (err) => {
    console.log(err);
  });

  cb();
};

export default deployGH;
