import NativeSearchBox from "../components/NativeSearchBox";

const HomePage = () => (
  <div>
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col w-full mb-20">
          <div className="lg:w-2/3 mx-auto inline-flex" style={{justifyContent: 'space-between'}}>
            <div>
              <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">
                Glean Help Center
              </h2>
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                Welcome
              </h1>
            </div>
            <NativeSearchBox />
          </div>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            <p>We're delighted to have you here, and we're committed to providing you the support and resources you need to make the most of our products and services.</p>
            <br/>
            <strong>Getting Started:</strong>
            <p>Whether you're a new customer or have been with us for years, our Help Center is designed to answer all your questions. Here's what you'll find:</p>
            <br/>
            <ol style={{listStyle: 'revert'}}>
                <li><strong>FAQs:</strong> A collection of answers to our most frequently asked questions. Whether you need help with account setup or troubleshooting a specific issue, you'll likely find your answer here.</li>
                <li><strong>Guides and Tutorials:</strong> Step-by-step guides and video tutorials to help you get started with our products and services, or master more advanced features.</li>
                <li><strong>Community Forums:</strong> Engage with other users, share your experiences, ask questions, and find solutions from our community of experts and fellow customers.</li>
                <li><strong>Contact Us:</strong> Need personalized assistance? Reach out to our dedicated support team through phone, email, or live chat. We're here to help!</li>
            </ol>
            <br/>
            <strong>Stay Updated:</strong>
            <p>Be sure to check our updates section for the latest news, product releases, and enhancements. We regularly update our Help Center to make sure you have access to the most accurate and up-to-date information.</p>
            <br/>
            <strong>Conclusion:</strong>
            <p>We are here to assist you every step of the way, so don't hesitate to explore our Help Center or reach out if you need anything. Thank you for choosing [Your Company Name], and we look forward to supporting your journey to success!</p>
          </p>
        </div>
      </div>
    </section>
  </div>
);

export default HomePage;
