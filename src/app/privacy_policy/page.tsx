// pages/privacy.js

import Head from 'next/head';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto py-8">
      <Head>
        <title>Privacy Policy - Atlantic Connect</title>
      </Head>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-4">
          <span className="font-semibold">1. Introduction:</span>
          <br />
          <span className="ml-4">1.1. Purpose of Policy:</span> Atlantic Connect is dedicated to respecting the privacy rights of our users. This Privacy Policy outlines our commitment to fair information practices and applies solely to our app.
        </p>
        <p className="mb-4">
          <span className="font-semibold">2. Information Collection Practices:</span>
          <br />
          We collect personal information from users in a few instances, including when you sign up for specific services or contact us. This may include your name and email address.
          <br />
          (a) Automatic Collection: Our app may automatically recognize domain names and IP addresses for analytical purposes. No personally identifiable information is disclosed during this process.
          <br />
          (b) Cookies: We may use cookies to enhance user experience and analyze site traffic. Users can choose to disable cookies, but please note that this may affect certain features of the app.
        </p>
        <p className="mb-4">
          <span className="font-semibold">3. Use and Sharing of Information:</span>
          <br />
          (a) Personal Information: We do not disclose personally identifiable information to third parties except for essential service providers facilitating app functionality.
          <br />
          (b) Anonymous Information: Anonymous information may be used for analytical purposes and shared with business partners and advertisers in aggregate form.
          <br />
          (c) Use of Cookies: Promotions or advertisements within the app may utilize cookies. However, we do not control the information collected by outside advertisers.
          <br />
          (d) Disclosure of Personal Information: We may disclose information if required by law or to protect our rights and the safety of users.
          <br />
          (e) Sale of Information: In the event of changes to our business structure, user information may be transferred to the acquiring party.
        </p>
        <p className="mb-4">
          <span className="font-semibold">4. Security:</span>
          <br />
          While we have security measures in place to protect user information, we cannot guarantee against all risks.
        </p>
        <p className="mb-4">
          <span className="font-semibold">5. Areas Beyond Our Control:</span>
          <br />
          Links within the app may lead to external websites. Users should review the privacy policies of those websites as they are beyond our control.
        </p>
        <p className="mb-4">
          <span className="font-semibold">6. Contact Information and Policy Updates:</span>
          <br />
          For questions regarding this Policy or our practices, please contact us using the provided contact information. We reserve the right to update this Policy, and any changes will be posted on the app.
        </p>
      </div>
      <div className="flex justify-center">
                  <a href="/login" className="text-green-500 hover:text-blue-700">back to login page</a>
        </div>
    </div>
  );
};

export default PrivacyPolicy;
