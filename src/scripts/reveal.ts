/**
 * Revelação ao rolar, compartilhada por todo o site.
 *
 * Marque um elemento com `data-reveal="up" | "left" | "right" | "scale" | "pop" | "fade"` (o efeito está em
 * styles/base/reveal.css). Só elementos que ainda estão abaixo da dobra no carregamento são escondidos, então
 * nada visível pisca e quem chega por um link #seção vê o conteúdo na hora. Os que entram na tela juntos
 * aparecem em sequência (escalonados pela ordem no documento). Com "reduzir movimento" nada é escondido.
 */
const PASSO_MS = 70;
const ATRASO_MAX_MS = 420;

function iniciarRevelacao(): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  const alvos = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  const limite = window.innerHeight;
  const pendentes = alvos.filter((el) => el.getBoundingClientRect().top > limite);
  if (!pendentes.length) return;

  const observador = new IntersectionObserver((entradas) => {
    const visiveis = entradas
      .filter((e) => e.isIntersecting)
      .map((e) => e.target as HTMLElement)
      .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));

    visiveis.forEach((el, i) => {
      el.style.setProperty('--reveal-delay', `${Math.min(i * PASSO_MS, ATRASO_MAX_MS)}ms`);
      el.dataset.revealEstado = 'visivel';
      observador.unobserve(el);
      // Depois da animação o elemento volta ao estilo normal (hover e transições do componente funcionam).
      el.addEventListener('animationend', () => el.style.removeProperty('--reveal-delay'), { once: true });
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

  pendentes.forEach((el) => {
    el.dataset.revealEstado = 'oculto';
    observador.observe(el);
  });
}

iniciarRevelacao();
