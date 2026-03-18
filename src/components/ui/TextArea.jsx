/**
 * Wellframe-styled multiline text input for open-ended assessment questions.
 */
export default function TextArea({ value, onChange, placeholder = 'Type your answer here…', rows = 4 }) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full border border-wf-border rounded-xl px-4 py-3 text-[15px] text-wf-text placeholder-wf-textSub font-sans resize-none outline-none focus:border-brand transition-colors"
    />
  )
}
