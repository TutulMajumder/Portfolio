import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import config from "../config";

const adapter = new PrismaPg({ connectionString: config.database_url });
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminEmail = config.admin_email;
  const adminPassword = config.admin_password;

  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await prisma.adminUser.create({
      data: { email: adminEmail, passwordHash },
    });
    console.log(`Admin user created: ${adminEmail}`);
  } else {
    console.log("Admin user already exists, skipping.");
  }

  const existingProfile = await prisma.profile.findFirst();
  if (!existingProfile) {
    await prisma.profile.create({
      data: {
        name: "Your Name",
        designation: "Full Stack Developer",
        aboutMe:
          "I'm a developer who loves turning ideas into working software. Update this from the admin panel at /admin/profile.",
        hobbies: "Football, reading, exploring new tech.",
      },
    });
    console.log("Sample profile created.");
  }

  const skillCount = await prisma.skill.count();
  if (skillCount === 0) {
    await prisma.skill.createMany({
      data: [
        { name: "React", category: "Frontend", level: 85, order: 1 },
        { name: "Next.js", category: "Frontend", level: 80, order: 2 },
        { name: "Node.js", category: "Backend", level: 80, order: 1 },
        { name: "PostgreSQL", category: "Database", level: 75, order: 1 },
        { name: "Git", category: "Tools", level: 85, order: 1 },
      ],
    });
    console.log("Sample skills created.");
  }

  const projectCount = await prisma.project.count();
  if (projectCount === 0) {
    await prisma.project.createMany({
      data: [
        {
          name: "Sample Project One",
          slug: "sample-project-one",
          shortDesc: "A short description of your first project.",
          fullDesc:
            "A longer description of what this project does and why you built it.",
          techStack: ["Next.js", "PostgreSQL", "Tailwind CSS"],
          challenges: "Describe a challenge you faced building this.",
          futurePlans: "Describe what you'd improve or add next.",
          order: 1,
        },
        {
          name: "Sample Project Two",
          slug: "sample-project-two",
          shortDesc: "A short description of your second project.",
          fullDesc:
            "A longer description of what this project does and why you built it.",
          techStack: ["React", "Node.js", "MongoDB"],
          order: 2,
        },
        {
          name: "Sample Project Three",
          slug: "sample-project-three",
          shortDesc: "A short description of your third project.",
          fullDesc:
            "A longer description of what this project does and why you built it.",
          techStack: ["TypeScript", "Express"],
          order: 3,
        },
      ],
    });
    console.log(
      "Sample projects created — edit or delete these from /admin/projects.",
    );
  }

  const contactExists = await prisma.contactInfo.findFirst();
  if (!contactExists) {
    await prisma.contactInfo.create({
      data: { email: "you@example.com" },
    });
    console.log("Sample contact info created.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
