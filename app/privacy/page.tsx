'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
  const [lang, setLang] = useState<'es' | 'en'>('es');

  return (
    <div className="bg-base-light text-base-dark min-h-screen pb-28">
      {/* Editorial Header */}
      <div className="relative w-full h-[280px] md:h-[350px] overflow-hidden flex items-end justify-start bg-gradient-to-r from-base-dark to-[#2A3B31] pb-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
        
        {/* Text Overlay */}
        <div className="relative z-10 max-w-5xl mx-auto w-full px-6 md:px-8 text-white">
          <Link
            href="/villas"
            className="inline-flex items-center space-x-2 text-xs font-sans font-bold tracking-wider uppercase text-white/60 hover:text-white transition-colors mb-4"
          >
            <span>←</span>
            <span>Back to Villas</span>
          </Link>
          <h1 className="text-4xl md:text-6xl font-outfit font-black tracking-tight text-white leading-tight">
            {lang === 'es' ? 'Aviso de Privacidad' : 'Privacy Notice'}
          </h1>
          <p className="font-outfit font-light text-base md:text-lg text-white/80 leading-relaxed max-w-2xl mt-2">
            {lang === 'es' 
              ? 'Conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP).' 
              : 'Pursuant to the Federal Law on Protection of Personal Data Held by Private Parties (LFPDPPP) in Mexico.'}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-8 mt-12">
        {/* Language Toggle Control */}
        <div className="flex justify-end mb-10 border-b border-sand-accent/15 pb-4">
          <div className="inline-flex bg-base-dark/[0.04] p-1 rounded-full border border-sand-accent/10">
            <button
              onClick={() => setLang('es')}
              className={`px-6 py-2 rounded-full font-sans text-xs tracking-wider font-semibold transition-all ${
                lang === 'es'
                  ? 'bg-ocean-teal text-white shadow-sm'
                  : 'text-base-dark/50 hover:text-base-dark'
              }`}
            >
              ESPAÑOL
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-6 py-2 rounded-full font-sans text-xs tracking-wider font-semibold transition-all ${
                lang === 'en'
                  ? 'bg-ocean-teal text-white shadow-sm'
                  : 'text-base-dark/50 hover:text-base-dark'
              }`}
            >
              ENGLISH
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white border border-sand-accent/15 rounded-[2.5rem] p-8 md:p-14 shadow-xl font-sans font-light text-[15px] md:text-[16px] text-base-dark/85 space-y-8 leading-relaxed max-w-none">
          {lang === 'es' ? (
            <>
              {/* Spanish content */}
              <div>
                <h2 className="font-outfit font-black text-2xl text-base-dark mb-4 tracking-tight">1. Identidad y Domicilio del Responsable</h2>
                <p className="text-justify mb-4">
                  El responsable de recabar, tratar y resguardar sus datos personales es <strong>San Pancho Tropical</strong>, con domicilio en Calle América Latina #149, San Francisco, Nayarit, C.P. 63729, México. Nos comprometemos a garantizar la absoluta confidencialidad, integridad y seguridad de la información que nos proporciona, de conformidad con lo establecido en la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (la Ley o LFPDPPP).
                </p>
              </div>

              <div>
                <h2 className="font-outfit font-black text-2xl text-base-dark mb-4 tracking-tight">2. Datos Personales que Recabamos</h2>
                <p className="text-justify mb-4">
                  Para llevar a cabo las finalidades descritas en este Aviso de Privacidad, recabamos los siguientes datos personales de forma directa a través de nuestro sitio web, formularios de contacto, mensajería instantánea (WhatsApp) o de reservas en línea:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Nombre completo.</li>
                  <li>Dirección de correo electrónico.</li>
                  <li>Número de teléfono (incluyendo prefijo de país para contacto vía WhatsApp).</li>
                  <li>Información sobre fechas de estancia y especificaciones de viaje.</li>
                  <li>Información de pago y facturación (procesada directamente por pasarelas de pago de terceros cifradas que cumplen con el estándar PCI-DSS, por lo que nosotros no almacenamos datos de tarjetas bancarias).</li>
                </ul>
              </div>

              <div>
                <h2 className="font-outfit font-black text-2xl text-base-dark mb-4 tracking-tight">3. Finalidades del Tratamiento de Datos</h2>
                <p className="text-justify mb-4">
                  Los datos personales que recopilamos son utilizados únicamente para las siguientes finalidades necesarias para el servicio solicitado:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Procesar, confirmar y gestionar sus reservas de hospedaje y alquiler de carritos de golf.</li>
                  <li>Establecer comunicación directa con usted para coordinar su llegada, resolver dudas y proveer asistencia en el destino.</li>
                  <li>Emitir los comprobantes fiscales y de facturación correspondientes.</li>
                  <li>Garantizar la seguridad e integridad física de las propiedades y los huéspedes.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-outfit font-black text-2xl text-base-dark mb-4 tracking-tight">4. Medidas de Seguridad de Datos</h2>
                <p className="text-justify mb-4">
                  San Pancho Tropical ha adoptado medidas de seguridad administrativas, técnicas y físicas estrictas para proteger sus datos personales contra daño, pérdida, alteración, destrucción o uso, acceso o tratamiento no autorizado. El tráfico de datos en nuestro sitio web viaja exclusivamente a través de canales cifrados HTTPS utilizando certificados de seguridad SSL/TLS.
                </p>
              </div>

              <div>
                <h2 className="font-outfit font-black text-2xl text-base-dark mb-4 tracking-tight">5. Transferencia de Datos</h2>
                <p className="text-justify mb-4">
                  Le informamos que no transferimos ni compartimos sus datos personales con terceros ajenos a la operación diaria de sus reservas, a menos que sea estrictamente necesario para cumplir con requerimientos legales o regulatorios ante las autoridades federales, estatales o municipales de México, o bien para el procesamiento seguro de transacciones de pago con su consentimiento explícito.
                </p>
              </div>

              <div>
                <h2 className="font-outfit font-black text-2xl text-base-dark mb-4 tracking-tight">6. Derechos ARCO y Revocación del Consentimiento</h2>
                <p className="text-justify mb-4">
                  Usted tiene en todo momento el derecho de acceder a sus datos personales, rectificarlos en caso de ser inexactos, solicitar su cancelación cuando considere que ya no son necesarios para los fines establecidos, u oponerse al tratamiento de los mismos para fines específicos (Derechos ARCO), así como revocar el consentimiento que nos haya otorgado.
                </p>
                <p className="text-justify mb-4">
                  Para ejercer cualquiera de estos derechos, deberá enviar una solicitud por escrito dirigida a nuestro correo electrónico oficial: <a href="mailto:vicky@mexicosta.com" className="text-ocean-teal hover:underline font-semibold">vicky@mexicosta.com</a>. Su solicitud deberá incluir su nombre completo, correo electrónico asociado a la reserva y una descripción detallada del derecho que desea ejercer. Responderemos a su solicitud en un plazo máximo de 20 días hábiles.
                </p>
              </div>

              <div>
                <h2 className="font-outfit font-black text-2xl text-base-dark mb-4 tracking-tight">7. Cambios al Aviso de Privacidad</h2>
                <p className="text-justify mb-4">
                  Nos reservamos el derecho de efectuar modificaciones o actualizaciones al presente Aviso de Privacidad en cualquier momento, con el fin de adaptarlo a cambios legislativos en México o políticas internas. Cualquier modificación estará disponible públicamente a través de esta sección de nuestro sitio web.
                </p>
                <p className="font-medium text-xs text-base-dark/50 mt-8 border-t border-sand-accent/15 pt-4">
                  Última actualización: Julio 2026.
                </p>
              </div>
            </>
          ) : (
            <>
              {/* English content */}
              <div>
                <h2 className="font-outfit font-black text-2xl text-base-dark mb-4 tracking-tight">1. Identity and Address of the Data Controller</h2>
                <p className="text-justify mb-4">
                  The data controller responsible for collecting, processing, and safeguarding your personal data is <strong>San Pancho Tropical</strong>, located at Calle América Latina #149, San Francisco, Nayarit, C.P. 63729, Mexico. We are committed to ensuring the absolute confidentiality, integrity, and security of the information you provide, in accordance with the provisions of the Mexican Federal Law on the Protection of Personal Data Held by Private Parties (LFPDPPP).
                </p>
              </div>

              <div>
                <h2 className="font-outfit font-black text-2xl text-base-dark mb-4 tracking-tight">2. Personal Data We Collect</h2>
                <p className="text-justify mb-4">
                  To carry out the purposes described in this Privacy Notice, we collect the following personal data directly through our website, contact forms, instant messaging (WhatsApp), or online booking channels:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Full name.</li>
                  <li>Email address.</li>
                  <li>Phone number (including country prefix for WhatsApp messaging).</li>
                  <li>Reservation details (dates of stay, specific travel requests).</li>
                  <li>Payment and billing information (processed directly by secure, encrypted third-party payment gateways compliant with the PCI-DSS standard; we do not store credit card numbers).</li>
                </ul>
              </div>

              <div>
                <h2 className="font-outfit font-black text-2xl text-base-dark mb-4 tracking-tight">3. Purpose of Processing Personal Data</h2>
                <p className="text-justify mb-4">
                  The personal data we collect is processed solely for the following necessary purposes to deliver the requested services:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>To process, confirm, and manage your accommodation and golf cart rental reservations.</li>
                  <li>To establish direct contact with you to coordinate check-in, answer inquiries, and provide support.</li>
                  <li>To issue corresponding invoices and fiscal billing documents.</li>
                  <li>To ensure the safety, security, and integrity of the properties and guests.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-outfit font-black text-2xl text-base-dark mb-4 tracking-tight">4. Data Security Measures</h2>
                <p className="text-justify mb-4">
                  San Pancho Tropical has implemented administrative, technical, and physical security measures designed to protect your personal data from damage, loss, alteration, destruction, or unauthorized use, access, or disclosure. Web traffic on our site is transmitted exclusively via encrypted HTTPS connections backed by secure SSL/TLS protocols.
                </p>
              </div>

              <div>
                <h2 className="font-outfit font-black text-2xl text-base-dark mb-4 tracking-tight">5. Data Transfers</h2>
                <p className="text-justify mb-4">
                  We do not transfer or share your personal data with third parties unrelated to the daily operations of your bookings, unless strictly required to comply with Mexican federal, state, or municipal legal and regulatory requests, or for secure payment processing with your explicit consent.
                </p>
              </div>

              <div>
                <h2 className="font-outfit font-black text-2xl text-base-dark mb-4 tracking-tight">6. ARCO Rights and Revocation of Consent</h2>
                <p className="text-justify mb-4">
                  At any time, you have the right to access your personal data, rectify it if it is inaccurate, request its cancellation if you believe it is no longer required for the stated purposes, or object to its processing for specific goals (ARCO Rights under Mexican law), as well as revoke the consent previously granted.
                </p>
                <p className="text-justify mb-4">
                  To exercise any of these rights, you must send a written request to our official email address: <a href="mailto:vicky@mexicosta.com" className="text-ocean-teal hover:underline font-semibold">vicky@mexicosta.com</a>. Your request must include your full name, the email associated with your booking, and a clear description of the ARCO right you wish to exercise. We will respond to your request within 20 business days.
                </p>
              </div>

              <div>
                <h2 className="font-outfit font-black text-2xl text-base-dark mb-4 tracking-tight">7. Changes to this Privacy Notice</h2>
                <p className="text-justify mb-4">
                  We reserve the right to amend or update this Privacy Notice at any time to adapt to new legislation in Mexico or internal policy changes. Any modifications will be posted publicly through this section of our website.
                </p>
                <p className="font-medium text-xs text-base-dark/50 mt-8 border-t border-sand-accent/15 pt-4">
                  Last updated: July 2026.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
