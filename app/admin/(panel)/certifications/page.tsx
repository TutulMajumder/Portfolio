"use client";

import ResourceManager from "@/components/admin/ResourceManager";
import { certificationFields } from "@/config/formSchemas";

export default function CertificationsAdminPage() {
  return (
    <ResourceManager
      title="Certifications"
      apiPath="/api/certifications"
      fields={certificationFields}
      displayField="name"
      subDisplayField="issuer"
    />
  );
}