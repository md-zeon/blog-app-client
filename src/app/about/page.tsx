import React from "react";

const AboutPage = async () => {
  await new Promise((resolve) => setTimeout(resolve, 4000));

  throw new Error("Something went wrong in the about page");
  return <div>About Page</div>;
};

export default AboutPage;
