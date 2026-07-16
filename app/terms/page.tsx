'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function TermsPage() {
  const [lang, setLang] = useState<'es' | 'en'>('es');

  return (
    <div className="bg-base-light text-base-dark min-h-screen pb-28">
      {/* Editorial Header */}
      <div className="relative w-full h-[280px] md:h-[350px] overflow-hidden flex items-end justify-start bg-gradient-to-r from-base-dark to-[#30271C] pb-12">
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
            {lang === 'es' ? 'Términos y Condiciones' : 'Terms of Service'}
          </h1>
          <p className="font-outfit font-light text-base md:text-lg text-white/80 leading-relaxed max-w-2xl mt-2">
            {lang === 'es' 
              ? 'Reglas generales de hospedaje, reservas y políticas de alquiler para San Pancho Tropical.' 
              : 'General rules, booking conditions, and rental policies for San Pancho Tropical.'}
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
                <h2 className="font-outfit font-black text-2xl text-base-dark mb-4 tracking-tight">1. Reservaciones, Pagos y Depósitos</h2>
                <p className="text-justify mb-4">
                  Al confirmar una reserva a través de nuestro sitio web, usted acepta cumplir con las políticas de pago aplicables. Para asegurar cualquier reservación de propiedad o carrito de golf se requiere un depósito equivalente al <strong>50% del total</strong> de la estancia. El saldo restante (50% final) deberá liquidarse en su totalidad a más tardar <strong>30 días antes</strong> de su fecha programada de llegada. Si la reserva se realiza con menos de 30 días de anticipación al check-in, se requerirá el pago del 100% al momento de la reserva.
                </p>
              </div>

              <div>
                <h2 className="font-outfit font-black text-2xl text-base-dark mb-4 tracking-tight">2. Política de Cancelación y Reembolso</h2>
                <p className="text-justify mb-4">
                  Entendemos que los planes de viaje pueden cambiar. Las solicitudes de cancelación de reservas se procesan bajo los siguientes lineamientos específicos:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>El depósito del 50% es completamente reembolsable si la solicitud de cancelación se realiza dentro de los 30 días posteriores a la fecha en que se recibió dicho depósito.</li>
                  <li>Adicionalmente, la cancelación debe ocurrir con más de 60 días de anticipación a la fecha programada de su llegada (check-in).</li>
                  <li>Cualquier reembolso o cambio de reserva estará sujeto a un cargo del <strong>10% por gastos administrativos</strong> sobre el total pagado.</li>
                  <li>Las cancelaciones que no cumplan con ambos plazos estipulados no serán elegibles para reembolsos.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-outfit font-black text-2xl text-base-dark mb-4 tracking-tight">3. Reglas de Convivencia y Uso de Propiedades</h2>
                <p className="text-justify mb-4">
                  Nuestras villas forman parte de un pequeño y tranquilo vecindario en San Francisco (San Pancho), Nayarit. Para mantener el bienestar común y la armonía comunitaria, todos los huéspedes deben comprometerse a acatar las siguientes pautas:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li><strong>Espacios Libres de Humo:</strong> Queda estrictamente prohibido fumar o usar vaporizadores en el interior de cualquiera de nuestras propiedades. En caso de violación, se aplicará un cargo de restauración estructural de $300 USD.</li>
                  <li><strong>Horas de Silencio:</strong> Se solicita respetar el descanso de los vecinos de las 10:00 PM a las 9:00 AM del día siguiente.</li>
                  <li><strong>Eventos y Visitas:</strong> Las fiestas, reuniones masivas, eventos externos y visitas no registradas que superen la capacidad contratada de la villa están estrictamente prohibidas.</li>
                  <li><strong>Mascotas:</strong> Para proteger las instalaciones y mantener áreas libres de alérgenos para futuros huéspedes, no se admiten mascotas de ningún tipo.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-outfit font-black text-2xl text-base-dark mb-4 tracking-tight">4. Alquiler y Uso de Carritos de Golf</h2>
                <p className="text-justify mb-4">
                  Si decide rentar o hacer uso de un carrito de golf proporcionado por San Pancho Tropical, acepta sujetarse a los siguientes requisitos obligatorios:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Todos los conductores deben contar con una licencia de conducir oficial vigente y ser mayores de 18 años.</li>
                  <li>El vehículo es para uso exclusivo en las calles públicas autorizadas dentro de San Pancho. Queda prohibido conducir en carreteras federales o sobre la arena de la playa.</li>
                  <li>Cualquier daño ocasionado al vehículo por uso indebido o negligencia será responsabilidad total del arrendatario de la reserva.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-outfit font-black text-2xl text-base-dark mb-4 tracking-tight">5. Deslinde de Responsabilidad</h2>
                <p className="text-justify mb-4">
                  San Pancho Tropical no se hace responsable por pérdidas de objetos de valor personales dentro de las propiedades, ni por cortes temporales en servicios públicos ajenos a nuestro control (tales como fallas en el suministro eléctrico de la CFE, suspensiones de agua potable municipal o fallas del proveedor de internet). Haremos todo lo que esté a nuestro alcance para mitigar cualquier inconveniente de inmediato.
                </p>
              </div>

              <div>
                <h2 className="font-outfit font-black text-2xl text-base-dark mb-4 tracking-tight">6. Ley Aplicable y Jurisdicción</h2>
                <p className="text-justify mb-4">
                  Cualquier controversia relacionada con el uso de este sitio web o las reservas de hospedaje se regirá por las leyes federales y locales aplicables en los Estados Unidos Mexicanos, sometiéndose a la jurisdicción de los tribunales competentes en el Estado de Nayarit, renunciando a cualquier otro fuero que pudiere corresponderles en razón de sus domicilios presentes o futuros.
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
                <h2 className="font-outfit font-black text-2xl text-base-dark mb-4 tracking-tight">1. Reservations, Payments, and Deposits</h2>
                <p className="text-justify mb-4">
                  By confirming a booking through our website, you agree to comply with our payment policy. To secure any villa or golf cart booking, an initial deposit equal to <strong>50% of the total reservation cost</strong> is required. The remaining 50% balance must be paid in full at least <strong>30 days prior</strong> to your scheduled check-in date. Bookings made within 30 days of arrival must be paid in full (100%) at the time of reservation.
                </p>
              </div>

              <div>
                <h2 className="font-outfit font-black text-2xl text-base-dark mb-4 tracking-tight">2. Cancellation and Refund Policy</h2>
                <p className="text-justify mb-4">
                  We understand that travel plans can change. Cancellations are processed according to the following specific guidelines:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>The 50% deposit is fully refundable if the cancellation request is made within 30 days of the date the deposit was received.</li>
                  <li>Additionally, the cancellation request must be received more than 60 days before your scheduled check-in date.</li>
                  <li>Any cancellation or booking modification will incur a <strong>10% administration fee</strong> based on the total amount paid.</li>
                  <li>Cancellations that do not meet both criteria are not eligible for a refund.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-outfit font-black text-2xl text-base-dark mb-4 tracking-tight">3. House Rules and Property Use Guidelines</h2>
                <p className="text-justify mb-4">
                  Our villas are situated within a quiet residential neighborhood in San Francisco (San Pancho), Nayarit. To preserve community harmony and the peace of our neighborhood, all guests agree to adhere to these house rules:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li><strong>Smoke-Free Policy:</strong> Smoking or vaping is strictly prohibited inside any of our properties. A structural restoration fee of $300 USD will be charged for any violations.</li>
                  <li><strong>Quiet Hours:</strong> Guests must respect quiet hours from 10:00 PM to 9:00 AM daily.</li>
                  <li><strong>Parties & Events:</strong> Parties, loud events, and unauthorized visitors exceeding the booking capacity are strictly prohibited.</li>
                  <li><strong>Pets:</strong> In order to maintain allergen-free environments for all guests, pets of any kind are not permitted inside properties.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-outfit font-black text-2xl text-base-dark mb-4 tracking-tight">4. Golf Cart Rental Policies</h2>
                <p className="text-justify mb-4">
                  If you rent or operate a golf cart provided by San Pancho Tropical, you agree to the following mandatory guidelines:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>All drivers must hold a valid driver's license and be at least 18 years of age.</li>
                  <li>Golf carts are for public street use only within the town limits of San Pancho. Driving on federal highways or on the beach sand is strictly prohibited.</li>
                  <li>Any damage to the vehicle resulting from reckless driving or negligence is the renter's full financial responsibility.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-outfit font-black text-2xl text-base-dark mb-4 tracking-tight">5. Disclaimers and Limitations of Liability</h2>
                <p className="text-justify mb-4">
                  San Pancho Tropical is not responsible for lost or stolen personal items inside the villas, nor for utility outages outside our control (such as CFE power failures, municipal water service interruptions, or internet outages). We will do everything within our capability to assist and address these issues promptly.
                </p>
              </div>

              <div>
                <h2 className="font-outfit font-black text-2xl text-base-dark mb-4 tracking-tight">6. Applicable Law and Jurisdiction</h2>
                <p className="text-justify mb-4">
                  Any legal dispute arising from the use of this website or accommodations booked through it shall be governed by federal and state laws in Mexico, submitting specifically to the competent courts of the State of Nayarit, Mexico, and waiving any other jurisdiction.
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
