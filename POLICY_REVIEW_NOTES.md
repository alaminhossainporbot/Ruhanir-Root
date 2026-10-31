# Policy Review Notes (Internal — Not for Publication)

This document provides a single consolidated register of every operational commitment, regulatory assumption, and open owner/lawyer decision affecting the legal and policy pages of `ruhanir.com`.

---

## Part A: Open Owner Decisions & Affected Sentences

| Page & Route | Affected Sentence / Area | Current Neutral Language / Draft Commitment | Open Owner Decision Needed |
|---|---|---|---|
| **Privacy Policy**<br>`/[lang]/privacy-policy` | Section 8 ("Applicable Law") & Section 2 ("Storage") | *"Ruhanir Engine operates its institutional activities in accordance with applicable Bangladesh data protection law."* | 1. Confirm physical/cloud storage location for contact submissions (e.g., Google Workspace, AWS, local server).<br>2. Confirm whether contact form data crosses Bangladesh borders.<br>3. Confirm formal archiving retention window (e.g. 1 year, 3 years). |
| **Terms of Sale**<br>`/[lang]/terms-of-sale` | Contract Formation & Pricing | *"The applicable terms are stated on the product page and in the order confirmation."* | Confirm standard minimum order quantity, wholesale eligibility rules, and whether pre-orders are supported. |
| **Returns, Refunds & Cancellation**<br>`/[lang]/returns-refunds` | Return Window & Eligible Conditions | *"Returns may be requested for physical products received in damaged, defective, or incorrect condition... The applicable terms and eligibility conditions are stated on the product page..."* | 1. Confirm customer return notice window (e.g., within 3 days or 7 days of receipt).<br>2. Confirm who bears return shipping postage. |
| **Returns, Refunds & Cancellation**<br>`/[lang]/returns-refunds` | Refund Timing & Methods | *"Where a confirmed order cannot be delivered, a full refund will be processed within 10 days."* | 1. Confirm refund disbursement method (reversal to original payment gateway / bKash / bank transfer).<br>2. Confirm if the 10-day refund window is operationally feasible with gateway partners. |
| **Delivery & Shipping**<br>`/[lang]/delivery-shipping` | Handover & Delivery Window | *"Orders are packaged and handed over to carrier services within 48 hours of confirmed payment... Same-city within 5 days; outside city up to 10 days."* | 1. Confirm courier partner contracts (e.g., Pathao, Steadfast, eCourier, Sundarban).<br>2. Confirm whether remote upazila deliveries require extra lead time. |
| **Payment Policy**<br>`/[lang]/payment-policy` | Payment Methods & Card Data | *"Payments are processed through the payment methods shown at checkout... does not store payment card numbers... on its own servers."* | Confirm payment gateway provider integration (e.g., SSLCOMMERZ, Shurjopay, bKash Merchant API) prior to store launch. |
| **Digital Terms**<br>`/[lang]/digital-terms` | Key Activation & Replacement | *"Delivered digital license keys are strictly non-refundable, unless verifiable system validation proves the key was invalid prior to transmission."* | Confirm software publisher partner escalation procedure for invalid/region-locked license keys. |
| **Warranty Policy**<br>`/[lang]/warranty-policy` | Coverage Duration & Provider | *"Physical hardware products offered by Ruhanir Store carry official manufacturer or authorized distributor warranties where applicable."* | Confirm whether Ruhanir Store provides direct replacement warranty for initial 7 days before directing to brand service centers. |
| **IT Service Terms**<br>`/[lang]/service-terms` | Commercial Framework | *"The applicable terms are stated in the service agreement and in the order confirmation."* | Confirm standard billing milestone structure (e.g., 30% advance, 40% UAT, 30% deployment). |
| **IT Support Policy**<br>`/[lang]/support-policy` | Support Hours & Channels | *"Support channels... designated ticketing infrastructure or through direct communication at support@ruhanir.com."* | 1. Confirm official working hours (e.g., Sunday–Thursday 9am–6pm, or 24/7 critical tier).<br>2. Confirm target SLA classification (Critical, High, Normal). |
| **Complaints & Feedback**<br>`/[lang]/complaints` | Response Times | *"All submissions are logged and evaluated in order of receipt by authorized personnel."* (No promised response times). | Confirm internal customer service SLA before adding turnaround targets. |

---

## Part B: Items for Legal Counsel Review

1. **Governing Data Protection Terminology**:
   - The site uses the general phrase *"applicable Bangladesh data protection law"* rather than citing a specific ordinance title, due to ongoing regulatory shifts.
   - **Lawyer Action**: Provide precise statutory title and mandatory disclosures once the relevant act or rules are gazetted and in force.
2. **Cross-Border Data Transfers**:
   - Contact form submissions transit over HTTPS and may route through international hosting/CDN infrastructures (e.g., Vercel, Cloudflare, Google Workspace).
   - **Lawyer Action**: Validate cross-border routing compatibility with current ICT and personal data protection regulations.
3. **Consumer Rights Compliance**:
   - Review draft 48-hour carrier handover, 10-day maximum delivery, and 10-day refund window against Bangladesh Consumer Rights Protection Act and Digital Commerce Guidelines.
4. **Subdomain Integration & Jurisdiction**:
   - Verify that the separation of corporate root (`ruhanir.com`), IT services (`it.ruhanir.com`), and eCommerce (`store.ruhanir.com`) maintains appropriate liability segmentation under Bangladesh commercial law.
