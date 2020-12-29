export function getCaretIndex(element: Node): number {
  let position = 0;
  const selection = window.getSelection();
  // Check if there is a selection (i.e. cursor in place)
  if (selection.rangeCount !== 0) {
    // Store the original range
    const range = window.getSelection().getRangeAt(0);
    // Clone the range
    const preCaretRange = range.cloneRange();
    // Select all textual contents from the contenteditable element
    preCaretRange.selectNodeContents(element);
    // And set the range end to the original clicked position
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    // Return the text length from contenteditable start to the range end
    position = preCaretRange.toString().length;
  }
  return position;
}

export function setCaret(index: number, element: HTMLElement): void {
  const range = document.createRange();
  const selection = window.getSelection();

  range.setStart(element.childNodes[0], index);
  range.collapse(true);

  selection.removeAllRanges();
  selection.addRange(range);
}
