import dynamic from "next/dynamic";
import { Suspense } from "react";
import NavBar from "../components/navbar";
import PageBody from "../components/homePageBody";

const Index = () => {
  const SocialLoginDynamic = dynamic(
    () => import("../components/scw").then((res) => res.default),
    {
      ssr: false,
    }
  );

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <NavBar />
        <SocialLoginDynamic />
        <PageBody />
      </Suspense>
    </div>
  );
};

export default Index;