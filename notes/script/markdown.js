(function () {
  function escapeHtml(str) {
    return str
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function inlineMarkdown(text) {
    let safe = escapeHtml(text);
    safe = safe.replace(/`([^`]+)`/g, '<code>$1</code>');
    safe = safe.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    safe = safe.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    safe = safe.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    return safe;
  }

  function renderMarkdown(md) {
    const lines = md.replace(/\r\n/g, '\n').split('\n');
    const out = [];

    let inCode = false;
    let inUl = false;
    let inOl = false;

    function closeLists() {
      if (inUl) { out.push('</ul>'); inUl = false; }
      if (inOl) { out.push('</ol>'); inOl = false; }
    }

    for (const line of lines) {
      if (line.startsWith('```')) {
        closeLists();
        out.push(inCode ? '</code></pre>' : '<pre><code>');
        inCode = !inCode;
        continue;
      }

      if (inCode) {
        out.push(escapeHtml(line) + '\n');
        continue;
      }

      if (!line.trim()) {
        closeLists();
        continue;
      }

      if (/^#{1,6}\s+/.test(line)) {
        closeLists();
        const level = line.match(/^#+/)[0].length;
        const text = line.replace(/^#{1,6}\s+/, '');
        out.push(`<h${level}>${inlineMarkdown(text)}</h${level}>`);
        continue;
      }

      if (/^>\s?/.test(line)) {
        closeLists();
        out.push(`<blockquote>${inlineMarkdown(line.replace(/^>\s?/, ''))}</blockquote>`);
        continue;
      }

      if (/^[-*]\s+/.test(line)) {
        if (!inUl) { closeLists(); out.push('<ul>'); inUl = true; }
        out.push(`<li>${inlineMarkdown(line.replace(/^[-*]\s+/, ''))}</li>`);
        continue;
      }

      if (/^\d+\.\s+/.test(line)) {
        if (!inOl) { closeLists(); out.push('<ol>'); inOl = true; }
        out.push(`<li>${inlineMarkdown(line.replace(/^\d+\.\s+/, ''))}</li>`);
        continue;
      }

      if (/^---+$/.test(line.trim())) {
        closeLists();
        out.push('<hr />');
        continue;
      }

      closeLists();
      out.push(`<p>${inlineMarkdown(line)}</p>`);
    }

    closeLists();
    if (inCode) out.push('</code></pre>');

    return out.join('\n');
  }

  async function loadMarkdownPage(path, rootEl) {
    try {
      const res = await fetch(path, { cache: 'no-store' });
      if (!res.ok) {
        throw new Error(`Could not load ${path} (${res.status})`);
      }
      const content = await res.text();
      rootEl.innerHTML = renderMarkdown(content);
    } catch (err) {
      rootEl.innerHTML = `<div class="error">${escapeHtml(err.message)}</div>`;
    }
  }

  window.loadMarkdownPage = loadMarkdownPage;
})();