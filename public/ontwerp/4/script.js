(() => {
  const bench = document.querySelector('.bench');
  if (!bench) return;
  const sync = () => {
    const mode = bench.querySelector('input[name="mode"]:checked').value;
    const task = bench.querySelector('input[name="task"]:checked').value;
    bench.querySelectorAll('[data-show]').forEach((el) => { el.inert = el.dataset.show !== mode; });
    bench.querySelectorAll('[data-task]').forEach((el) => { el.inert = el.dataset.task !== task; });
  };
  bench.addEventListener('change', sync);
  sync();
})();
