import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CursorDot } from "@/motion/CursorDot";
import { AcademicLayout } from "@/layouts/AcademicLayout";
import { FreelanceLayout } from "@/layouts/FreelanceLayout";
import Landing from "@/pages/Landing";
import NotFound from "@/pages/NotFound";
import AcademicOverview from "@/pages/academic/Overview";
import Education from "@/pages/academic/Education";
import AcademicProjects from "@/pages/academic/Projects";
import AcademicSkills from "@/pages/academic/Skills";
import FreelanceOverview from "@/pages/freelance/Overview";
import Work from "@/pages/freelance/Work";
import Services from "@/pages/freelance/Services";
import Contact from "@/pages/freelance/Contact";
const Blog = lazy(() => import("@/pages/freelance/Blog"));
const BlogPost = lazy(() => import("@/pages/freelance/BlogPost"));

function NoteFallback() {
  return (
    <p className="px-6 py-24 font-mono text-[12px] uppercase tracking-[0.16em] opacity-60">Opening the notebook…</p>
  );
}

const App = () => (
  <BrowserRouter>
    <CursorDot />
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/academic" element={<AcademicLayout />}>
        <Route index element={<AcademicOverview />} />
        <Route path="education" element={<Education />} />
        <Route path="projects" element={<AcademicProjects />} />
        <Route path="skills" element={<AcademicSkills />} />
      </Route>
      <Route path="/freelance" element={<FreelanceLayout />}>
        <Route index element={<FreelanceOverview />} />
        <Route path="work" element={<Work />} />
        <Route path="services" element={<Services />} />
        <Route path="contact" element={<Contact />} />
        <Route
          path="blog"
          element={
            <Suspense fallback={<NoteFallback />}>
              <Blog />
            </Suspense>
          }
        />
        <Route
          path="blog/:slug"
          element={
            <Suspense fallback={<NoteFallback />}>
              <BlogPost />
            </Suspense>
          }
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
