export function Home() {
  return (
    <div className=" items-center justify-center flex flex-col">
      <div className="">
        <div
          className="absolute inset-y-0 -z-10 origin-top-right skew-x-[-30deg] bg-white "
          aria-hidden="true"
        />
        <div className="mx-auto max-w-7xl px-6 mt-10 sm:mt-28 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto">
              Track your favorite music.
            </h1>
            <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
              <p className="text-lg leading-8 text-gray-600">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
                fugiat aliqua. Anim aute id magna aliqua ad ad non deserunt
                sunt. Qui irure qui lorem cupidatat commodo.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <a
                  href="#"
                  className="rounded-md no-underline bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get started
                </a>
                <a
                  href="#"
                  className="text-sm font-semibold no-underline leading-6 text-gray-900"
                >
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
            {/* <img
              src="https://images.unsplash.com/photo-1567532900872-f4e906cbf06a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80"
              alt=""
              className="aspect-[6/5] w-full max-w-lg rounded-2xl object-cover lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
            /> */}
          </div>
        </div>

        <div className="sm:flex hidden flex-col gap-3 mt-32 mb-14 px-6 lg:px-8 sm:visible items-center">
          <div className="flex gap-3">
            {[...Array(5)].map((x, i) => (
              <Card size={210} />
            ))}
          </div>
          <div className="flex gap-3">
            {[...Array(5)].map((x, i) => (
              <Card size={200} />
            ))}
          </div>
        </div>

        <div className="sm:hidden flex-col gap-3 mt-14 px-3 sm:px-10 lg:px-12 mb-14">
          <div className="flex flex-col gap-3 items-center">
            {[...Array(3)].map((x, i) => (
              <div className="flex gap-3">
                {[...Array(3)].map((x, i) => (
                  <Card size={150} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Card(props) {
  return (
    <div className="">
      <img
        className="rounded-md  "
        width={props.size}
        src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228"
      ></img>
    </div>
  );
}
