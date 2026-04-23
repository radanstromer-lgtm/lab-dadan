import { PenTool, Github, Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-16 relative bg-background border-t-4 border-border">
      <div className="container px-6 relative z-10 mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 bg-muted p-2 rounded-sm border border-border">
            <PenTool className="w-5 h-5 text-primary" />
            <span className="font-mono font-bold uppercase tracking-wider text-sm text-foreground">
              Shop_Closed
            </span>
          </div>

          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-primary hover:-translate-y-1 transition-all">
              <Github className="w-6 h-6" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-secondary hover:-translate-y-1 transition-all">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-accent hover:-translate-y-1 transition-all">
              <Mail className="w-6 h-6" />
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
