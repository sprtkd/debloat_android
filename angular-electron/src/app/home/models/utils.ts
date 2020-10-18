
export function searchGoogle(params: string) {
    window.open('https://google.com/search?q='+params, "_blank");
}

export function copyToClipboard(text: string) {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (text));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
  }