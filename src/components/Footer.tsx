import { identity } from "../data/content";

export function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="mx-auto flex max-w-7xl justify-center px-5 font-mono text-[11px] text-faint md:px-8">
        <p>
          © {new Date().getFullYear()} {identity.name} · all systems nominal
        </p>
      </div>
    </footer>
  );
}
