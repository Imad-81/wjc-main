import PageHeader from "@/components/sections/page-header"
import Footer from "@/components/sections/footer"

export default function TermsOfServicePage() {
    return (
        <>
            <PageHeader
                title="Terms of Service"
                subtitle="Terms and conditions for using our services"
            />

            <main className="w-full py-24 px-6 md:px-12 lg:px-20 bg-background">
                <div className="max-w-4xl mx-auto">
                    <p className="text-foreground/60 text-sm mb-12">
                        Last updated: December 2024
                    </p>

                    <section className="mb-12">
                        <h2 className="text-foreground font-serif text-3xl font-normal mb-6">Agreement to Terms</h2>
                        <p className="text-foreground/80 leading-relaxed">
                            By accessing or using the Woxsen Japan Centre website and services, you agree to be bound
                            by these Terms of Service. If you disagree with any part of these terms, you may not
                            access our services.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-foreground font-serif text-3xl font-normal mb-6">Services</h2>
                        <p className="text-foreground/80 leading-relaxed mb-4">
                            Woxsen Japan Centre provides:
                        </p>
                        <ul className="list-disc list-inside text-foreground/80 space-y-2">
                            <li>Japanese language courses and JLPT preparation programs</li>
                            <li>Cultural exchange events and workshops</li>
                            <li>Membership benefits and community access</li>
                            <li>Educational resources and materials</li>
                            <li>Information about study abroad opportunities</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-foreground font-serif text-3xl font-normal mb-6">User Responsibilities</h2>
                        <p className="text-foreground/80 leading-relaxed mb-4">
                            When using our services, you agree to:
                        </p>
                        <ul className="list-disc list-inside text-foreground/80 space-y-2">
                            <li>Provide accurate and complete information during registration</li>
                            <li>Maintain the confidentiality of your account credentials</li>
                            <li>Use our services in compliance with applicable laws</li>
                            <li>Respect other members and participants in our programs</li>
                            <li>Not misuse or interfere with our services</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-foreground font-serif text-3xl font-normal mb-6">Intellectual Property</h2>
                        <p className="text-foreground/80 leading-relaxed">
                            All content on this website, including text, graphics, logos, and educational materials,
                            is the property of Woxsen Japan Centre or its content suppliers and is protected by
                            intellectual property laws. You may not reproduce, distribute, or create derivative
                            works without our express written permission.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-foreground font-serif text-3xl font-normal mb-6">Program Enrollment</h2>
                        <p className="text-foreground/80 leading-relaxed mb-4">
                            For language courses and programs:
                        </p>
                        <ul className="list-disc list-inside text-foreground/80 space-y-2">
                            <li>Enrollment is subject to availability and eligibility criteria</li>
                            <li>Fees must be paid as per the specified schedule</li>
                            <li>Cancellation policies apply as communicated during enrollment</li>
                            <li>Certificates are issued upon successful completion of requirements</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-foreground font-serif text-3xl font-normal mb-6">Limitation of Liability</h2>
                        <p className="text-foreground/80 leading-relaxed">
                            Woxsen Japan Centre shall not be liable for any indirect, incidental, special, or
                            consequential damages arising from your use of our services. Our total liability
                            shall not exceed the amount paid by you for the specific service in question.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-foreground font-serif text-3xl font-normal mb-6">Modifications</h2>
                        <p className="text-foreground/80 leading-relaxed">
                            We reserve the right to modify these terms at any time. Changes will be effective
                            upon posting to this website. Your continued use of our services after any
                            modifications indicates your acceptance of the updated terms.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-foreground font-serif text-3xl font-normal mb-6">Governing Law</h2>
                        <p className="text-foreground/80 leading-relaxed">
                            These terms shall be governed by and construed in accordance with the laws of India.
                            Any disputes shall be subject to the exclusive jurisdiction of the courts in Hyderabad,
                            Telangana.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-foreground font-serif text-3xl font-normal mb-6">Contact Us</h2>
                        <p className="text-foreground/80 leading-relaxed">
                            For questions about these Terms of Service, please contact us at:{" "}
                            <a href="mailto:japan.centre@woxsen.edu.in" className="text-foreground hover:underline">
                                japan.centre@woxsen.edu.in
                            </a>
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </>
    )
}
