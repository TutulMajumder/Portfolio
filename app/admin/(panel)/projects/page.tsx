"use client";

import ResourceManager from "@/components/admin/ResourceManager";
import { projectFields } from "@/config/formSchemas";

export default function ProjectsAdminPage() {
  return (
    <ResourceManager
      title="Projects"
      apiPath="/api/projects"
      fields={projectFields}
      displayField="name"
      subDisplayField="shortDesc"
    />
  );
}
