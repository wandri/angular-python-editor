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
  new Range();
  return position;
}

function getCaretCoordinates(): { x: number; y: number } {
  let x = 0,
    y = 0;
  const selection = window.getSelection();
  // Check if there is a selection (i.e. cursor in place)
  if (selection.rangeCount !== 0) {
    // Clone the range
    const range = selection.getRangeAt(0).cloneRange();
    // Collapse the range to the start, so there are not multiple chars selected
    range.collapse(true);
    // getCientRects returns all the positioning information we need
    const rect = range.getClientRects()[0];
    if (rect) {
      x = rect.left; // since the caret is only 1px wide, left == right
      y = rect.top; // top edge of the caret
    }
  }
  return { x, y };
}

export function setCaret(index: number, element: HTMLElement): void {
  const range = document.createRange();
  const selection = window.getSelection();

  range.setStart(element.childNodes[0], index);
  range.collapse(true);

  selection.removeAllRanges();
  selection.addRange(range);
}
