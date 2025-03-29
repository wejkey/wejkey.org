function copyToClipboard() {
    const codeBlock = document.querySelector('.plugin-config pre');
    const range = document.createRange();
    range.selectNodeContents(codeBlock);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    
    try {
      document.execCommand('copy');
      showTooltip();
    } catch (err) {
      console.error('Unable to copy', err);
    }
  
    // Deselect after copy
    selection.removeAllRanges();
  }
  
  function showTooltip() {
    const tooltip = document.querySelector('.tooltip');
    tooltip.style.visibility = 'visible';
    tooltip.style.opacity = '1';
  
    // Hide tooltip after 2 seconds
    setTimeout(() => {
      tooltip.style.visibility = 'hidden';
      tooltip.style.opacity = '0';
    }, 2000);
  }
  