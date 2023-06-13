import { Suspense } from "react";
import NavBar from "../components/navbar";
import ArticleBodyContent from "../components/articleBodyContent";

const Article = () => {

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <NavBar />
        <ArticleBodyContent />
      </Suspense>
    </div>
  );
};

export default Article;