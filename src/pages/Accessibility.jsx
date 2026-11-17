// ACCESSIBILITY PAGE (address: /accessibility)
// A plain text page that explains how the site supports all visitors.

export default function Accessibility() {
  return (
    <div className="page-wrap max-w-3xl py-12">
      <title>Accessibility | Marlowby</title>
      <meta name="description" content="How Marlowby supports keyboard, screen reader and low-vision visitors." />

      <h1 className="text-4xl">Accessibility</h1>
      <p className="mt-3">
        We build Marlowby to meet WCAG 2.2 level AA and the accessibility expectations of the ADA.
      </p>
      <ul className="mt-5 list-disc space-y-2 pl-6">
        <li>Every page works with a keyboard, and the focus outline is always visible.</li>
        <li>A skip link jumps past the navigation to the main content.</li>
        <li>Text and controls meet the 4.5:1 contrast ratio for normal text.</li>
        <li>Form fields have visible labels, and errors are described in text.</li>
        <li>Pages adapt from phone to desktop widths, and motion respects reduced-motion settings.</li>
      </ul>
      <p className="mt-5">
        If something is hard to use, tell us through the partner form on the About page and we will fix it.
      </p>
    </div>
  )
}
