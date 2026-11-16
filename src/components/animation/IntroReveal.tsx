import { INTRO } from "./animationTimeline";

/**
 * Runs before first paint (inline in <head>):
 *  - `html.js`          → enables CSS reveals (content is visible without JS).
 *  - `html.intro-armed` → shows the black curtain on the very first frame,
 *    unless the visitor prefers reduced motion or the intro is disabled.
 * Failsafe: if the app never boots (bundle error), both classes are removed
 * after a few seconds so the page can never stay hidden.
 */
export const introBootScript = `(function(){try{
var d=document.documentElement;
/* Hosts can inject markup into the head (Netlify adds a newline + an HTML comment).
   React tolerates the comment but not the stray text node, and a hydration
   mismatch makes React re-render the document, wiping the classes below
   (= no intro). Drop text nodes directly under <head> before hydration. */
var clean=function(){var h=document.head;if(!h)return;for(var n=h.firstChild;n;){var x=n.nextSibling;if(n.nodeType===3)h.removeChild(n);n=x;}};
clean();document.addEventListener('DOMContentLoaded',clean);
d.classList.add('js');
var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(${INTRO.enabled ? "true" : "false"}&&!rm)d.classList.add('intro-armed');
setTimeout(function(){if(!window.__revealReady){d.classList.remove('js','intro-armed');}},${INTRO.failsafeMs});
}catch(e){}})();`;

/**
 * The near-black curtain + scan HUD. Rendered in the server HTML but hidden by
 * CSS unless `html.intro-armed` is set; the cursor engine animates it away.
 */
export function IntroCurtain({ intro }: { intro: { scan: string; agents: string; targets: string } }) {
  return (
    <div id="intro-curtain" aria-hidden="true" className="intro-curtain">
      <div className="intro-scanline" />
      <p className="intro-hud micro">
        <span className="intro-hud-dot" />
        <span>{intro.scan}</span>
        <span className="hidden text-[#2b6f86] sm:inline">/</span>
        <span data-hud="agents" className="hidden sm:inline">{`00 ${intro.agents}`}</span>
        <span className="text-[#2b6f86]">/</span>
        <span data-hud="targets">{`00 ${intro.targets}`}</span>
      </p>
    </div>
  );
}
