import { PenTool, Mail, Youtube, Linkedin, Github } from "lucide-react";

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 2.226.725 4.283 1.956 5.952L2.5 21.5l3.655-1.424A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.802 0-3.483-.5-4.922-1.37l-.353-.213-2.67.1.8-2.613-.231-.368A7.955 7.955 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
    </svg>
  );
}

function MediumIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42c1.87 0 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="py-16 relative bg-background border-t-4 border-border">
      <div className="container px-6 relative z-10 mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 bg-muted px-3 py-1.5 rounded-sm border border-border">
              <PenTool className="w-4 h-4 text-primary" />
              <span className="font-mono font-bold uppercase tracking-wider text-xs text-foreground">
                Shop_Closed // Workspace
              </span>
            </div>
            <p className="text-base text-foreground font-medium max-w-md leading-relaxed">
              Punya proyek seru atau sekadar ingin diskusi ide? Saya terbuka untuk kolaborasi atau sekedar sharing ide!
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="mailto:email@dadan.id"
              aria-label="Email"
              title="Email: email@dadan.id"
              className="p-3 bg-card border border-border text-muted-foreground hover:text-primary hover:border-primary hover:-translate-y-1 rounded-md transition-all shadow-sm"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/6283874917977"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              title="WhatsApp: +62 838-7491-7977"
              className="p-3 bg-card border border-border text-muted-foreground hover:text-emerald-500 hover:border-emerald-500 hover:-translate-y-1 rounded-md transition-all shadow-sm"
            >
              <WhatsAppIcon className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/radanstromer-lgtm"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              title="GitHub"
              className="p-3 bg-card border border-border text-muted-foreground hover:text-foreground hover:border-foreground hover:-translate-y-1 rounded-md transition-all shadow-sm"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/dadan-dadan-b3322a68/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
              className="p-3 bg-card border border-border text-muted-foreground hover:text-secondary hover:border-secondary hover:-translate-y-1 rounded-md transition-all shadow-sm"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://www.youtube.com/@dadanid3005"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              title="YouTube"
              className="p-3 bg-card border border-border text-muted-foreground hover:text-red-500 hover:border-red-500 hover:-translate-y-1 rounded-md transition-all shadow-sm"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a
              href="https://medium.com/@radan.stromer"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Medium"
              title="Medium"
              className="p-3 bg-card border border-border text-muted-foreground hover:text-accent hover:border-accent hover:-translate-y-1 rounded-md transition-all shadow-sm"
            >
              <MediumIcon className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border border-dashed flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-sm text-muted-foreground font-medium">
            © {new Date().getFullYear()} Dadan. Crafted with bare hands and coffee.
          </p>

          <div className="font-mono text-[10px] text-muted-foreground/60 uppercase tracking-widest flex gap-4 bg-card px-3 py-1 rounded-full border border-border">
            <span>Status: Tidy</span>
            <span className="hidden sm:inline">|</span>
            <span>Tools: Stowed</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
