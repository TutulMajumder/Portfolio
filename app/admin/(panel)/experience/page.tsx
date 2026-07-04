"use client";

import ResourceManager from "@/components/admin/ResourceManager";
import { experienceFields } from "@/config/formSchemas";

export default function ExperienceAdminPage() {
  return (
    <ResourceManager
      title="Experience"
      apiPath="/api/experience"
      fields={experienceFields}
      displayField="company"
      subDisplayField="role"
    />
  );
}
