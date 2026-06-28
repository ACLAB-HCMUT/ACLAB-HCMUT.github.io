import React from 'react';
import Layout from '@theme/Layout';
import {PageHero, Section, SectionHead} from '../components';
import styles from './pages.module.css';

export default function Contact(): JSX.Element {
  return (
    <Layout title="Contact — ACLAB" description="Contact ACLAB HCMUT — email, address, map and social links.">
      <PageHero
        kicker="Contact"
        title="Contact ACLAB"
        subtitle="Get in touch for collaboration, student membership, or visiting the lab."
        breadcrumb={[{label: 'Home', to: '/'}, {label: 'Contact'}]}
      />

      <Section variant="surface">
        <div className={styles.twoCol}>
          <div>
            <SectionHead kicker="Send a message" title="Drop us a line." />
            <form
              className={styles.form}
              action="mailto:aclab@hcmut.edu.vn"
              method="post"
              encType="text/plain">
              <div className={styles.field}>
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" placeholder="Your name" required />
              </div>
              <div className={styles.field}>
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" placeholder="you@example.com" required />
              </div>
              <div className={styles.field}>
                <label htmlFor="subject">Subject</label>
                <input id="subject" name="subject" type="text" placeholder="How can we help?" />
              </div>
              <div className={styles.field}>
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={5} placeholder="Your message…" required />
              </div>
              <button type="submit" className="button button--primary">Send message</button>
            </form>
          </div>

          <div>
            <div className={styles.infoCard}>
              <h3>Reach us</h3>
              <div className={styles.infoRow}><strong>Email</strong><a href="mailto:aclab@hcmut.edu.vn">aclab@hcmut.edu.vn</a></div>
              <div className={styles.infoRow}><strong>Address</strong><span>268 Ly Thuong Kiet, Dist. 10, HCMC — HCMUT</span></div>
              <div className={styles.infoRow}><strong>GitHub</strong><a href="https://github.com/ACLAB-HCMUT">ACLAB-HCMUT</a></div>
              <div className={styles.infoRow}><strong>Facebook</strong><a href="https://www.facebook.com/aclabhcumt">aclabhcumt</a></div>
            </div>
            <iframe
              className={styles.mapEmbed}
              style={{marginTop: '1.25rem'}}
              title="HCMUT location"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Ho+Chi+Minh+City+University+of+Technology&output=embed"
            />
          </div>
        </div>
      </Section>
    </Layout>
  );
}
