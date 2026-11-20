import { Arrow } from "@/components/ui/arrow";
import { buttonClass } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export default function NotFound() {
  return (
    <section className="shell flex flex-col items-start py-32">
      <p className="eyebrow mb-5">404</p>
      <h1 className="display mb-10 text-[clamp(2.5rem,7vw,5.5rem)]">This page wandered off.</h1>
      {/* Plain anchor: "/" is the static language redirect, not a Next route. */}
      <a href={siteConfig.basePath + "/"} className={buttonClass()}>
        Back to home · 返回首页
        <Arrow />
      </a>
    </section>
  );
}
