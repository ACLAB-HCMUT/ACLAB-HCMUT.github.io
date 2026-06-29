import React from 'react';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import {PageHero, Section, SectionHead} from '../components';
import styles from './pages.module.css';

export default function Contact(): JSX.Element {
  return (
    <Layout title={translate({message: 'Contact — ACLAB'})} description={translate({message: 'Contact ACLAB HCMUT — email, address, map and social links.'})}>
      <PageHero
        kicker={translate({message: 'Contact'})}
        title={translate({message: 'Contact ACLAB'})}
        subtitle={translate({message: 'Get in touch for collaboration, student membership, or visiting the lab.'})}
        breadcrumb={[{label: translate({message: 'Home'}), to: '/'}, {label: translate({message: 'Contact'})}]}
      />

      <Section variant="surface">
        <div className={styles.twoCol}>
          <div>
            <SectionHead kicker={translate({message: 'Send a message'})} title={translate({message: 'Drop us a line.'})} />
            <form
              className={styles.form}
              action="mailto:aclab@hcmut.edu.vn"
              method="post"
              encType="text/plain">
              <div className={styles.field}>
                <label htmlFor="name"><Translate>Name</Translate></label>
                <input id="name" name="name" type="text" placeholder={translate({message: 'Your name'})} required />
              </div>
              <div className={styles.field}>
                <label htmlFor="email"><Translate>Email</Translate></label>
                <input id="email" name="email" type="email" placeholder="you@example.com" required />
              </div>
              <div className={styles.field}>
                <label htmlFor="subject"><Translate>Subject</Translate></label>
                <input id="subject" name="subject" type="text" placeholder={translate({message: 'How can we help?'})} />
              </div>
              <div className={styles.field}>
                <label htmlFor="message"><Translate>Message</Translate></label>
                <textarea id="message" name="message" rows={5} placeholder={translate({message: 'Your message…'})} required />
              </div>
              <button type="submit" className="button button--primary"><Translate>Send message</Translate></button>
            </form>
          </div>

          <div>
            <div className={styles.infoCard}>
              <h3><Translate>Reach us</Translate></h3>
              <div className={styles.infoRow}><strong><Translate>Email</Translate></strong><a href="mailto:aclab@hcmut.edu.vn">aclab@hcmut.edu.vn</a></div>
              <div className={styles.infoRow}><strong><Translate>Address</Translate></strong><span><Translate>268 Ly Thuong Kiet, Dist. 10, HCMC — HCMUT</Translate></span></div>
              <div className={styles.infoRow}><strong><Translate>GitHub</Translate></strong><a href="https://github.com/ACLAB-HCMUT">ACLAB-HCMUT</a></div>
              <div className={styles.infoRow}><strong><Translate>Facebook</Translate></strong><a href="https://www.facebook.com/aclabhcumt">aclabhcumt</a></div>
            </div>
            <iframe
              className={styles.mapEmbed}
              style={{marginTop: '1.25rem'}}
              title={translate({message: 'HCMUT location'})}
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
