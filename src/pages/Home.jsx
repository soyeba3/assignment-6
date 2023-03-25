import React from "react";
import Posts from "../components/posts/Posts";
import Sort from "../components/sort/Sort";

const Home = () => {
  return (
    <section className="wrapper">
      <Sort />
      <Posts />
    </section>
  );
};

export default Home;
