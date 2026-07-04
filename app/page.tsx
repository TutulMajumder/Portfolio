import { prisma } from "@/lib/prisma";
import Navbar from "@/components/public/Navbar";
import Hero from "@/components/public/Hero";
import About from "@/components/public/About";
import Skills from "@/components/public/Skills";
import Projects from "@/components/public/Projects";
import Education from "@/components/public/Education";
import Experience from "@/components/public/Experience";
import Certifications from "@/components/public/Certifications";
import Services from "@/components/public/Services";
import Contact from "@/components/public/Contact";
import Footer from "@/components/public/Footer";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [
    profile,
    skills,
    education,
    experience,
    projects,
    certifications,
    services,
    socialLinks,
    contact,
  ] = await Promise.all([
    prisma.profile.findFirst(),
    prisma.skill.findMany({ orderBy: { order: "asc" } }),
    prisma.education.findMany({ orderBy: { order: "asc" } }),
    prisma.experience.findMany({ orderBy: { order: "asc" } }),
    prisma.project.findMany({ orderBy: { order: "asc" } }),
    prisma.certification.findMany({ orderBy: { order: "asc" } }),
    prisma.service.findMany({ orderBy: { order: "asc" } }),
    prisma.socialLink.findMany({ orderBy: { order: "asc" } }),
    prisma.contactInfo.findFirst(),
  ]);

  const name = profile?.name || "";

  return (
    <>
      <Navbar name={name} resumeUrl={profile?.resumeUrl} />
      <Hero
        name={name}
        designation={profile?.designation || ""}
        photoUrl={profile?.photoUrl}
        resumeUrl={profile?.resumeUrl}
        availableForHire={profile?.availableForHire}
        socialLinks={socialLinks}
      />
      <About aboutMe={profile?.aboutMe || "About section coming soon."} hobbies={profile?.hobbies} />
      <Skills skills={skills} />
      <Services items={services} />
      <Projects items={projects} />
      <Education items={education} />
      <Experience items={experience} />
      <Certifications items={certifications} />
      <Contact email={contact?.email} phone={contact?.phone} whatsapp={contact?.whatsapp} />
      <Footer name={name} />
    </>
  );
}