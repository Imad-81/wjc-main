import PageHeader from "@/components/sections/page-header"
import Footer from "@/components/sections/footer"

export default function PrivacyPolicyPage() {
    return (
        <>
            <PageHeader
                title="Privacy Policy"
                subtitle="How we collect, use, and protect your information"
            />

            <main className="w-full py-24 px-6 md:px-12 lg:px-20 bg-background">
                <div className="max-w-4xl mx-auto">
                    <p className="text-foreground/60 text-sm mb-12">
                        Last updated: December 2024
                    </p>

                    <section className="mb-12">
                        <h2 className="text-foreground font-serif text-3xl font-normal mb-6">Introduction</h2>
                        <p className="text-foreground/80 leading-relaxed mb-4">
                            Woxsen Japan Centre ("we," "our," or "us") is committed to protecting your privacy.
                            This Privacy Policy explains how we collect, use, disclose, and safeguard your information
                            when you visit our website or participate in our programs and events.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-foreground font-serif text-3xl font-normal mb-6">Information We Collect</h2>
                        <h3 className="text-foreground font-semibold text-xl mb-4">Personal Information</h3>
                        <p className="text-foreground/80 leading-relaxed mb-4">
                            We may collect personal information that you voluntarily provide to us when you:
                        </p>
                        <ul className="list-disc list-inside text-foreground/80 space-y-2 mb-6">
                            <li>Register for membership or events</li>
                            <li>Enroll in language courses (JLPT programs)</li>
                            <li>Subscribe to our newsletter</li>
                            <li>Contact us with inquiries</li>
                            <li>Submit forms on our website</li>
                        </ul>
                        <p className="text-foreground/80 leading-relaxed">
                            This information may include your name, email address, phone number, educational background,
                            and other details relevant to our programs.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-foreground font-serif text-3xl font-normal mb-6">How We Use Your Information</h2>
                        <p className="text-foreground/80 leading-relaxed mb-4">
                            We use the information we collect to:
                        </p>
                        <ul className="list-disc list-inside text-foreground/80 space-y-2">
                            <li>Process your membership and course registrations</li>
                            <li>Send you updates about events and programs</li>
                            <li>Respond to your inquiries and provide support</li>
                            <li>Improve our website and services</li>
                            <li>Comply with legal obligations</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-foreground font-serif text-3xl font-normal mb-6">Information Sharing</h2>
                        <p className="text-foreground/80 leading-relaxed">
                            We do not sell, trade, or otherwise transfer your personal information to third parties
                            without your consent, except as necessary to provide our services or as required by law.
                            We may share information with Woxsen University for administrative purposes related to
                            our programs.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-foreground font-serif text-3xl font-normal mb-6">Data Security</h2>
                        <p className="text-foreground/80 leading-relaxed">
                            We implement appropriate security measures to protect your personal information. However,
                            no method of transmission over the Internet is 100% secure, and we cannot guarantee
                            absolute security.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-foreground font-serif text-3xl font-normal mb-6">Your Rights</h2>
                        <p className="text-foreground/80 leading-relaxed mb-4">
                            You have the right to:
                        </p>
                        <ul className="list-disc list-inside text-foreground/80 space-y-2">
                            <li>Access your personal information</li>
                            <li>Request correction of inaccurate data</li>
                            <li>Request deletion of your data</li>
                            <li>Opt-out of marketing communications</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-foreground font-serif text-3xl font-normal mb-6">Contact Us</h2>
                        <p className="text-foreground/80 leading-relaxed">
                            If you have questions about this Privacy Policy, please contact us at:{" "}
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
