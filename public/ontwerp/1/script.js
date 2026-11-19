(() => {
  const demo = document.querySelector('[data-demo]');
  if (!demo) return;
  const tabs = [...demo.querySelectorAll('[role="tab"]')];
  const panels = [...demo.querySelectorAll('[role="tabpanel"]')];
  const pauseBtn = demo.querySelector('[data-pause]');
  const pauseLabel = demo.querySelector('[data-pause-label]');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  demo.querySelector('[role="tablist"]').hidden = false;

  let current = 0;
  let timer = null;
  let queue = [];
  let qi = 0;
  let paused = false;

  const show = (i) => {
    current = i;
    tabs.forEach((t, k) => {
      t.setAttribute('aria-selected', String(k === i));
      t.tabIndex = k === i ? 0 : -1;
    });
    panels.forEach((p, k) => { p.hidden = k !== i; });
  };

  const finish = (panel) => {
    panel.querySelectorAll('.row').forEach((r) => { r.classList.remove('is-active'); r.classList.add('is-done'); });
    panel.dataset.state = 'signed';
  };

  const reset = (panel) => {
    panel.querySelectorAll('.row').forEach((r) => r.classList.remove('is-done', 'is-active'));
    panel.dataset.state = 'work';
  };

  const build = (panel) => {
    const q = [];
    panel.querySelectorAll('.row:not(.is-sign)').forEach((r) => {
      const text = r.classList.contains('is-text') && !r.classList.contains('is-result');
      q.push([text ? 500 : 350, () => r.classList.add('is-active')]);
      q.push([text ? 1700 : 750, () => { r.classList.remove('is-active'); r.classList.add('is-done'); }]);
    });
    q.push([700, () => { panel.dataset.state = 'concept'; }]);
    q.push([1800, () => { panel.dataset.state = 'signed'; }]);
    q.push([4500, () => start((current + 1) % panels.length)]);
    return q;
  };

  const run = () => {
    if (paused || qi >= queue.length) return;
    const [delay, fn] = queue[qi];
    const q = queue;
    timer = setTimeout(() => {
      qi += 1;
      fn();
      if (queue === q) run();
    }, delay);
  };

  const start = (i) => {
    clearTimeout(timer);
    show(i);
    reset(panels[i]);
    queue = build(panels[i]);
    qi = 0;
    run();
  };

  const select = (i) => {
    if (reduce || paused) {
      clearTimeout(timer);
      queue = [];
      show(i);
      finish(panels[i]);
    } else {
      start(i);
    }
  };

  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(i));
    t.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      const n = (i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      tabs[n].focus();
      select(n);
    });
  });

  show(0);
  if (reduce) return;

  demo.classList.add('is-live');
  pauseBtn.hidden = false;
  pauseBtn.addEventListener('click', () => {
    paused = !paused;
    pauseBtn.setAttribute('aria-pressed', String(paused));
    pauseLabel.textContent = paused ? 'Speel af' : 'Pauzeer';
    if (paused) {
      clearTimeout(timer);
    } else if (qi >= queue.length) {
      start((current + 1) % panels.length);
    } else {
      run();
    }
  });

  start(0);
})();
