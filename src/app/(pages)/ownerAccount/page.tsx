// app/(pages)/ownerAccount/page.tsx
import { redirect } from "next/navigation"

export default function OwnerAccountPage() {
  redirect("/ownerAccount/dashboard")
}