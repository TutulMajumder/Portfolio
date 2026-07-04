"use client";

import ResourceManager from "@/components/admin/ResourceManager";
import { serviceFields } from "@/config/formSchemas";

export default function ServicesAdminPage() {
  return (
    <ResourceManager
      title="Services"
      apiPath="/api/services"
      fields={serviceFields}
      displayField="title"
      subDisplayField="description"
    />
  );
}