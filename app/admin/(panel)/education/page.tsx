"use client";

import ResourceManager from "@/components/admin/ResourceManager";
import { educationFields } from "@/config/formSchemas";

export default function EducationAdminPage() {
  return (
    <ResourceManager
      title="Education"
      apiPath="/api/education"
      fields={educationFields}
      displayField="institute"
      subDisplayField="degree"
    />
  );
}
