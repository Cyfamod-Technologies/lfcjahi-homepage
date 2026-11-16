import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { buildPageMetadata, seoSite } from '@/lib/seo'
import styles from './privacy-policy.module.css'

export const metadata = buildPageMetadata({
  path: '/privacy-policy',
  title: 'Privacy Policy',
  description: 'How LFC Jahi Media handles information on our website and mobile app, including device storage, audio streaming and privacy requests.',
})

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <article className={styles.policy}>
          <Link href="/" className={styles.back}>← Back to home</Link>
          <p className={styles.eyebrow}>LFC JAHI MEDIA</p>
          <h1>Privacy Policy</h1>
          <p className={styles.updated}>Effective date: 14 November 2026 · Last updated: 14 November 2026</p>
          <p className={styles.intro}>Your time in the Word is personal. This policy explains how information is handled when you use the LFC Jahi Media website and mobile app.</p>

          <section>
            <h2>1. Who we are</h2>
            <p>LFC Jahi Media provides audio sermons and church resources for Living Faith Church Jahi, Abuja. The mobile app is developed with Cyfamod Technologies and is identified on Android as <code>com.cyfamod.lfcjahi.media</code>. This policy covers our public website at lfcjahi.com and the LFC Jahi Media app.</p>
            <p>For privacy questions or requests, email <a href="mailto:support@lfcjahi.com">support@lfcjahi.com</a>.</p>
          </section>
          <section>
            <h2>2. Information used to provide the service</h2>
            <p>You can browse and listen to public messages without creating a listener account or providing your name, email address or phone number.</p>
            <p>When your device requests a page, image, message list or audio file, our servers and hosting providers receive technical information such as your IP address, requested resource, request time, browser or app information and response status. This information may be recorded in operational and security logs to deliver content, diagnose problems and protect the service.</p>
            <p>The service also maintains aggregate message download counts. These counts are associated with messages, rather than a listener profile.</p>
            <p>If you contact us, we receive the contact details and information you choose to include. We use them to respond to your request. Please avoid sending sensitive personal information that is not needed for your enquiry.</p>
          </section>
          <section>
            <h2>3. Information stored on your device</h2>
            <p>The mobile app stores your saved-message selections, prayer progress, display theme and cached message information on your device. These preferences are not synchronized to a listener account. Cached message information allows offline browsing. Audio you explicitly download is stored on your device for offline listening and appears in Saved. Streaming messages that have not been downloaded requires an internet connection.</p>
            <p>The website uses browser storage to remember your light or dark display preference. Our backend may also set session and security cookies when it receives requests. These support service operation and request security.</p>
            <p>You can remove local app information by clearing the app’s storage or uninstalling it, subject to your device’s backup and restore settings. Website information can be removed through your browser’s site-data settings. Clearing this information may reset your preferences and saved items.</p>
          </section>
          <section>
            <h2>4. Permissions and playback</h2>
            <p>The app uses an internet connection to retrieve and stream messages. Background playback and media controls allow audio to continue while the app is minimized or your device is locked.</p>
            <p>The listening features do not require access to your microphone, camera, contacts or precise location. The app does not record your surroundings.</p>
            <p>When you choose to share a message or open an audio download, your device’s sharing tools or browser handle the action. Information is passed to the destination you select and is subject to that service’s privacy practices.</p>
          </section>
          <section>
            <h2>5. How information is used and shared</h2>
            <p>Information is used to deliver sermons and resources, remember local preferences, maintain download totals, respond to enquiries, resolve technical problems and protect the service.</p>
            <p>Technical requests are processed by the hosting, content-delivery and infrastructure providers needed to operate the service. We do not sell personal information or use saved-message selections or prayer progress for advertising. The current public website and mobile app do not include advertising or third-party behavioural analytics tools.</p>
            <p>Information may also be disclosed where required by applicable law or where necessary to investigate abuse and protect users or the service. Service providers may process technical information in countries outside your own.</p>
          </section>
          <section>
            <h2>6. External services</h2>
            <p>Our website may link to church social-media pages, external forms, resource collections or other websites. If you follow a link or submit information to an external service, that service receives and handles it under its own privacy policy. This policy does not cover those independent services.</p>
          </section>
          <section>
            <h2>7. Retention and security</h2>
            <p>Local preferences and cached information remain on your device until replaced or removed. Server logs and support correspondence are retained only for as long as needed for operational, security, support or legal purposes; retention can vary by record and service provider.</p>
            <p>Our public production website and API use HTTPS. We take reasonable measures to protect information, but no internet service or device-storage system can guarantee complete security.</p>
          </section>
          <section>
            <h2>8. Your choices and privacy requests</h2>
            <p>You can stop playback, clear local preferences, remove saved messages, uninstall the app or stop using the website at any time. There is no listener account to delete in the current app.</p>
            <p>To request access to, correction of or deletion of personal information you have provided to us, or to raise a privacy concern, email <a href="mailto:support@lfcjahi.com">support@lfcjahi.com</a>. We will consider requests under applicable data-protection requirements and may ask for information needed to verify and respond to your request. We cannot identify device-only favourites or prayer progress from your email address.</p>
          </section>
          <section>
            <h2>9. Children’s privacy</h2>
            <p>The listening service does not ask children to create accounts or submit personal details. Parents and guardians should supervise children’s use of external links and sharing tools. If you believe a child has provided personal information to us, contact us so we can investigate and address it.</p>
          </section>
          <section>
            <h2>10. Changes and contact</h2>
            <p>We may update this policy when the service or our information practices change. The current policy and its last-updated date will be published on this page.</p>
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
