import { Suspense } from "react";
import NavBar from "../components/navbar";

const Article = () => {

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <NavBar />
      </Suspense>
    </div>
  );
};

export default Article;