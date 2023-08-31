
const HomePage = () => (
  <div>
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col w-full mb-20">
          <div className="lg:w-2/3 mx-auto inline-flex" style={{justifyContent: 'space-between'}}>
            <div>
              <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">
                Glean Browser API Playground
              </h2>
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Welcome
              </h1>
            </div>
          </div>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            <p>Navigate to each page matching a supported integration type.</p>
            <p>Utilize the sidebar settings drawer to edit options directly.</p>
          </p>
        </div>
      </div>
    </section>
  </div>
);

export default HomePage;
