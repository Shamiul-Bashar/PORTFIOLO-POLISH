import { redirect } from "next/navigation";

/** AcademicOS is now an upcoming project; preserve existing bookmarks. */
export default function AcademicOSRedirect() {
  redirect("/#upcoming-projects");
}
