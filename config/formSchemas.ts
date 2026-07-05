export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "checkbox"
  | "image"
  | "file"
  | "select";

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: { label: string; value: string }[];
  helpText?: string;
}

// Adding a new field to any content type = add one entry here.
// The DynamicForm component reads this config and renders + validates automatically.

export const profileFields: FieldConfig[] = [
  { name: "name", label: "Full Name", type: "text", required: true },
  {
    name: "designation",
    label: "Designation",
    type: "text",
    required: true,
    placeholder: "e.g. Full Stack Developer",
  },
  { name: "availableForHire", label: "Available for Hire", type: "checkbox" },
  { name: "photoUrl", label: "Professional Photo", type: "image" },
  { name: "resumeUrl", label: "Resume (PDF)", type: "file" },
  {
    name: "aboutMe",
    label: "About Me",
    type: "textarea",
    required: true,
    helpText: "Your programming journey, what you enjoy, your personality.",
  },
  {
    name: "hobbies",
    label: "Hobbies & Interests",
    type: "textarea",
    placeholder: "e.g. Football, painting, gaming",
  },
];

export const skillFields: FieldConfig[] = [
  { name: "name", label: "Skill Name", type: "text", required: true },
  {
    name: "category",
    label: "Category",
    type: "select",
    required: true,
    options: [
      { label: "Frontend", value: "Frontend" },
      { label: "Backend", value: "Backend" },
      { label: "Database", value: "Database" },
      { label: "Tools", value: "Tools" },
      { label: "Other", value: "Other" },
    ],
  },
  {
    name: "level",
    label: "Proficiency (0-100)",
    type: "number",
    required: true,
    placeholder: "80",
  },
  { name: "order", label: "Display Order", type: "number" },
];

export const educationFields: FieldConfig[] = [
  { name: "institute", label: "Institute Name", type: "text", required: true },
  { name: "degree", label: "Degree", type: "text", required: true },
  { name: "fieldOfStudy", label: "Field of Study", type: "text" },
  { name: "startYear", label: "Start Year", type: "text", required: true },
  {
    name: "endYear",
    label: "End Year",
    type: "text",
    placeholder: "Leave blank if ongoing",
  },
  {
    name: "result",
    label: "Result",
    type: "text",
    placeholder: "e.g. CGPA: 3.93/4.00",
  },
  { name: "description", label: "Description", type: "textarea" },
  { name: "order", label: "Display Order", type: "number" },
];

export const experienceFields: FieldConfig[] = [
  { name: "company", label: "Company", type: "text", required: true },
  { name: "role", label: "Role", type: "text", required: true },
  { name: "companyLogoUrl", label: "Company Logo", type: "image" },
  {
    name: "location",
    label: "Location",
    type: "text",
    placeholder: "e.g. Dhaka, Bangladesh (Remote)",
  },
  {
    name: "startDate",
    label: "Start Date",
    type: "text",
    required: true,
    placeholder: "e.g. Jan 2024",
  },
  {
    name: "endDate",
    label: "End Date",
    type: "text",
    placeholder: "Leave blank for Present",
  },
  {
    name: "description",
    label: "Short Description",
    type: "textarea",
    helpText: "One or two lines about the role.",
  },
  {
    name: "responsibilities",
    label: "Responsibilities",
    type: "text",
    placeholder:
      "Built REST APIs, Led a team of 3, Improved load time by 40% (comma separated)",
  },
  { name: "order", label: "Display Order", type: "number" },
];

export const projectFields: FieldConfig[] = [
  { name: "name", label: "Project Name", type: "text", required: true },
  { name: "thumbnailUrl", label: "Project Image", type: "image" },
  {
    name: "shortDesc",
    label: "Short Description",
    type: "textarea",
    required: true,
    helpText: "Shown on the project card.",
  },
  {
    name: "fullDesc",
    label: "Full Description",
    type: "textarea",
    helpText:
      "Write 2–3 short lines: what the project is, its purpose, and who the target user is.",
  },
  {
    name: "keyFeatures",
    label: "Key Features",
    type: "text",
    placeholder:
      "Admin dashboard, Real-time chat, Payment integration (comma separated)",
  },
  {
    name: "techStack",
    label: "Tech Stack",
    type: "text",
    required: true,
    placeholder: "Next.js, PostgreSQL, Prisma (comma separated)",
  },
  { name: "liveLink", label: "Live Project Link (Demo)", type: "text" },
  { name: "githubLink", label: "GitHub Repository Link", type: "text" },
  { name: "challenges", label: "Challenges Faced", type: "textarea" },
  {
    name: "futurePlans",
    label: "Potential Improvements / Future Plans",
    type: "textarea",
  },
  { name: "featured", label: "Featured Project", type: "checkbox" },
  { name: "order", label: "Display Order", type: "number" },
];

export const socialLinkFields: FieldConfig[] = [
  {
    name: "platform",
    label: "Platform",
    type: "select",
    required: true,
    options: [
      { label: "GitHub", value: "github" },
      { label: "LinkedIn", value: "linkedin" },
      { label: "Twitter / X", value: "twitter" },
      { label: "Facebook", value: "facebook" },
      { label: "Other", value: "other" },
    ],
  },
  { name: "url", label: "Profile URL", type: "text", required: true },
  { name: "order", label: "Display Order", type: "number" },
];

export const contactFields: FieldConfig[] = [
  { name: "email", label: "Email Address", type: "text", required: true },
  { name: "phone", label: "Phone Number", type: "text" },
  { name: "whatsapp", label: "WhatsApp Number", type: "text" },
];

export const certificationFields: FieldConfig[] = [
  { name: "name", label: "Certification Name", type: "text", required: true },
  {
    name: "issuer",
    label: "Issuing Organization",
    type: "text",
    required: true,
  },
  {
    name: "issueDate",
    label: "Issue Date",
    type: "text",
    required: true,
    placeholder: "e.g. May 2023",
  },
  {
    name: "credentialUrl",
    label: "Credential Link",
    type: "text",
    placeholder: "Link to verify/view certificate",
  },
  { name: "imageUrl", label: "Certificate Image / Badge", type: "image" },
  { name: "order", label: "Display Order", type: "number" },
];

export const serviceFields: FieldConfig[] = [
  {
    name: "title",
    label: "Service Title",
    type: "text",
    required: true,
    placeholder: "e.g. Web App Development",
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    required: true,
    placeholder: "What you offer and how it helps the client.",
  },
  {
    name: "icon",
    label: "Icon",
    type: "select",
    options: [
      { label: "Code", value: "code" },
      { label: "Design", value: "design" },
      { label: "Server", value: "server" },
      { label: "Database", value: "database" },
      { label: "Mobile", value: "mobile" },
      { label: "Rocket", value: "rocket" },
      { label: "Bug fix", value: "bug" },
      { label: "Consulting", value: "chat" },
    ],
  },
  { name: "order", label: "Display Order", type: "number" },
];
