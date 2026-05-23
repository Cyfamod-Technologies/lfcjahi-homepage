'use client'

export default function BackToTop() {
  function handleClick(e: React.MouseEvent) {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div id="back-to-top">
      <a className="top" id="top" href="#" onClick={handleClick}>
        <i className="ion-ios-arrow-up"></i>
      </a>
    </div>
  )
}
