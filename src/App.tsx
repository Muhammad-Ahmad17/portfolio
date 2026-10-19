import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import { SiteLayout } from "@/layouts/SiteLayout";
import { CursorDot } from "@/motion/CursorDot";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import Services from "@/pages/Services";
import Work from "@/pages/Work";

const Notes = lazy(() => import("@/pages/Notes"));
const Note = lazy(() => import("@/pages/Note"));

function NoteFallback() {
  return <p className="px-6 py-24 font-mono text-[12px] uppercase tracking-[0.16em] opacity-60">Opening the notebook…</p>;
}

function NoteRedirect() {
  const { slug = "" } = useParams();
  return <Navigate to={`/notes/${slug}`} replace />;
}

const App = () => (
  <BrowserRouter>
    <CursorDot />
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/notes"
          element={
            <Suspense fallback={<NoteFallback />}>
              <Notes />
            </Suspense>
          }
        />
        <Route
          path="/notes/:slug"
          element={
            <Suspense fallback={<NoteFallback />}>
              <Note />
            </Suspense>
          }
        />
      </Route>

      <Route path="/academic" element={<Navigate to="/about" replace />} />
      <Route path="/academic/education" element={<Navigate to="/about" replace />} />
      <Route path="/academic/skills" element={<Navigate to="/about" replace />} />
      <Route path="/academic/projects" element={<Navigate to="/work" replace />} />
      <Route path="/freelance" element={<Navigate to="/" replace />} />
      <Route path="/freelance/work" element={<Navigate to="/work" replace />} />
      <Route path="/freelance/services" element={<Navigate to="/services" replace />} />
      <Route path="/freelance/contact" element={<Navigate to="/contact" replace />} />
      <Route path="/freelance/blog" element={<Navigate to="/notes" replace />} />
      <Route path="/freelance/blog/:slug" element={<NoteRedirect />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
