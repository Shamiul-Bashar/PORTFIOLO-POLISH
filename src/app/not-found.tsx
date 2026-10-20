import Link from "next/link";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return <main className="not-found"><Container><p className="eyebrow">404 / NOT FOUND</p><h1>This page doesn’t exist.</h1><p>It might have been moved, or the link may be incorrect.</p><Link className="button-primary" href="/">Return home ↗</Link></Container></main>;
}
