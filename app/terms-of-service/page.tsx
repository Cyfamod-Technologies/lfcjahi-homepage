import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { buildPageMetadata, seoSite } from '@/lib/seo'
import styles from '../privacy-policy/privacy-policy.module.css'

export const metadata = buildPageMetadata({
  path: '/terms-of-service',
  title: 'Terms of Service',
  description: 'Terms for using the LFC Jahi Media website and mobile app, listening to sermons, downloading messages and sharing church resources.',
})

export default function TermsOfServicePage() {
  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <article className={styles.policy}>
          <Link href="/" className={styles.back}>← Back to home</Link>
          <p className={styles.eyebrow}>LFC JAHI MEDIA</p>
          <h1>Terms of Service</h1>
          <p className={styles.updated}>Effective date: 14 November 2026 · Last updated: 14 November 2026</p>
          <p className={styles.intro}>Welcome to LFC Jahi Media. These terms explain how you may use our website and mobile app to listen, learn and share the Word.</p>

          <section>
            <h2>1. About these terms</h2>
            <p>These terms apply to the public website at lfcjahi.com and the LFC Jahi Media mobile app, provided for Living Faith Church Jahi, Abuja, with development support from Cyfamod Technologies. The Android app’s package name is <code>com.cyfamod.lfcjahi.media</code>.</p>
            <p>By using the service, you agree to these terms to the extent permitted by applicable law. If you do not agree, please stop using the service. Parents and guardians should supervise children’s use and any external sharing or links.</p>
          </section>
          <section>
            <h2>2. Listening and access</h2>
            <p>The service provides sermons, prayer guides and church resources for spiritual growth. Public listening is currently free and does not require a listener account. Your internet provider may charge for the data used to browse, stream or download content.</p>
            <p>You are responsible for using a compatible device and maintaining your connection. Cached message information is available for browsing where supported; it does not mean audio is available offline. Background playback and device controls depend on your device and operating system.</p>
          </section>
          <section>
            <h2>3. Permitted use and sharing</h2>
            <p>You may browse, stream and use available download features for personal, non-commercial listening and devotional use, subject to any specific notice accompanying the content. You are welcome to share links to our message pages using the service’s sharing tools.</p>
            <p>Sermons, recordings, photographs, artwork, logos and other materials remain the property of their respective rights holders. Access to a file does not transfer ownership or grant permission to sell it, claim it as your own, misrepresent its source or imply an endorsement.</p>
            <p>For commercial reuse, republication, broadcasting, editing or other uses beyond the permission above, contact <a href="mailto:support@lfcjahi.com">support@lfcjahi.com</a> for guidance and any required rights-holder permission. These terms do not restrict uses allowed by applicable law or a separate licence from the rights holder.</p>
          </section>
          <section>
            <h2>4. Responsible use</h2>
            <p>Use the service lawfully and respectfully. Do not attempt to access administrative systems without authorization, bypass security controls, introduce malicious software, disrupt availability or use automated requests in a way that overloads the service.</p>
            <p>Do not use the service or its resources to impersonate others, harass people, infringe their rights or misrepresent Living Faith Church Jahi, its ministers or its teachings.</p>
          </section>
          <section>
            <h2>5. Privacy and local preferences</h2>
            <p>Our <Link href="/privacy-policy">Privacy Policy</Link> explains how technical requests, local preferences, support enquiries and other information are handled.</p>
            <p>Saved-message selections, prayer progress, display preferences and cached information in the app are stored on your device. They are not synchronized to a listener account and may be lost when you clear storage, change devices or uninstall the app.</p>
          </section>
          <section>
            <h2>6. External links and sharing tools</h2>
            <p>The service may provide links to independent websites, social-media pages, forms, resource collections or device sharing tools. Those services have their own terms and privacy practices. Their inclusion does not mean we control their content, security or availability.</p>
            <p>Review the destination and recipient before sharing a message or providing personal information through an external service.</p>
          </section>
          <section>
            <h2>7. Content and service availability</h2>
            <p>We aim to make messages and resources accessible, but availability can be affected by maintenance, network problems, technical faults or rights-holder requests. We may update, correct, replace or remove content and features.</p>
            <p>Dates, titles and other message details may occasionally contain errors. Please contact us if you notice a problem. Sermons and prayer resources provide religious teaching and spiritual encouragement; they do not replace advice from a qualified professional where that is needed.</p>
          </section>
          <section>
            <h2>8. Service limitations</h2>
            <p>The service is provided as available. To the extent permitted by applicable law, we do not guarantee uninterrupted or error-free operation, compatibility with every device or the permanent availability of a particular recording.</p>
            <p>To the extent permitted by applicable law, we are not responsible for indirect or consequential losses resulting from service interruptions, device issues or independent third-party services. Nothing in these terms excludes liability that cannot lawfully be excluded or limits your mandatory consumer or data-protection rights.</p>
          </section>
          <section>
            <h2>9. Restrictions and changes</h2>
            <p>We may restrict access where reasonably necessary to address misuse, protect the service or comply with legal obligations. You may stop using the service at any time.</p>
            <p>We may revise these terms as the service changes. Updated terms will be published here with a new last-updated date. Material changes will be communicated through the service where appropriate; any consent required by applicable law will be requested separately.</p>
          </section>
          <section>
            <h2>10. Questions and concerns</h2>
            <p>If you have a question about these terms, a content-permission request or a concern about the service, contact us using the details below. Please identify the relevant message or page so we can help.</p>
            <address className={styles.contact}>
              <strong>LFC Jahi Media · Living Faith Church Jahi</strong><br />
              <a href="mailto:support@lfcjahi.com">support@lfcjahi.com</a><br />
              {seoSite.churchAddress}, Nigeria
            </address>
          </section>
        </article>
      </main>
      <Footer minimal />
    </>
  )
}
