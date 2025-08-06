import { Suspense } from 'react';
import { PortfolioPage } from "./portfolio-page-client";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PortfolioPage />
    </Suspense>
  );
}