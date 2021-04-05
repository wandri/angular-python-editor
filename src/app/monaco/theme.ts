export const customTheme = {
  base: 'vs-dark', // can also be vs or hc-black
  inherit: true, // can also be false to completely replace the builtin rules
  rules: [
    {
      token: 'comment',
      foreground: 'ffa500',
      fontStyle: 'italic underline'
    },
    {
      token: 'enum',
      foreground: '9e2121',
      fontStyle: 'italic underline'
    },
    {
      token: 'typeParameter',
      foreground: '9e2121',
      fontStyle: 'italic underline'
    },
    {
      token: 'macro',
      foreground: '9e2121',
      fontStyle: 'italic underline'
    },
    {
      token: 'parameter',
      foreground: '9e2121',
      fontStyle: 'italic underline'
    },
    {
      token: 'constant',
      foreground: '9e2121',
      fontStyle: 'italic underline'
    },
    {token: 'comment.js', foreground: '008800', fontStyle: 'bold'},
    {token: 'comment.css', foreground: '0000ff'} // will inherit fontStyle from `comment` above
  ],
  colors: {}
};
