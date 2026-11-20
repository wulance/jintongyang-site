import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="shell flex flex-col items-start py-32">
      <p className="eyebrow mb-5">404</p>
      <h1 className="display mb-10 text-[clamp(2.5rem,7vw,5.5rem)]">This page wandered off.</h1>
      <ButtonLink href="/">Back to home · 返回首页</ButtonLink>
    </section>
  );
}
