import { LogoMark } from "@/components/logo";

/**
 * Giant butterfly line-art watermark, straight from the deck templates.
 * Position it inside any `relative overflow-hidden` surface.
 */
export function ButterflyWatermark({
  className,
  opacityClass = "opacity-[0.05]",
}: {
  className?: string;
  opacityClass?: string;
}) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute ${className ?? ""}`}>
      <LogoMark className={`h-auto w-full ${opacityClass}`} />
    </div>
  );
}
